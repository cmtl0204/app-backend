import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateCustomerDto, UpdateCustomerDto } from '../dto/customer';
import { CustomerEntity } from '@modules/core/entities';
import { ServiceResponseHttpInterface } from '@utils/interfaces';
import { CoreRepositoryEnum } from '@utils/enums';
import { PaginateFilterService, PaginationDto } from '@utils/pagination';

@Injectable()
export class CustomersService {
  private paginateFilterService: PaginateFilterService<CustomerEntity>;

  constructor(
    @Inject(CoreRepositoryEnum.CUSTOMER_REPOSITORY)
    private repository: Repository<CustomerEntity>,
  ) {
    this.paginateFilterService = new PaginateFilterService(this.repository);
  }

  async create(payload: CreateCustomerDto): Promise<CustomerEntity> {
    const entity = this.repository.create(payload);
    return await this.repository.save(entity);
  }

  async findAll(params: PaginationDto): Promise<ServiceResponseHttpInterface> {
    return this.paginateFilterService.execute({
      params,
      searchFields: ['taxName', 'taxIdentification'],
      relations: ['user', 'referral'],
    });
  }

  async findOne(id: string): Promise<CustomerEntity> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: ['user', 'referral'],
    });
    if (!entity) {
      throw new NotFoundException(`Cliente no encontrado (id: ${id})`);
    }
    return entity;
  }

  async update(id: string, payload: UpdateCustomerDto): Promise<CustomerEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException('Cliente no encontrado para actualizar');
    }
    this.repository.merge(entity, payload);
    return await this.repository.save(entity);
  }

  async remove(id: string): Promise<CustomerEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException('Cliente no encontrado para eliminar');
    }
    return await this.repository.softRemove(entity);
  }

  async catalogue(): Promise<ServiceResponseHttpInterface> {
    const response = await this.repository.findAndCount({ take: 1000 });
    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }
}
