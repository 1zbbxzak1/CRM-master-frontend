import {IProductsRequestModel} from "../../request-models/products/IProducts.request-model";
import {IProductPhotoResponseModel} from "../product-photo/IProductPhoto.response-model";

export interface IProductsResponseModel extends IProductsRequestModel {
    id: string;
    userId: string;
    isVisible: boolean;
    photos: IProductPhotoResponseModel[];
}
