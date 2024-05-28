import {ErrorHandler, inject} from '@angular/core';
import {ProductPhotoService} from "./product-photo.service";
import {catchError, NEVER, Observable} from "rxjs";
import {IProductPhotoResponseModel} from "../../../response-models/product-photo/IProductPhoto.response-model";
import {IProductPhotoRequestModel} from "../../../request-models/product-photo/IProductPhoto.request-model";

export class ProductPhotoManagerService {

    private readonly _productPhotoService: ProductPhotoService = inject(ProductPhotoService);
    private readonly _errorHandler: ErrorHandler = inject(ErrorHandler);

    public addProductPhoto(productId: string, formFiles: File[]): Observable<IProductPhotoResponseModel> {
        const formData: FormData = new FormData();

        formFiles.forEach((file: File): void => {
            formData.append('formFiles', file, file.name);
        });

        return this._productPhotoService.addProductPhoto(productId, formData).pipe(
            catchError(err => {
                this._errorHandler.handleError(err);
                return NEVER;
            })
        );
    }

    public updateProductPhoto(productId: string, productPhoto: IProductPhotoRequestModel[]): Observable<IProductPhotoResponseModel[]> {
        return this._productPhotoService.updateOrderPhoto(productId, productPhoto).pipe(
            catchError(err => {
                this._errorHandler.handleError(err);
                return NEVER;
            })
        );
    }

    public deleteProductPhoto(productId: string, photoId: string): Observable<any> {
        return this._productPhotoService.deleteProductPhoto(productId, photoId).pipe(
            catchError(err => {
                this._errorHandler.handleError(err);
                return NEVER;
            })
        );
    }
}
