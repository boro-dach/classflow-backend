import { IsInt, IsString } from 'class-validator';

export class CreateSchoolDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsInt()
  principalId: number;
}
