import {ChangeDetectorRef, Component, DestroyRef} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ProductsManagerService} from "../../../../../../data/services/products/products.manager.service";
import {IProductsRequestModel} from "../../../../../../data/request-models/products/IProducts.request-model";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {IProductsResponseModel} from "../../../../../../data/response-models/products/IProducts.response-model";

@Component({
    selector: 'app-update-product',
    templateUrl: './update-product.component.html',
    styleUrls: ['../../../../styles/crm-styles.css', './styles/update-product.component.css']
})
export class UpdateProductComponent {
    protected productId!: string;
    protected product!: IProductsResponseModel;
    protected material: null = null;
    protected open: boolean = false;

    protected readonly materials: string[] = [
        'Дерево',
        'Керамика',
        'Кожа',
        'Ткань',
        'Металл',
        'Стекло',
        'Резина',
        'Бумага',
        'Камень',
    ];
    protected formProductInfo: FormGroup = new FormGroup({
        name: new FormControl(''),
        price: new FormControl(0),
        material: new FormControl(''),
        dimensions: new FormControl(''),
        description: new FormControl(''),
    });

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
            ).subscribe((product: IProductsResponseModel): void => {
                this.product = product;

                if (product) {
                    this.formProductInfo.patchValue({
                        name: product.name,
                        price: product.price,
                        material: product.material,
                        dimensions: product.dimensions,
                        description: product.description,
                    })
                }

                this._changeDetectorRef.detectChanges();
            });
        });
    }

    protected updateProduct(): void {
        const name: string = this.formProductInfo.get('name')?.value;
        const price: number = this.formProductInfo.get('price')?.value;
        const material: string = this.formProductInfo.get('material')?.value;
        const dimensions: string = this.formProductInfo.get('dimensions')?.value;
        const description: string = this.formProductInfo.get('description')?.value;

        if (name && price && material && dimensions && description) {
            const product: IProductsRequestModel = {
                name,
                price,
                material,
                dimensions,
                description,
            };

            this._productManagerService.updateProduct(this.product.id, product).pipe(
                takeUntilDestroyed(this._destroyRef)
            ).subscribe({
                next: (): void => {
                    this.navigateToPreviousPage(this.product.id);
                },
            });
        }
    }

    protected navigateToPreviousPage(id: string): void {
        this._router.navigate(['crm/products/info-product', id]);
    }
}
