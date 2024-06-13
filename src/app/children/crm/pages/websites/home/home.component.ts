import {ChangeDetectorRef, Component, DestroyRef, OnDestroy, OnInit} from '@angular/core';
import {BlockDto, TextSectionDto, WebsiteDto} from "../../../../../data/response-models/shop/shop.response-model";
import {IProductsResponseModel} from "../../../../../data/response-models/products/IProducts.response-model";
import {delay, Observable, Subscription, switchMap} from "rxjs";
import {IUserResponseModel} from "../../../../../data/response-models/user/IUser.response-model";
import {ActivatedRoute, Router} from "@angular/router";
import {ShopService} from "../../../../../data/services/shop/shop.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ProductCountService} from "../../shop/children/services/product-count.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['../../../styles/crm-styles.css', './styles/home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
    loading: boolean = true;
    countProduct = 0;
    protected countProductSubscription!: Subscription;
    protected textSections: TextSectionDto[] = [];
    protected products: IProductsResponseModel[] = [];
    protected search: string = '';
    protected isSortedAsc: boolean = true;
    protected blocks: BlockDto[] = [];
    protected user!: Observable<IUserResponseModel>;
    protected website!: WebsiteDto;

    protected addressName: string = '';

    constructor(
        protected readonly _destroyRef: DestroyRef,
        protected readonly _changeDetectorRef: ChangeDetectorRef,
        protected readonly _router: Router,
        private route: ActivatedRoute,
        protected readonly _shopService: ShopService,
        private productCountService: ProductCountService,
    ) {
        setTimeout(() => {
            this.loading = false;
            this._changeDetectorRef.detectChanges();
        }, 500);
    }

    ngOnInit(): void {
        this.addressName = this.route.snapshot.paramMap.get('address')!;

        this.countProduct = this.productCountService.getCountProduct();
        this.countProductSubscription = this.productCountService.countProductChanged.subscribe((count: number) => {
            this.countProduct = count;
        });

        this._shopService.getWebsiteInfoForUser(this.addressName).pipe(
            takeUntilDestroyed(this._destroyRef),
            switchMap((web: WebsiteDto): Observable<IProductsResponseModel[]> => {
                this.website = web;
                this.user = this._shopService.getMasterInfo(this.addressName);
                return this._shopService.getVisibleProducts(this.addressName);
            })
        ).subscribe((products: IProductsResponseModel[]): void => {
            this.products = products;
            this.sortProducts();
            this._changeDetectorRef.detectChanges();
        });

        this._shopService.getBlocksInfo(this.addressName).pipe(
            delay(300),
            takeUntilDestroyed(this._destroyRef)
        ).subscribe({
            next: (blocks: BlockDto[]): void => {
                this.blocks = blocks;

                const block: BlockDto = this.blocks.find((b: BlockDto): boolean => b.id === blocks[3]?.id)!;
                if (block) {
                    this.textSections = block.properties.textSections!;
                }

                this._changeDetectorRef.detectChanges();
            }
        });
    }

    ngOnDestroy(): void {
        this.countProductSubscription.unsubscribe();
    }


    protected searchProducts(): IProductsResponseModel[] {
        return this.products.filter((product: IProductsResponseModel) => product.name.toLowerCase().includes(this.search.toLowerCase()));
    }

    protected sortProducts(): void {
        this.products.sort((a: IProductsResponseModel, b: IProductsResponseModel): number => this.isSortedAsc ? a.price - b.price : b.price - a.price);
    }

    protected toggleSort(): void {
        this.isSortedAsc = !this.isSortedAsc;
        this.sortProducts();
    }

    protected getBlockPropertyValue(blockId: string, property: string): never {
        const block: BlockDto = this.blocks.find((b: BlockDto): boolean => b.id === blockId)!;

        return (block?.properties as never)?.[property];
    }

    protected getBlockImageUrl(blockId: string): string | undefined {
        const block: BlockDto = this.blocks.find((b: BlockDto): boolean => b.id === blockId)!;

        return block?.properties?.imageUrl;
    }

}
