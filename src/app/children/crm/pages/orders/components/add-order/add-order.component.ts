import {ChangeDetectorRef, Component, DestroyRef, Inject} from '@angular/core';
import {TuiDialogService} from "@taiga-ui/core";
import {TuiDialogFormService} from "@taiga-ui/kit";
import {OrderService} from "../../../../../../data/services/order/orders.service";

@Component({
    selector: 'app-add-order',
    templateUrl: './add-order.component.html',
    styleUrl: './add-order.component.css'
})
export class AddOrderComponent {

    constructor(
        @Inject(TuiDialogFormService)
        private readonly _dialogForm: TuiDialogFormService,
        @Inject(TuiDialogService)
        private readonly _dialogs: TuiDialogService,
        private readonly _destroyRef: DestroyRef,
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private readonly _orderService: OrderService,
    ) {
    }
}
