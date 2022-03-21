import { IsOptional } from 'class-validator';

export class address {
  @IsOptional()
  country: string;
  @IsOptional()
  state: string;
  @IsOptional()
  zip_code: string;
}
export class links {
  @IsOptional()
  instagram: string;
  @IsOptional()
  website: string;
}
export class professional {
  @IsOptional()
  work_status: string;
  @IsOptional()
  experience: string;
  @IsOptional()
  current_job: string;
}
export class education {
  @IsOptional()
  level: string;
  @IsOptional()
  field: string;
  @IsOptional()
  education_country: string;
}
