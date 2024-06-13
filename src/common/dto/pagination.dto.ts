import { IsNumber, IsOptional, Max, Min } from "class-validator";


export class PaginationDto {
    @IsOptional()
    @IsNumber()
    @Max(20)
    @Min(1)
    skip?: number;


    @IsOptional()
    @IsNumber()
    @Max(20)
    @Min(5)
    limit?: number;
}