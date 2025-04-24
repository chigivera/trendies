import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString, IsEmail } from "class-validator"

export class UpdateCustomerDto {
  @ApiProperty({ description: "Nom du client", required: false })
  @IsOptional()
  @IsString()
  name?: string

  @ApiProperty({ description: "Email du client", required: false })
  @IsOptional()
  @IsEmail()
  email?: string

  @ApiProperty({ description: "Numéro de téléphone du client", required: false })
  @IsOptional()
  @IsString()
  phone?: string

  @ApiProperty({ description: "Adresse du client", required: false })
  @IsOptional()
  @IsString()
  address?: string
}
