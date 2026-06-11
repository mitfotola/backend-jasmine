// Mongoose schema definition for Pet documents. Enums define allowed values
// for `type` and `gender`. The schema includes timestamps and a JSON
// transform that converts `_id` to a string for API responses.
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum PetType {
  DOG = 'DOG',
  CAT = 'CAT',
  RABBIT = 'RABBIT',
  BIRD = 'BIRD',
  FISH = 'FISH',
  OTHER = 'OTHER',
}

export enum PetGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

@Schema({ timestamps: true })
export class Pet {
  @Prop({ required: true, trim: true })
  name!: string;

  @Prop({ required: true, enum: PetType, type: String })
  type!: PetType;

  @Prop({ required: false, trim: true })
  breed?: string;

  @Prop({ required: true, enum: PetGender, type: String })
  gender!: PetGender;

  @Prop({ required: true, min: 0 })
  age!: number;

  @Prop({ required: true, min: 0 })
  price!: number;

  @Prop({ required: true, trim: true })
  description!: string;

  @Prop({ required: true, trim: true })
  imageUrl!: string;

  @Prop({ default: true })
  isAvailable!: boolean;
}

export type PetDocument = HydratedDocument<Pet>;

export const PetSchema = SchemaFactory.createForClass(Pet);

PetSchema.set('toJSON', {
  versionKey: false,
  virtuals: true,
  transform: (_doc, ret: any) => {
    ret._id = ret._id.toString();
    return ret;
  },
});