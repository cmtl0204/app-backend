import { Global, Module } from '@nestjs/common';
import { coreProviders } from '@modules/core/core.provider';
import { SharedCoreModule } from '@modules/core/shared-core/shared-core.module';
import { OwnerModule } from '@modules/core/roles/owner/owner.module';
import { CustomerModule } from '@modules/core/roles/customer/customer.module';

@Global()
@Module({
  imports: [SharedCoreModule, OwnerModule, CustomerModule],
  providers: [...coreProviders],
})
export class CoreModule {}
