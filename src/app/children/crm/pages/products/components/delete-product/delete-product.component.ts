import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, Inject, Input} from '@angular/core';
import {Observer} from "rxjs";
import {PolymorpheusContent} from "@tinkoff/ng-polymorpheus";
import {TuiDialogContext, TuiDialogService} from "@taiga-ui/core";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {TuiDialogFormService} from "@taiga-ui/kit";
import {ProductsManagerService} from "../../../../../../data/services/products/products.manager.service";
import {IProductsResponseModel} from "../../../../../../data/response-models/products/IProducts.response-model";
import {ProductsComponent} from "../../products.component";

@Component({
    selector: 'app-delete-product',
    templateUrl: './delete-product.component.html',
    styleUrl: './styles/delete-product.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteProductComponent {

    @Input() observer?: Observer<never>;
    @Input() id!: string;
    protected products: IProductsResponseModel[] = [];


    constructor(
        @Inject(TuiDialogFormService)
        private readonly _dialogForm: TuiDialogFormService,
        @Inject(TuiDialogService)
        private readonly _dialogs: TuiDialogService,
        private readonly _destroyRef: DestroyRef,
        private readonly _productsManagerService: ProductsManagerService,
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private readonly _productsComponent: ProductsComponent,
    ) {
    }

    public openDialogDelete(
        deleteProduct: PolymorpheusContent<TuiDialogContext>,
    ): void {
        this._dialogs.open(
            deleteProduct,
            {
                size: "s",
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

    protected deleteProduct(id: string): void {
        this._productsManagerService.deleteProduct(id).pipe(
            takeUntilDestroyed(this._destroyRef),
        ).subscribe(
            (): void => {
                this._productsComponent.fetchProducts();
                this.onCancel();
            });
    }

    protected onCancel(): void {
        if (this.observer) {
            this.observer.complete();
        }
    }
}
