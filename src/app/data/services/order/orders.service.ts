import {HttpClient} from "@angular/common/http";
import {ErrorHandler, Injectable} from "@angular/core";
import {catchError, NEVER, Observable} from "rxjs";
import {
    ChangeOrderRequest,
    CreateOrderRequest,
    GetOrdersResponse
} from "../../response-models/orders/IOrders.response-model";
import {Order} from "../../request-models/orders/IOrders.request-model";
import {environment} from "../../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private apiUrl: string = `${environment.apiUrl}/orders`;

    constructor(private http: HttpClient, private readonly _errorHandler: ErrorHandler) {
    }

    getOrders(tab?: number): Observable<GetOrdersResponse> {
        const url = `${this.apiUrl}?tab=${tab}`;
        return this.http.get<GetOrdersResponse>(url, {withCredentials: true})
            .pipe(
                catchError(err => {
                    this._errorHandler.handleError(err);
                    return NEVER;
                })
            );
    }

    getOrderById(id: string): Observable<Order> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<Order>(url, {withCredentials: true})
            .pipe(
                catchError(err => {
                    this._errorHandler.handleError(err);
                    return NEVER;
                })
            );
    }

    createOrder(request: CreateOrderRequest): Observable<Order> {
        return this.http.post<Order>(this.apiUrl, request, {withCredentials: true})
            .pipe(
                catchError(err => {
                    this._errorHandler.handleError(err);
                    return NEVER;
                })
            );
    }

    updateOrder(id: string, request: ChangeOrderRequest): Observable<Order> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.put<Order>(url, request, {withCredentials: true})
            .pipe(
                catchError(err => {
                    this._errorHandler.handleError(err);
                    return NEVER;
                })
            );
    }

    deleteOrder(id: string): Observable<void> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete<void>(url, {withCredentials: true})
            .pipe(
                catchError(err => {
                    this._errorHandler.handleError(err);
                    return NEVER;
                })
            );
    }
}
