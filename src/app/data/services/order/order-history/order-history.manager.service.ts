import {ErrorHandler, inject} from '@angular/core';
import {OrderHistoryService} from "./order-history.service";
import {catchError, NEVER, Observable} from "rxjs";
import {IOrderHistoryResponseModel} from "../../../response-models/order-history/IOrder-history.response-model";

export class OrderHistoryManagerService {

    private readonly _orderHistoryService: OrderHistoryService = inject(OrderHistoryService);
    private readonly _errorHandler: ErrorHandler = inject(ErrorHandler);

    public getOrderHistory(orderId: string | null): Observable<IOrderHistoryResponseModel[]> {
        return this._orderHistoryService.getOrderHistory(orderId).pipe(
            catchError(err => {
                this._errorHandler.handleError(err);
                return NEVER;
            })
        );
    }
}
