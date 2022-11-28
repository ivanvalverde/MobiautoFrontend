export type Brand = {
    nome: string;
    codigo: string;
}

export type Year = Brand;
export type Model = Brand;

export type CarModel = {
    anos: Year[];
    modelos: Model[];
}

export type InputValues = {
    brand: string;
    model: string;
    year: string;
}