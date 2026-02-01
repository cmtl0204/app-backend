// products.service.ts
import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductEntity } from '@modules/core/entities';
import { CreateProductDto, UpdateProductDto } from '../dto/product';
import { ServiceResponseHttpInterface } from '@utils/interfaces';
import { CoreRepositoryEnum } from '@utils/enums';
import { PaginateFilterService, PaginationDto } from '@utils/pagination';

@Injectable()
export class ProductsService {
  private paginateFilterService: PaginateFilterService<ProductEntity>;

  constructor(
    @Inject(CoreRepositoryEnum.PRODUCT_REPOSITORY)
    private repository: Repository<ProductEntity>,
  ) {
    this.paginateFilterService = new PaginateFilterService(this.repository);
  }

  async create(payload: CreateProductDto): Promise<ProductEntity> {
    const entity = this.repository.create(payload);
    return await this.repository.save(entity);
  }

  async findAll(params: PaginationDto): Promise<ServiceResponseHttpInterface> {
    return this.paginateFilterService.execute({
      params,
      searchFields: ['name', 'sku', 'description'],
      relations: ['branch', 'category'],
    });
  }

  async findOne(id: string): Promise<ProductEntity> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: ['branch', 'category'],
    });
    if (!entity) throw new NotFoundException(`Producto no encontrado (id: ${id})`);
    return entity;
  }

  async update(id: string, payload: UpdateProductDto): Promise<ProductEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Producto no encontrado para actualizar');
    this.repository.merge(entity, payload);
    return await this.repository.save(entity);
  }

  async remove(id: string): Promise<ProductEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Producto no encontrado para eliminar');
    return await this.repository.softRemove(entity);
  }

  async catalogue(): Promise<ServiceResponseHttpInterface> {
    const response = await this.repository.findAndCount({ 
      where: { enabled: true },
      take: 1000 
    });
    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }
}