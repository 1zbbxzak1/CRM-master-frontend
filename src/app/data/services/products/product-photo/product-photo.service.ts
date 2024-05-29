import {inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IProductPhotoResponseModel} from "../../../response-models/product-photo/IProductPhoto.response-model";
import {IProductPhotoRequestModel} from "../../../request-models/product-photo/IProductPhoto.request-model";
import {environment} from "../../../../../environments/environment";

export class ProductPhotoService {

    private readonly _http: HttpClient = inject(HttpClient);
    private readonly apiUrl: string = `${environment.apiUrl}/products`;

    public addProductPhoto(productId: string, formData: FormData): Observable<any> {
        return this._http.post(`${this.apiUrl}/${productId}/photos`, formData, {withCredentials: true});
    }

    public updateOrderPhoto(productId: string, productPhoto: IProductPhotoRequestModel[]): Observable<IProductPhotoResponseModel[]> {
        return this._http.put<IProductPhotoResponseModel[]>(`${this.apiUrl}/${productId}/photos`, productPhoto, {withCredentials: true});
    }

    public deleteProductPhoto(productId: string, photoId: string): Observable<any> {
        return this._http.delete(`${this.apiUrl}/${productId}/photos/${photoId}`, {withCredentials: true});
    }
}
