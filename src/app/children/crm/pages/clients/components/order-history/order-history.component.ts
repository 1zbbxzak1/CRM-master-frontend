import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, Input} from '@angular/core';
import {ClientDto} from "../../../../../../data/response-models/clients/IClients.response-model";
import {ActivatedRoute, Params} from "@angular/router";
import {ClientsManagerService} from "../../../../../../data/services/clients/clients.manager.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {FormatterService} from "../../services/formatter.service";
import {GetOrderItemResponse} from "../../../../../../data/request-models/orders/IOrders.response-model";

@Component({
    selector: 'app-order-history',
    templateUrl: './order-history.component.html',
    styleUrl: './styles/order-history.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderHistoryComponent extends FormatterService {
    @Input() clientId!: string;
    protected client!: ClientDto | null;

    constructor(
        private readonly _route: ActivatedRoute,
        protected readonly _destroyRef: DestroyRef,
        private readonly _changeDetectorRef: ChangeDetectorRef,
        protected readonly _clientsManagerService: ClientsManagerService,
    ) {
        super();
        this._route.params.subscribe((params: Params): void => {
            this.clientId = params['id'];

            this._clientsManagerService.getClientById(this.clientId).pipe(
                takeUntilDestroyed(this._destroyRef)
            ).subscribe((client: ClientDto | null): void => {
                if (client) {
                    client.orders.sort((a: GetOrderItemResponse, b: GetOrderItemResponse) => {
                        return new Date(b.date).getTime() - new Date(a.date).getTime();
                    });
                }
                this.client = client;

                this._changeDetectorRef.detectChanges();
            });
        });
    }
}
