export interface Counter {
    value: number;
    [name: string]: any;
}
declare function counterFactory(): Counter;
export default counterFactory;
