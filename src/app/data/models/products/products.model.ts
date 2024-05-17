import {IProductsResponseModel} from "../../response-models/products/IProducts.response-model";
import {IProductsRequestModel} from "../../request-models/products/IProducts.request-model";

export class ProductsModel implements IProductsResponseModel {
    public id: string;
    public userId: string;
    public name: string;
    public description: string;
    public price: number;
    public material: string;
    public dimensions: string;
    public isVisible: string;
    public photos: [{ id: string; url: string; order: string; }];

    constructor(data: IProductsRequestModel, id: string, userId: string) {
        this.id = id;
        this.userId = userId;
        this.name = data.name;
        this.description = data.description;
        this.price = data.price;
        this.material = data.material;
        this.dimensions = data.dimensions;
        this.isVisible = data.isVisible;
        this.photos = data.photos;
    }
}
