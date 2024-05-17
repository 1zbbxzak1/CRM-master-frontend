export interface IProductsRequestModel {
    readonly name: string,
    readonly description: string,
    readonly price: number,
    readonly material: string,
    readonly dimensions: string,
    readonly isVisible: string,
    readonly photos: [
        {
            id: string,
            url: string,
            order: string,
        }
    ],
}
