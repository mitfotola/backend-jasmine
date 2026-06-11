// Service layer: builds queries against the Pet model, handles pagination
// and transforms database documents into API-friendly JSON.
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { QueryPetDto } from './dto/query-pet.dto';
import { Pet, PetDocument } from './schemas/pet.schema';

type PetResponse = {
  _id: string;
  name: string;
  type: string;
  breed?: string;
  gender: string;
  age: number;
  price: number;
  description: string;
  imageUrl: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
};

@Injectable()
export class PetsService {
  constructor(@InjectModel(Pet.name) private readonly petModel: Model<PetDocument>) {}

  // findAll: applies filters from QueryPetDto, supports paging and limits
  async findAll(query: QueryPetDto) {
    const filter: FilterQuery<PetDocument> = {};

    if (query.search) {
      const search = new RegExp(query.search, 'i');
      filter.$or = [{ name: search }, { breed: search }];
    }

    if (query.type) {
      filter.type = query.type;
    }

    if (query.gender) {
      filter.gender = query.gender;
    }

    if (query.minPrice !== undefined || query.maxPrice !== undefined) {
      filter.price = {};

      if (query.minPrice !== undefined) {
        filter.price.$gte = Number(query.minPrice);
      }

      if (query.maxPrice !== undefined) {
        filter.price.$lte = Number(query.maxPrice);
      }
    }

    // default to only available pets unless explicitly requested
    filter.isAvailable = query.isAvailable ?? true;

    const page = Number(query.page ?? 1);
    const limit = Math.min(Number(query.limit ?? 12), 50);
    const skip = (page - 1) * limit;

    const [pets, total] = await Promise.all([
      this.petModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean().exec(),
      this.petModel.countDocuments(filter).exec(),
    ]);

    return {
      data: pets.map((pet) => this.serializePet(pet)),
      total,
      page,
      limit,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    };
  }

  // findOne: validates id and returns a single pet
  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Pet not found');
    }

    const pet = await this.petModel.findById(id).lean().exec();

    if (!pet) {
      throw new NotFoundException('Pet not found');
    }

    return this.serializePet(pet);
  }

  // serializePet: normalizes Mongoose document fields to plain JSON
  private serializePet(pet: any): PetResponse {
    return {
      ...pet,
      _id: pet._id.toString(),
      createdAt: pet.createdAt?.toISOString?.() ?? String(pet.createdAt),
      updatedAt: pet.updatedAt?.toISOString?.() ?? String(pet.updatedAt),
    };
  }
}