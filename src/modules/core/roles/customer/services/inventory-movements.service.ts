// inventory-movements.service.ts
import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InventoryMovementEntity } from '@modules/core/entities';
import { CreateInventoryMovementDto, UpdateInventoryMovementDto } from '../dto/inventory-movement';
import { ServiceResponseHttpInterface } from '@utils/interfaces';
import { CoreRepositoryEnum } from '@utils/enums';
import { PaginateFilterService, PaginationDto } from '@utils/pagination';

@Injectable()
export class InventoryMovementsService {
  private paginateFilterService: PaginateFilterService<InventoryMovementEntity>;

  constructor(
    @Inject(CoreRepositoryEnum.INVENTORY_MOVEMENT_REPOSITORY)
    private repository: Repository<InventoryMovementEntity>,
  ) {
    this.paginateFilterService = new PaginateFilterService(this.repository);
  }

  async create(payload: CreateInventoryMovementDto): Promise<InventoryMovementEntity> {
    const entity = this.repository.create(payload);
    return await this.repository.save(entity);
  }

  async findAll(params: PaginationDto): Promise<ServiceResponseHttpInterface> {
    return this.paginateFilterService.execute({
      params,
      searchFields: ['reason'],
      relations: ['branch', 'product', 'location'],
    });
  }

  async findOne(id: string): Promise<InventoryMovementEntity> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: ['branch', 'product', 'location'],
    });
    if (!entity) throw new NotFoundException(`Movimiento de inventario no encontrado (id: ${id})`);
    return entity;
  }

  async update(id: string, payload: UpdateInventoryMovementDto): Promise<InventoryMovementEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Movimiento de inventario no encontrado para actualizar');
    this.repository.merge(entity, payload);
    return await this.repository.save(entity);
  }

  async remove(id: string): Promise<InventoryMovementEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Movimiento de inventario no encontrado para eliminar');
    return await this.repository.softRemove(entity);
  }

  async findByProductId(productId: string): Promise<InventoryMovementEntity[]> {
    return await this.repository.find({
      where: { productId },
      relations: ['location'],
      order: { createdAt: 'DESC' },
    });
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