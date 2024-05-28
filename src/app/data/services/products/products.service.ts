import {HttpClient} from "@angular/common/http";
import {inject} from "@angular/core";
import {Observable} from "rxjs";
import {IProductsResponseModel} from "../../response-models/products/IProducts.response-model";
import {IProductsRequestModel} from "../../request-models/products/IProducts.request-model";

export class ProductsService {

    private readonly _http: HttpClient = inject(HttpClient);
    private readonly apiUrl: string = 'http://localhost:8080/products';

    public getAllProducts(): Observable<any> {
        return this._http.get(`${this.apiUrl}`, {withCredentials: true});
    }

    public addProduct(formData: FormData): Observable<IProductsResponseModel> {
        return this._http.post<IProductsResponseModel>(`${this.apiUrl}`, formData, {withCredentials: true});
    }

    public getUserProduct(userId: string): Observable<IProductsResponseModel[]> {
        return this._http.get<IProductsResponseModel[]>(`${this.apiUrl}/user/${userId}`, {withCredentials: true});
    }

    public getProduct(id: string): Observable<IProductsResponseModel> {
        return this._http.get<IProductsResponseModel>(`${this.apiUrl}/${id}`, {withCredentials: true});
    }

    public updateProduct(id: string, product: IProductsRequestModel): Observable<any> {
        return this._http.put(`${this.apiUrl}/${id}`, product, {withCredentials: true});
    }

    public deleteProduct(id: string): Observable<any> {
        return this._http.delete(`${this.apiUrl}/${id}`, {withCredentials: true});
    }

    public toggleVisibility(id: string): Observable<any> {
        return this._http.patch(`${this.apiUrl}/${id}/toggle-visibility`, id, {withCredentials: true});
    }
}
