import {ErrorHandler, inject} from '@angular/core';
import {ProductsService} from "./products.service";
import {catchError, NEVER, Observable} from "rxjs";
import {ProductsModel} from "../../models/products/products.model";
import {IProductsRequestModel} from "../../request-models/products/IProducts.request-model";

export class ProductsManagerService {

    private readonly _productsService: ProductsService = inject(ProductsService);
    private readonly _errorHandler: ErrorHandler = inject(ErrorHandler);

    public getAllProducts(): Observable<ProductsModel[]> {
        return this._productsService.getAllProducts().pipe(
            catchError(err => {
                this._errorHandler.handleError(err);
                return NEVER;
            })
        );
    }

    public addProduct(product: IProductsRequestModel): Observable<ProductsModel> {
        return this._productsService.addProduct(product).pipe(
            catchError(err => {
                this._errorHandler.handleError(err);
                return NEVER;
            })
        );
    }

    public getUserProduct(userId: string): Observable<ProductsModel[]> {
        return this._productsService.getUserProduct(userId).pipe(
            catchError(err => {
                this._errorHandler.handleError(err);
                return NEVER;
            })
        );
    }

    public getProduct(id: string): Observable<ProductsModel> {
        return this._productsService.getProduct(id).pipe(
            catchError(err => {
                this._errorHandler.handleError(err);
                return NEVER;
            })
        );
    }

    public updateProduct(product: ProductsModel): Observable<ProductsModel> {
        return this._productsService.updateProduct(product).pipe(
            catchError(err => {
                this._errorHandler.handleError(err);
                return NEVER;
            })
        );
    }

    public deleteProduct(id: string): Observable<ProductsModel> {
        return this._productsService.deleteProduct(id).pipe(
            catchError(err => {
                this._errorHandler.handleError(err);
                return NEVER;
            })
        );
    }

    public toggleVisibility(id: string): Observable<ProductsModel> {
        return this._productsService.toggleVisibility(id).pipe(
            catchError(err => {
                this._errorHandler.handleError(err);
                return NEVER;
            })
        );
    }
}
