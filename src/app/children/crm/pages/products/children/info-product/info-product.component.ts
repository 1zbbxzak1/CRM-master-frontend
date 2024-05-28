import {ChangeDetectorRef, Component, DestroyRef} from '@angular/core';
import {IProductsResponseModel} from "../../../../../../data/response-models/products/IProducts.response-model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ProductsManagerService} from "../../../../../../data/services/products/products.manager.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
    selector: 'app-info-product',
    templateUrl: './info-product.component.html',
    styleUrls: ['../add-product/styles/add-product.component.css', '../../../../styles/crm-styles.css', './styles/info-product.component.css']
})
export class InfoProductComponent {
    protected productId!: string;
    protected product!: IProductsResponseModel;

    constructor(
        private readonly _router: Router,
        private readonly _route: ActivatedRoute,
        protected readonly _destroyRef: DestroyRef,
        private readonly _changeDetectorRef: ChangeDetectorRef,
        protected readonly _productManagerService: ProductsManagerService,
    ) {
        this._route.params.subscribe((params: Params): void => {
            this.productId = params['id'];

            this._productManagerService.getProduct(this.productId).pipe(
                takeUntilDestroyed(this._destroyRef)
            ).subscribe((products: IProductsResponseModel): void => {
                this.product = products;

                this._changeDetectorRef.detectChanges();
            });
        });
    }

    protected navigateToPreviousPage(): void {
        this._router.navigate(['crm/products']);
    }

    protected navigateToUpdateInfoPage(id: string): void {
        this._router.navigate(['crm/products/update-product', id]);
    }
}
