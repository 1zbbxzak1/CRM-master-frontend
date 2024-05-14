import {DestroyRef, Injectable} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {filter} from "rxjs";

@Injectable()
export class StateBarService {
    protected statesTabs: { [key: string]: boolean } = {
        isAllOrders: false,
        isNewOrders: false,
        isProgressOrders: false,
        isDeliveryOrders: false,
        isArchiveOrders: false,
    };

    protected statesSidebar: { [key: string]: boolean } = {
        isOrdersClicked: false,
        isClientsClicked: false,
        isProductsClicked: false,
        isShopClicked: false,
        isProfileClicked: false
    };

    constructor(
        private readonly _router: Router,
        private readonly _destroyRef: DestroyRef
    ) {
        this.initStatesSidebar();
        this.initStatesTabs();
        this._router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            takeUntilDestroyed(this._destroyRef)
        )
            .subscribe((): void => {
                this.initStatesSidebar();
                this.initStatesTabs();
            });
    }


    protected initStatesTabs(): void {
        const url: string = this._router.url;
        this.resetStates(this.statesTabs);
        if (url.includes('crm/orders/all-orders')) {
            this.statesTabs['isAllOrders'] = true;
        } else if (url.includes('crm/orders/new-orders')) {
            this.statesTabs['isNewOrders'] = true;
        } else if (url.includes('crm/orders/progress-orders')) {
            this.statesTabs['isProgressOrders'] = true;
        } else if (url.includes('crm/orders/delivery-orders')) {
            this.statesTabs['isDeliveryOrders'] = true;
        } else if (url.includes('crm/orders/archive-orders')) {
            this.statesTabs['isArchiveOrders'] = true;
        }
    }

    private initStatesSidebar(): void {
        const url: string = this._router.url;
        this.resetStates(this.statesSidebar);
        if (url.includes('crm/orders')) {
            this.statesSidebar['isOrdersClicked'] = true;
        } else if (url.includes('crm/clients')) {
            this.statesSidebar['isClientsClicked'] = true;
        } else if (url.includes('crm/products')) {
            this.statesSidebar['isProductsClicked'] = true;
        } else if (url.includes('crm/shop')) {
            this.statesSidebar['isShopClicked'] = true;
        } else if (url.includes('crm/profile')) {
            this.statesSidebar['isProfileClicked'] = true;
        }
    }

    private resetStates(state: { [key: string]: boolean }): void {
        for (const key in state) {
            if (Object.prototype.hasOwnProperty.call(state, key)) {
                state[key] = false;
            }
        }
    }
}
