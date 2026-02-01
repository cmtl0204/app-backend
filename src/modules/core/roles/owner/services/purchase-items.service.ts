// purchase-items.service.ts
import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PurchaseItemEntity } from '@modules/core/entities';
import { CreatePurchaseItemDto, UpdatePurchaseItemDto } from '../dto/purchase-item';
import { ServiceResponseHttpInterface } from '@utils/interfaces';
import { CoreRepositoryEnum } from '@utils/enums';
import { PaginateFilterService, PaginationDto } from '@utils/pagination';

@Injectable()
export class PurchaseItemsService {
  private paginateFilterService: PaginateFilterService<PurchaseItemEntity>;

  constructor(
    @Inject(CoreRepositoryEnum.PURCHASE_ITEM_REPOSITORY)
    private repository: Repository<PurchaseItemEntity>,
  ) {
    this.paginateFilterService = new PaginateFilterService(this.repository);
  }

  async create(payload: CreatePurchaseItemDto): Promise<PurchaseItemEntity> {
    const entity = this.repository.create(payload);
    return await this.repository.save(entity);
  }

  async findAll(params: PaginationDto): Promise<ServiceResponseHttpInterface> {
    return this.paginateFilterService.execute({
      params,
      searchFields: [],
      relations: ['purchase', 'product'],
    });
  }

  async findOne(id: string): Promise<PurchaseItemEntity> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: ['purchase', 'product'],
    });
    if (!entity) throw new NotFoundException(`Item de compra no encontrado (id: ${id})`);
    return entity;
  }

  async update(id: string, payload: UpdatePurchaseItemDto): Promise<PurchaseItemEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Item de compra no encontrado para actualizar');
    this.repository.merge(entity, payload);
    return await this.repository.save(entity);
  }

  async remove(id: string): Promise<PurchaseItemEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Item de compra no encontrado para eliminar');
    return await this.repository.softRemove(entity);
  }

  async findByPurchaseId(purchaseId: string): Promise<PurchaseItemEntity[]> {
    return await this.repository.find({
      where: { purchaseId },
      relations: ['product'],
    });
  }

  async catalogue(): Promise<ServiceResponseHttpInterface> {
    const response = await this.repository.findAndCount({ 
      take: 1000,
      relations: ['product'],
    });
    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }
}