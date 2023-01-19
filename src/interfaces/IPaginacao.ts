export interface IPaginacao<T> {
    count: number,
    next: string,
    previous: string,
    // T -> Tipo genérico
    results: T[]
}