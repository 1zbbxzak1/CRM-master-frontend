import {ErrorHandler, inject} from '@angular/core';
import {ProductsService} from "./products.service";
import {catchError, NEVER, Observable} from "rxjs";
import {IProductsRequestModel} from "../../request-models/products/IProducts.request-model";
import {IProductsResponseModel} from "../../response-models/products/IProducts.response-model";

export class ProductsManagerService {

    private readonly _productsService: ProductsService = inject(ProductsService);
    private readonly _errorHandler: ErrorHandler = inject(ErrorHandler);

    public getAllProducts(): Observable<IProductsResponseModel[]> {
        return this._productsService.getAllProducts().pipe(
            catchError(err => {
                this._errorHandler.handleError(err);
                return NEVER;
            })
        );
    }

    public addProduct(product: IProductsRequestModel, formFiles: File[]): Observable<IProductsResponseModel> {
        const formData: FormData = new FormData();

        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('price', product.price.toString());
        formData.append('material', product.material);
        formData.append('dimensions', product.dimensions);

        formFiles.forEach((file: File): void => {
            formData.append('formFiles', file, file.name);
        });

        return this._productsService.addProduct(formData).pipe(
            catchError(err => {
                this._errorHandler.handleError(err);
                return NEVER;
            })
        );
    }

    public getUserProduct(userId: string): Observable<any> {
        return this._productsService.getUserProduct(userId).pipe(
            catchError(err => {
                this._errorHandler.handleError(err);
                return NEVER;
            })
        );
    }

    public getProduct(id: string): Observable<any> {
        return this._productsService.getProduct(id).pipe(
            catchError(err => {
                this._errorHandler.handleError(err);
                return NEVER;
            })
        );
    }

    public updateProduct(id: string, product: IProductsRequestModel): Observable<IProductsResponseModel> {
        return this._productsService.updateProduct(id, product).pipe(
            catchError(err => {
                this._errorHandler.handleError(err);
                return NEVER;
            })
        );
    }

    public deleteProduct(id: string): Observable<IProductsResponseModel> {
        return this._productsService.deleteProduct(id).pipe(
            catchError(err => {
                this._errorHandler.handleError(err);
                return NEVER;
            })
        );
    }

    public toggleVisibility(id: string): Observable<IProductsResponseModel> {
        return this._productsService.toggleVisibility(id).pipe(
            catchError(err => {
                this._errorHandler.handleError(err);
                return NEVER;
            })
        );
    }
}
