import {IProductsRequestModel} from "../../request-models/products/IProducts.request-model";

export interface IProductsResponseModel extends IProductsRequestModel {
    readonly id: string,
    readonly userId: string,
}
