import { Module } from "@nestjs/common"
import { CustomersController } from "./customers.controller"
import { CustomersService } from "./customers.service"

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [CustomersService],
})
export class CustomersModule {}
