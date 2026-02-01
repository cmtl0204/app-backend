// invoices.service.ts
import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InvoiceEntity } from '@modules/core/entities';
import { CreateInvoiceDto, UpdateInvoiceDto } from '../dto/invoice';
import { ServiceResponseHttpInterface } from '@utils/interfaces';
import { CoreRepositoryEnum } from '@utils/enums';
import { PaginateFilterService, PaginationDto } from '@utils/pagination';

@Injectable()
export class InvoicesService {
  private paginateFilterService: PaginateFilterService<InvoiceEntity>;

  constructor(
    @Inject(CoreRepositoryEnum.INVOICE_REPOSITORY)
    private repository: Repository<InvoiceEntity>,
    @Inject(CoreRepositoryEnum.INVOICE_ITEM_REPOSITORY)
    private readonly invoiceItemsRepository: Repository<any>, // Ajusta el tipo según tu entidad
    // @Inject(CoreRepositoryEnum.PAYMENT_REPOSITORY)
    // private readonly paymentsRepository: Repository<any>, // Ajusta el tipo según tu entidad
  ) {
    this.paginateFilterService = new PaginateFilterService(this.repository);
  }

  async create(payload: CreateInvoiceDto): Promise<InvoiceEntity> {
    const entity = this.repository.create(payload);
    return await this.repository.save(entity);
  }

  async findAll(params: PaginationDto): Promise<ServiceResponseHttpInterface> {
    return this.paginateFilterService.execute({
      params,
      searchFields: ['invoiceNumber', 'notes'],
      relations: ['branch', 'customer', 'status', 'createdBy', 'items', 'payments'],
    });
  }

  async findOne(id: string): Promise<InvoiceEntity> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: ['branch', 'customer', 'status', 'createdBy', 'items', 'payments'],
    });
    if (!entity) throw new NotFoundException(`Factura no encontrada (id: ${id})`);
    return entity;
  }

  async update(id: string, payload: UpdateInvoiceDto): Promise<InvoiceEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Factura no encontrada para actualizar');
    
    this.repository.merge(entity, payload);
    return await this.repository.save(entity);
  }

  async remove(id: string): Promise<InvoiceEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Factura no encontrada para eliminar');
    return await this.repository.softRemove(entity);
  }

  async findItems(invoiceId: string): Promise<any[]> {
    // Buscar items de la factura según tu tabla invoice_items
    return await this.invoiceItemsRepository.find({
      where: { invoiceId },
      relations: ['staff', 'model'], // Ajusta las relaciones según tu entidad
      order: { createdAt: 'ASC' },
    });
  }

  // async findPayments(invoiceId: string): Promise<any[]> {
  //   // Buscar pagos de la factura según tu tabla payments
  //   return await this.paymentsRepository.find({
  //     where: { invoiceId },
  //     relations: ['method'], // Ajusta las relaciones según tu entidad
  //     order: { paidAt: 'ASC' },
  //   });
  // }

  async catalogue(): Promise<ServiceResponseHttpInterface> {
    const response = await this.repository.findAndCount({ 
      where: { statusId: 2 },
      take: 1000,
      relations: ['customer'],
    });
    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }
}
