import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit, ViewChild} from '@angular/core';
import {ProductsManagerService} from "../../../../data/services/products/products.manager.service";
import {IProductsResponseModel} from "../../../../data/response-models/products/IProducts.response-model";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {PolymorpheusContent} from "@tinkoff/ng-polymorpheus";
import {TuiDialogContext} from "@taiga-ui/core";
import {DeleteProductComponent} from "./components/delete-product/delete-product.component";
import {Router} from "@angular/router";

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['../../styles/crm-styles.css', './styles/products.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnInit {
    protected products: IProductsResponseModel[] = [];
    protected search: string = '';
    protected clickedInside: boolean = false;
    protected selectedProductId!: string;

    @ViewChild(DeleteProductComponent)
    private readonly _deleteProductComponent!: DeleteProductComponent;

    constructor(
        private readonly _productsManagerService: ProductsManagerService,
        private readonly _destroyRef: DestroyRef,
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private readonly _router: Router,
    ) {
    }

    ngOnInit(): void {
        this.fetchProducts();
    }

    fetchProducts(): void {
        this._productsManagerService.getAllProducts().pipe(
            takeUntilDestroyed(this._destroyRef)
        ).subscribe((products: IProductsResponseModel[]): void => {
            this.products = products;

            this._changeDetectorRef.detectChanges();
        });
    }

    protected searchProducts(): IProductsResponseModel[] {
        return this.products.filter((product: IProductsResponseModel) => product.name.toLowerCase().includes(this.search.toLowerCase()));
    }

    protected navigateToInfoProductPage(id: string): void {
        if (!this.clickedInside) {
            this._router.navigate(['crm/products/info-product', id]);
        }
        this.clickedInside = false;
    }

    protected navigateToAddProductPage(): void {
        this._router.navigate(['crm/products/add-product']);
    }

    protected openDialogDelete(
        deleteProduct: PolymorpheusContent<TuiDialogContext>,
        productId: string,
    ): void {
        this.clickedInside = true;
        this.selectedProductId = productId;
        this._deleteProductComponent.openDialogDelete(deleteProduct);
    }

    protected toggleVisibility(id: string): void {
        this.clickedInside = true;
        this._productsManagerService.toggleVisibility(id).pipe(
            takeUntilDestroyed(this._destroyRef),
        ).subscribe(
            (): void => {
                this.fetchProducts();
            });
    }
}
