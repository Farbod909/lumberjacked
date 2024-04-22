import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { IsIntegerRange } from 'src/common/validation-decorators/IsNumericRange.decorator';

export class CreateMovementDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  split?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(140)
  description?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsIntegerRange({
    smallest: 1,
    largest: 10,
  })
  warmupSets?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsIntegerRange({
    smallest: 1,
    largest: 10,
  })
  workingSets?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsIntegerRange({
    smallest: 1,
    largest: 10,
  })
  rpe?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(3600)
  restTime?: number; // In seconds.
}
