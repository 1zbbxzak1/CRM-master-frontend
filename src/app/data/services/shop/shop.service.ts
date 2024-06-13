import {ErrorHandler, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, NEVER, Observable} from "rxjs";
import {
    BlockDto,
    ChangeBlockRequest,
    ChangeWebsiteInfoRequest,
    CreateWebsiteOrderRequest,
    CreateWebsiteRequest,
    SelectTemplateRequest,
    WebsiteDto
} from "../../response-models/shop/shop.response-model";
import {environment} from "../../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ShopService {
    private _apiUrl: string = `${environment.apiUrl}/website`;

    constructor(private http: HttpClient, private errorHandler: ErrorHandler) {
    }

    getMainSection(): Observable<BlockDto[]> {
        return this.http.get<BlockDto[]>(`${this._apiUrl}/constructor/blocks/main`, {withCredentials: true}).pipe(
            catchError(err => {
                this.errorHandler.handleError(err);
                return NEVER;
            })
        );
    }

    changeBlock(id: string, request: ChangeBlockRequest): Observable<BlockDto> {
        return this.http.put<BlockDto>(`${this._apiUrl}/constructor/blocks/${id}`, request, {withCredentials: true}).pipe(
            catchError(err => {
                this.errorHandler.handleError(err);
                return NEVER;
            })
        );
    }

    getWebsiteInfo(): Observable<WebsiteDto> {
        return this.http.get<WebsiteDto>(`${this._apiUrl}/info`, {withCredentials: true}).pipe(
            catchError(err => {
                this.errorHandler.handleError(err);
                return NEVER;
            })
        );
    }

    changeWebsiteInfo(request: ChangeWebsiteInfoRequest): Observable<WebsiteDto> {
        return this.http.put<WebsiteDto>(`${this._apiUrl}/info`, request, {withCredentials: true}).pipe(
            catchError(err => {
                this.errorHandler.handleError(err);
                return NEVER;
            })
        );
    }

    createWebsite(request: CreateWebsiteRequest): Observable<WebsiteDto> {
        return this.http.post<WebsiteDto>(this._apiUrl, request, {withCredentials: true}).pipe(
            catchError(err => {
                this.errorHandler.handleError(err);
                return NEVER;
            })
        );
    }

    deleteWebsite(): Observable<void> {
        return this.http.delete<void>(`${this._apiUrl}`, {withCredentials: true}).pipe(
            catchError(err => {
                this.errorHandler.handleError(err);
                return NEVER;
            })
        );
    }

    selectTemplate(request: SelectTemplateRequest): Observable<WebsiteDto> {
        return this.http.post<WebsiteDto>(`${this._apiUrl}/select-template`, request, {withCredentials: true}).pipe(
            catchError(err => {
                this.errorHandler.handleError(err);
                return NEVER;
            })
        );
    }

    getWebsiteInfoForUser(address: string): Observable<WebsiteDto> {
        return this.http.get<WebsiteDto>(`${this._apiUrl}/${address}/info`, {withCredentials: true}).pipe(
            catchError(err => {
                this.errorHandler.handleError(err);
                return NEVER;
            })
        );
    }

    getBlocksInfo(address: string): Observable<BlockDto[]> {
        return this.http.get<BlockDto[]>(`${this._apiUrl}/${address}/blocks/main`, {withCredentials: true}).pipe(
            catchError(err => {
                this.errorHandler.handleError(err);
                return NEVER;
            })
        );
    }

    getVisibleProducts(address: string): Observable<any[]> {
        return this.http.get<any[]>(`${this._apiUrl}/${address}/products`).pipe(
            catchError(err => {
                this.errorHandler.handleError(err);
                return NEVER;
            })
        );
    }

    getMasterInfo(address: string): Observable<any> {
        return this.http.get<any>(`${this._apiUrl}/${address}/master-info`).pipe(
            catchError(err => {
                this.errorHandler.handleError(err);
                return NEVER;
            })
        );
    }

    createOrder(address: string, request: CreateWebsiteOrderRequest): Observable<void> {
        return this.http.post<void>(`${this._apiUrl}/${address}/orders`, request).pipe(
            catchError(err => {
                this.errorHandler.handleError(err);
                return NEVER;
            })
        );
    }
}
