import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef} from '@angular/core';
import {ShopService} from "../../../../../../data/services/shop/shop.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-templates',
    templateUrl: './templates.component.html',
    styleUrls: ['../../../../styles/crm-styles.css', './styles/templates.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplatesComponent {

    constructor(
        protected readonly _router: Router,
        private readonly _destroyRef: DestroyRef,
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private readonly _shopService: ShopService,
    ) {

    }

    protected backToShop(): void {
        this._shopService.deleteWebsite().subscribe(
            {
                next: (): void => {
                    console.log('yes');
                    this._changeDetectorRef.detectChanges();
                    this._router.navigate(['crm/shop']);
                },
                error: (err) => {
                    console.log(err);
                }
            }
        )
    }
}
