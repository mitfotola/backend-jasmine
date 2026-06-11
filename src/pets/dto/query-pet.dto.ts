// Data Transfer Object for parsing and validating query parameters
// passed to GET /pets. It normalizes types (strings -> numbers/booleans)
// and validates allowed enum values.
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';
import { PetGender, PetType } from '../schemas/pet.schema';

// Helper: converts query param values like 'true'/'false' to boolean,
// preserves undefined for missing values.
function parseBoolean(value: unknown): boolean | undefined {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }

  if (typeof value === 'boolean') {
    return value;
  }

  const normalized = String(value).toLowerCase();

  if (normalized === 'true') {
    return true;
  }

  if (normalized === 'false') {
    return false;
  }

  return value as never;
}

export class QueryPetDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(PetType)
  type?: PetType;

  @IsOptional()
  @IsEnum(PetGender)
  gender?: PetGender;

  @IsOptional()
  @IsNumberString()
  minPrice?: string;

  @IsOptional()
  @IsNumberString()
  maxPrice?: string;

  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;

  @Transform(({ value }) => parseBoolean(value))
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;
}