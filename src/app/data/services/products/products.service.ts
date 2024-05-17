import {HttpClient} from "@angular/common/http";
import {inject} from "@angular/core";
import {Observable} from "rxjs";
import {IProductsResponseModel} from "../../response-models/products/IProducts.response-model";
import {ProductsModel} from "../../models/products/products.model";
import {IProductsRequestModel} from "../../request-models/products/IProducts.request-model";

export class ProductsService {

    private readonly _http: HttpClient = inject(HttpClient);
    private readonly apiUrl: string = 'http://localhost:8080/products';

    public getAllProducts(): Observable<ProductsModel[]> {
        return this._http.get<IProductsResponseModel[]>(`${this.apiUrl}`, {withCredentials: true});
    }

    public addProduct(product: IProductsRequestModel): Observable<any> {
        return this._http.post(`${this.apiUrl}`, product, {withCredentials: true});
    }

    public getUserProduct(userId: string): Observable<ProductsModel[]> {
        return this._http.get<ProductsModel[]>(`${this.apiUrl}/user/${userId}`, {withCredentials: true});
    }

    public getProduct(id: string): Observable<ProductsModel> {
        return this._http.get<ProductsModel>(`${this.apiUrl}/${id}`, {withCredentials: true});
    }

    public updateProduct(product: ProductsModel): Observable<any> {
        return this._http.put(`${this.apiUrl}/${product.id}`, {product}, {withCredentials: true});
    }

    public deleteProduct(id: string): Observable<any> {
        return this._http.delete(`${this.apiUrl}/${id}`, {withCredentials: true});
    }

    public toggleVisibility(id: string): Observable<any> {
        return this._http.patch(`${this.apiUrl}/${id}/toggle-visibility`, id, {withCredentials: true});
    }
}
