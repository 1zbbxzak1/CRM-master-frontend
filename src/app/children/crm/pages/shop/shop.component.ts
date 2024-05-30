import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    ElementRef,
    Inject,
    ViewChild
} from '@angular/core';
import {PolymorpheusContent} from "@tinkoff/ng-polymorpheus";
import {TuiDialogContext, TuiDialogService} from "@taiga-ui/core";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {TuiDialogFormService} from "@taiga-ui/kit";
import {FormControl, FormGroup} from "@angular/forms";
import {ShopService} from "../../../../data/services/shop/shop.service";
import {CreateWebsiteRequest, WebsiteDto} from "../../../../data/response-models/shop/shop.response-model";
import {Router} from "@angular/router";

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['../../styles/crm-styles.css', './styles/shop.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopComponent {
    @ViewChild('urlToCopy') urlToCopy!: ElementRef;
    protected formCreateShop: FormGroup = new FormGroup({
        title: new FormControl(''),
        addressName: new FormControl(''),
    });
    protected website!: WebsiteDto;
    protected websiteFound: boolean = false;

    constructor(
        protected readonly _router: Router,
        @Inject(TuiDialogFormService)
        private readonly _dialogForm: TuiDialogFormService,
        @Inject(TuiDialogService)
        private readonly _dialogs: TuiDialogService,
        private readonly _destroyRef: DestroyRef,
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private readonly _shopService: ShopService,
    ) {
        this._shopService.getWebsiteInfo().pipe(
            takeUntilDestroyed(this._destroyRef)
        )
            .subscribe((web: WebsiteDto): void => {
                    this.website = web;

                    this.websiteFound = !!this.website;

                    this._changeDetectorRef.markForCheck();
                }
            );
    }

    public openDialogCreateShop(
        shop: PolymorpheusContent<TuiDialogContext>,
    ): void {
        this._dialogs.open(
            shop,
            {
                size: "auto",
            })
            .pipe(
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe({
                complete: (): void => {
                    this._dialogForm.markAsPristine();
                },
            });
    }

    protected copyUrlToClipboard(element: HTMLDivElement): void {
        const textToCopy: string = `http://${element.textContent!.trim()}`;
        navigator.clipboard.writeText(textToCopy);
    }

    protected nextPage(): void {
        const title = this.formCreateShop.get('title')?.value;
        const addressName = this.formCreateShop.get('addressName')?.value;

        if (title && addressName) {
            const web: CreateWebsiteRequest = {
                title,
                addressName
            }

            this._shopService.createWebsite(web).pipe(
                takeUntilDestroyed(this._destroyRef)
            ).subscribe((web: WebsiteDto): void => {
                this.website = web;

                this._changeDetectorRef.detectChanges();

                this._router.navigate(['crm/shop/shop-templates']);
            })
        }
    }
}
