import {DestroyRef, inject, Injectable} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {filter} from "rxjs";

@Injectable()
export class StateBarService {
    public readonly _router: Router = inject(Router);
    public readonly _destroyRef: DestroyRef = inject(DestroyRef);
    protected statesSidebar: { [key: string]: boolean } = {
        isOrdersClicked: false,
        isClientsClicked: false,
        isProductsClicked: false,
        isShopClicked: false,
        isProfileClicked: false
    };

    constructor() {
        this.initStatesSidebar();
        this._router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            takeUntilDestroyed(this._destroyRef)
        )
            .subscribe((): void => {
                this.initStatesSidebar();
            });
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
