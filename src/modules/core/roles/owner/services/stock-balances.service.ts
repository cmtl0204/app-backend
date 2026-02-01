// stock-balances.service.ts
import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { StockBalanceEntity } from '@modules/core/entities';
import { CreateStockBalanceDto, UpdateStockBalanceDto } from '../dto/stock-balance';
import { ServiceResponseHttpInterface } from '@utils/interfaces';
import { CoreRepositoryEnum } from '@utils/enums';
import { PaginateFilterService, PaginationDto } from '@utils/pagination';

@Injectable()
export class StockBalancesService {
  private paginateFilterService: PaginateFilterService<StockBalanceEntity>;

  constructor(
    @Inject(CoreRepositoryEnum.STOCK_BALANCE_REPOSITORY)
    private repository: Repository<StockBalanceEntity>,
  ) {
    this.paginateFilterService = new PaginateFilterService(this.repository);
  }

  async create(payload: CreateStockBalanceDto): Promise<StockBalanceEntity> {
    const entity = this.repository.create(payload);
    return await this.repository.save(entity);
  }

  async findAll(params: PaginationDto): Promise<ServiceResponseHttpInterface> {
    return this.paginateFilterService.execute({
      params,
      searchFields: [],
      relations: ['product', 'location'],
    });
  }

  async findOne(id: string): Promise<StockBalanceEntity> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: ['product', 'location'],
    });
    if (!entity) throw new NotFoundException(`Balance de stock no encontrado (id: ${id})`);
    return entity;
  }

  async update(id: string, payload: UpdateStockBalanceDto): Promise<StockBalanceEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Balance de stock no encontrado para actualizar');
    this.repository.merge(entity, payload);
    return await this.repository.save(entity);
  }

  async remove(id: string): Promise<StockBalanceEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Balance de stock no encontrado para eliminar');
    return await this.repository.softRemove(entity);
  }

  async findByProductAndLocation(productId: string, locationId: string): Promise<StockBalanceEntity> {
    const entity = await this.repository.findOne({
      where: { productId, locationId },
      relations: ['product', 'location'],
    });
    if (!entity) throw new NotFoundException(`Balance de stock no encontrado para producto ${productId} y ubicación ${locationId}`);
    return entity;
  }

  async catalogue(): Promise<ServiceResponseHttpInterface> {
    const response = await this.repository.findAndCount({ 
      take: 1000,
      relations: ['product', 'location'],
    });
    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }
}