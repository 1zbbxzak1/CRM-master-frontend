import {ChangeDetectorRef, Component, DestroyRef} from '@angular/core';
import {FormatterService} from "../../../clients/services/formatter.service";
import {ActivatedRoute, Params} from "@angular/router";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {OrderHistoryService} from "../../../../../../data/services/order/order-history/order-history.service";
import {
    IOrderHistoryResponseModel
} from "../../../../../../data/response-models/order-history/IOrder-history.response-model";

@Component({
    selector: 'app-order-history-stage',
    templateUrl: './order-history-stage.component.html',
    styleUrl: './order-history-stage.component.css'
})
export class OrderHistoryStageComponent extends FormatterService {
    protected orderId!: string;
    protected history!: IOrderHistoryResponseModel[];

    constructor(
        private readonly _route: ActivatedRoute,
        protected readonly _destroyRef: DestroyRef,
        private readonly _changeDetectorRef: ChangeDetectorRef,
        protected readonly _orderHistoryService: OrderHistoryService,
    ) {
        super();
        this._route.params.subscribe((params: Params): void => {
            this.orderId = params['id'];

            this._orderHistoryService.getOrderHistory(this.orderId).pipe(
                takeUntilDestroyed(this._destroyRef)
            ).subscribe((history: IOrderHistoryResponseModel[]): void => {
                if (history) {
                    history.sort((a: IOrderHistoryResponseModel, b: IOrderHistoryResponseModel) => {
                        return new Date(b.date).getTime() - new Date(a.date).getTime();
                    });
                }
                this.history = history;

                this._changeDetectorRef.detectChanges();
            });
        });
    }
}
