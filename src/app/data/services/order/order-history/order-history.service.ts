import {inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IOrderHistoryResponseModel} from "../../../response-models/order-history/IOrder-history.response-model";
import {environment} from "../../../../../environments/environment";

export class OrderHistoryService {

    private readonly _http: HttpClient = inject(HttpClient);
    private readonly _apiUrl: string = `${environment.apiUrl}/orders`;

    public getOrderHistory(orderId: string | null): Observable<IOrderHistoryResponseModel[]> {
        return this._http.get<IOrderHistoryResponseModel[]>(`${this._apiUrl}/${orderId}/history`, {withCredentials: true});
    }
}
