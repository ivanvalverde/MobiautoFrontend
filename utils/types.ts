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
    brand: FormattedData;
    model: FormattedData;
    year: FormattedData;
}

export type LoadingState = {
    brand: boolean;
    model: boolean;
    year: boolean;
    submit: boolean;
}

export type CarValue = {
    Valor: string;
    Marca: string;
    Modelo: string;
    AnoModelo: number;
    Combustivel: string;
    CodigoFipe: string;
    MesReferencia: string;
    TipoVeiculo: number;
    SiglaCombustivel: string;
}

export type FormattedData = {
    label: string;
    code: string;
}