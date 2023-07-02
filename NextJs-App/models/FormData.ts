
export interface FieldValue {
    fieldId: number,
    value: number | string
}

export default interface FormData {
    dateSaved: string,
    data: FieldValue[]
}