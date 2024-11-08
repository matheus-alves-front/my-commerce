import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './common/modules/Prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { StoreModule } from './modules/store/store.module';
import { CustomerModule } from './modules/customer/customer.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { AttributeModule } from './modules/attribute/attribute.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    StoreModule,
    UserModule,
    CustomerModule,
    CategoryModule,
    ProductModule,
    AttributeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
