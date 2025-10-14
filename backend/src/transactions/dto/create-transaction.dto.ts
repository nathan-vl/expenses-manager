import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { KakeiboCategory } from '../enums/kakeibo-category.enum';
import { TransactionType } from '../entities/transactions';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(0.01)
  amount: number;

  @IsDateString()
  date: Date;

  @IsEnum(TransactionType)
  type: TransactionType;

  @IsEnum(KakeiboCategory)
  @IsOptional()
  kakeiboCategory?: KakeiboCategory;

  @IsString()
  @IsOptional()
  customCategory?: string;
}
