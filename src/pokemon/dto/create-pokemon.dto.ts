import { IsNumber, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreatePokemonDto {
    @IsString()
    @MinLength(3)
    @MaxLength(10)
    name: string;

    @IsNumber()
    @Min(1)
    @Max(50)
    no: number;
}
