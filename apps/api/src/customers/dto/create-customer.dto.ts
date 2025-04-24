import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsEmail, IsOptional } from "class-validator"

export class CreateCustomerDto {
  @ApiProperty({ description: "Nom du client" })
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty({ description: "Email du client" })
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty({ description: "Numéro de téléphone du client", required: false })
  @IsOptional()
  @IsString()
  phone?: string

  @ApiProperty({ description: "Adresse du client", required: false })
  @IsOptional()
  @IsString()
  address?: string
}
