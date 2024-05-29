import {HttpClient} from "@angular/common/http";
import {inject} from "@angular/core";
import {Observable} from "rxjs";
import {IProductsResponseModel} from "../../response-models/products/IProducts.response-model";
import {IProductsRequestModel} from "../../request-models/products/IProducts.request-model";
import {environment} from "../../../../environments/environment";

export class ProductsService {

    private readonly _http: HttpClient = inject(HttpClient);
    private readonly _apiUrl: string = `${environment.apiUrl}/products`;

    public getAllProducts(): Observable<any> {
        return this._http.get(`${this._apiUrl}`, {withCredentials: true});
    }

    public addProduct(formData: FormData): Observable<IProductsResponseModel> {
        return this._http.post<IProductsResponseModel>(`${this._apiUrl}`, formData, {withCredentials: true});
    }

    public getUserProduct(userId: string): Observable<IProductsResponseModel[]> {
        return this._http.get<IProductsResponseModel[]>(`${this._apiUrl}/user/${userId}`, {withCredentials: true});
    }

    public getProduct(id: string): Observable<IProductsResponseModel> {
        return this._http.get<IProductsResponseModel>(`${this._apiUrl}/${id}`, {withCredentials: true});
    }

    public updateProduct(id: string, product: IProductsRequestModel): Observable<any> {
        return this._http.put(`${this._apiUrl}/${id}`, product, {withCredentials: true});
    }

    public deleteProduct(id: string): Observable<any> {
        return this._http.delete(`${this._apiUrl}/${id}`, {withCredentials: true});
    }

    public toggleVisibility(id: string): Observable<any> {
        return this._http.patch(`${this._apiUrl}/${id}/toggle-visibility`, id, {withCredentials: true});
    }
}
