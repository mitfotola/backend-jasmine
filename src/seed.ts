// Script to populate the database with sample pets.
// Each pet object contains an `imageUrl` string — it can point to any
// valid image (PNG/JPG/SVG). To use local images, host them from the
// frontend `public/` folder and point the `imageUrl` to that URL.
import 'dotenv/config';
import mongoose from 'mongoose';
import { PetGender, PetSchema, PetType } from './pets/schemas/pet.schema';

type SeedPet = {
  name: string;
  type: PetType;
  breed?: string;
  gender: PetGender;
  age: number;
  price: number;
  description: string;
  imageUrl: string;
  isAvailable?: boolean;
};
// add pet manually here , run npm run seed (put the simple to mangoDB) again before start the server.
const pets: SeedPet[] = [
  {
    name: 'Milo',
    type: PetType.DOG,
    breed: 'Golden Retriever',
    gender: PetGender.MALE,
    age: 7,
    price: 18500,
    description: 'Friendly family dog with a calm temperament and a love for walks and fetch.',
    // imageUrl may be changed to a PNG/JPG hosted elsewhere.
    imageUrl: 'https://picsum.photos/seed/dog-1/400/300',
  },
  {
    name: 'Bella',
    type: PetType.DOG,
    breed: 'Corgi',
    gender: PetGender.FEMALE,
    age: 10,
    price: 22500,
    description: 'Playful companion with a bright personality and a compact, sturdy build.',
    imageUrl: 'https://picsum.photos/seed/dog-2/400/300',
  },
  {
    name: 'Rocky',
    type: PetType.DOG,
    breed: 'French Bulldog',
    gender: PetGender.MALE,
    age: 14,
    price: 32000,
    description: 'Affectionate city dog that enjoys people time and cozy naps.',
    imageUrl: 'https://picsum.photos/seed/dog-3/400/300',
  },
  {
    name: 'Luna',
    type: PetType.CAT,
    breed: 'British Shorthair',
    gender: PetGender.FEMALE,
    age: 8,
    price: 14500,
    description: 'Elegant indoor cat with a plush coat and a relaxed, affectionate nature.',
    imageUrl: 'https://picsum.photos/seed/cat-1/400/300',
  },
  {
    name: 'Oreo',
    type: PetType.CAT,
    breed: 'Domestic Shorthair',
    gender: PetGender.MALE,
    age: 11,
    price: 9800,
    description: 'Curious little explorer who loves sunny windows and gentle play.',
    imageUrl: 'https://picsum.photos/seed/cat-2/400/300',
  },
  {
    name: 'Mimi',
    type: PetType.CAT,
    breed: 'Scottish Fold',
    gender: PetGender.FEMALE,
    age: 16,
    price: 16800,
    description: 'Sweet-natured cat with folded ears and a soft, cuddly personality.',
    imageUrl: 'https://picsum.photos/seed/cat-3/400/300',
  },
  {
    name: 'Coco',
    type: PetType.RABBIT,
    breed: 'Netherland Dwarf',
    gender: PetGender.FEMALE,
    age: 6,
    price: 7200,
    description: 'Tiny rabbit with a lively spirit and a love for leafy snacks.',
    imageUrl: 'https://picsum.photos/seed/rabbit-1/400/300',
  },
  {
    name: 'Pip',
    type: PetType.RABBIT,
    breed: 'Lionhead',
    gender: PetGender.MALE,
    age: 9,
    price: 8600,
    description: 'Gentle rabbit with a fluffy mane and a calm, friendly personality.',
    imageUrl: 'https://picsum.photos/seed/rabbit-2/400/300',
  },
  {
    name: 'Sky',
    type: PetType.BIRD,
    breed: 'Budgerigar',
    gender: PetGender.FEMALE,
    age: 4,
    price: 3900,
    description: 'Small, cheerful bird with bright colors and a chatty disposition.',
    imageUrl: 'https://picsum.photos/seed/bird-1/400/300',
  },
  {
    name: 'Rio',
    type: PetType.BIRD,
    breed: 'Cockatiel',
    gender: PetGender.MALE,
    age: 13,
    price: 9400,
    description: 'Lively companion that enjoys whistles, interaction, and gentle handling.',
    imageUrl: 'https://picsum.photos/seed/bird-2/400/300',
  },
  {
    name: 'Bubbles',
    type: PetType.FISH,
    breed: 'Betta',
    gender: PetGender.FEMALE,
    age: 2,
    price: 1200,
    description: 'Vibrant aquarium fish with flowing fins and striking colors.',
    imageUrl: 'https://picsum.photos/seed/fish-1/400/300',
  },
  {
    name: 'Finn',
    type: PetType.FISH,
    breed: 'Goldfish',
    gender: PetGender.MALE,
    age: 5,
    price: 800,
    description: 'Classic starter pet fish that brings a calm, decorative feel to any tank.',
    imageUrl: 'https://picsum.photos/seed/fish-2/400/300',
    isAvailable: false,
  },
  {
    name: 'Nova',
    type: PetType.OTHER,
    breed: 'Hedgehog',
    gender: PetGender.FEMALE,
    age: 12,
    price: 6800,
    description: 'Unique little companion that is curious, compact, and full of character.',
    imageUrl: 'https://picsum.photos/seed/other-1/400/300',
  },
  {
    name: 'Atlas',
    type: PetType.OTHER,
    breed: 'Hamster',
    gender: PetGender.MALE,
    age: 3,
    price: 2500,
    description: 'Pocket-sized pet with an energetic daytime sleep cycle and busy evenings.',
    imageUrl: 'https://picsum.photos/seed/other-2/400/300',
  },
  {
    name: 'Poppy',
    type: PetType.DOG,
    breed: 'Shiba Inu',
    gender: PetGender.FEMALE,
    age: 22,
    price: 45000,
    description: 'Confident and expressive dog with a premium pedigree and spirited energy.',
    imageUrl: 'https://picsum.photos/seed/dog-4/400/300',
  },
  {
    name: 'Casper',
    type: PetType.CAT,
    breed: 'Ragdoll',
    gender: PetGender.MALE,
    age: 18,
    price: 28000,
    description: 'Large, affectionate cat that loves being carried and staying close to people.',
    imageUrl: 'https://picsum.photos/seed/cat-4/400/300',
  },
  {
    name: 'Willow',
    type: PetType.RABBIT,
    breed: 'Mini Lop',
    gender: PetGender.FEMALE,
    age: 20,
    price: 11500,
    description: 'Soft-eared rabbit with a mellow temperament and beautiful markings.',
    imageUrl: 'https://picsum.photos/seed/rabbit-3/400/300',
  },
  {
    name: 'Comet',
    type: PetType.FISH,
    breed: 'Koi',
    gender: PetGender.MALE,
    age: 15,
    price: 50000,
    description: 'Showpiece koi with a premium look for carefully maintained ponds or large aquariums.',
    imageUrl: 'https://picsum.photos/seed/fish-3/400/300',
  },
  {
    name: 'Cola',
    type: PetType.CAT,
    breed: 'Scouttish Fold',
    gender: PetGender.MALE,
    age: 2,
    price: 500000,
    description: 'Cuttiest cat in the world.',
    imageUrl: 'https://picsum.photos/seed/fish-3/400/300',
  },
];

async function seed() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error('MONGODB_URI is required');
  }

  await mongoose.connect(mongoUri);

  const PetModel = mongoose.models.Pet ?? mongoose.model('Pet', PetSchema);

  await PetModel.deleteMany({});
  await PetModel.insertMany(pets);

  await mongoose.disconnect();
}

seed().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect().catch(() => undefined);
  process.exit(1);
});