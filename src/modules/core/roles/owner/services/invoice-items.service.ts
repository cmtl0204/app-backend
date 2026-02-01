// invoice-items.service.ts
import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InvoiceItemEntity } from '@modules/core/entities';
import { CreateInvoiceItemDto, UpdateInvoiceItemDto } from '../dto/invoice-item';
import { ServiceResponseHttpInterface } from '@utils/interfaces';
import { CoreRepositoryEnum } from '@utils/enums';
import { PaginateFilterService, PaginationDto } from '@utils/pagination';

@Injectable()
export class InvoiceItemsService {
  private paginateFilterService: PaginateFilterService<InvoiceItemEntity>;

  constructor(
    @Inject(CoreRepositoryEnum.INVOICE_ITEM_REPOSITORY)
    private repository: Repository<InvoiceItemEntity>,
  ) {
    this.paginateFilterService = new PaginateFilterService(this.repository);
  }

  async create(payload: CreateInvoiceItemDto): Promise<InvoiceItemEntity> {
    const entity = this.repository.create(payload);
    return await this.repository.save(entity);
  }

  async findAll(params: PaginationDto): Promise<ServiceResponseHttpInterface> {
    return this.paginateFilterService.execute({
      params,
      searchFields: ['description'],
      relations: ['invoice', 'staff'],
    });
  }

  async findOne(id: string): Promise<InvoiceItemEntity> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: ['invoice', 'staff'],
    });
    if (!entity) throw new NotFoundException(`Item de factura no encontrado (id: ${id})`);
    return entity;
  }

  async update(id: string, payload: UpdateInvoiceItemDto): Promise<InvoiceItemEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Item de factura no encontrado para actualizar');
    this.repository.merge(entity, payload);
    return await this.repository.save(entity);
  }

  async remove(id: string): Promise<InvoiceItemEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Item de factura no encontrado para eliminar');
    return await this.repository.softRemove(entity);
  }

  async findByInvoiceId(invoiceId: string): Promise<InvoiceItemEntity[]> {
    return await this.repository.find({
      where: { invoiceId },
      relations: ['staff'],
    });
  }

  async catalogue(): Promise<ServiceResponseHttpInterface> {
    const response = await this.repository.findAndCount({ 
      take: 1000,
      relations: ['invoice'],
    });
    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }
}