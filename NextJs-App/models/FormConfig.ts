
export interface Option {
    name: string;
    value: number;
}

export interface Field {
    id: number;
    name: string;
    type: string;
    value?: number | string | null | undefined,
    options?: Option[];
}

export default interface FormConfig {
    id: number;
    formName: string;
    fields: Field[];
}
