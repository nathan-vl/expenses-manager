import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction, TransactionType } from './entities/transactions';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
  ) {}

  async create(
    createTransactionDto: CreateTransactionDto,
    userId: string,
  ): Promise<Transaction> {
    if (
      createTransactionDto.type === TransactionType.EXPENSE &&
      !createTransactionDto.kakeiboCategory
    ) {
      throw new BadRequestException(
        'Expense transactions must have a Kakeibo category.',
      );
    }

    if (createTransactionDto.type === TransactionType.INCOME) {
      createTransactionDto.kakeiboCategory = undefined;
    }

    const transaction = this.transactionsRepository.create({
      ...createTransactionDto,
      userId,
    });

    return this.transactionsRepository.save(transaction);
  }

  async findAllByUser(userId: string): Promise<Transaction[]> {
    return this.transactionsRepository.find({ where: { userId } });
  }

  async findOne(id: string, userId: string): Promise<Transaction> {
    const transaction = await this.transactionsRepository.findOneBy({
      id,
      userId,
    });
    if (!transaction) {
      throw new UnauthorizedException(
        'Transaction not found or you do not have permission to view it.',
      );
    }
    return transaction;
  }
}
