// purchases.service.ts
import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PurchaseEntity } from '@modules/core/entities';
import { CreatePurchaseDto, UpdatePurchaseDto } from '../dto/purchase';
import { ServiceResponseHttpInterface } from '@utils/interfaces';
import { CoreRepositoryEnum } from '@utils/enums';
import { PaginateFilterService, PaginationDto } from '@utils/pagination';

@Injectable()
export class PurchasesService {
  private paginateFilterService: PaginateFilterService<PurchaseEntity>;

  constructor(
    @Inject(CoreRepositoryEnum.PURCHASE_REPOSITORY)
    private repository: Repository<PurchaseEntity>,
    @Inject(CoreRepositoryEnum.PURCHASE_ITEM_REPOSITORY)
    private readonly purchaseItemsRepository: Repository<any>,
  ) {
    this.paginateFilterService = new PaginateFilterService(this.repository);
  }

  async create(payload: CreatePurchaseDto): Promise<PurchaseEntity> {
    const entity = this.repository.create(payload);
    return await this.repository.save(entity);
  }

  async findAll(params: PaginationDto): Promise<ServiceResponseHttpInterface> {
    return this.paginateFilterService.execute({
      params,
      searchFields: ['documentNumber'],
      relations: ['branch', 'supplier', 'items'],
    });
  }

  async findOne(id: string): Promise<PurchaseEntity> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: ['branch', 'supplier', 'items'],
    });
    if (!entity) throw new NotFoundException(`Compra no encontrada (id: ${id})`);
    return entity;
  }

  async update(id: string, payload: UpdatePurchaseDto): Promise<PurchaseEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Compra no encontrada para actualizar');
    this.repository.merge(entity, payload);
    return await this.repository.save(entity);
  }

  async remove(id: string): Promise<PurchaseEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Compra no encontrada para eliminar');
    return await this.repository.softRemove(entity);
  }

  async findItems(purchaseId: string): Promise<any[]> {
    // Implementación REAL para items de compra
    return await this.purchaseItemsRepository.find({
      where: { purchaseId },
      relations: ['product'],
      order: { createdAt: 'ASC' },
    });
  }

  async catalogue(): Promise<ServiceResponseHttpInterface> {
    const response = await this.repository.findAndCount({ 
      take: 1000,
      relations: ['supplier'],
    });
    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }
}