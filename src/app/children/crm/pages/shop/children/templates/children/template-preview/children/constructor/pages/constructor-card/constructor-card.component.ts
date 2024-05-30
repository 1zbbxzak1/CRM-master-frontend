import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    HostListener,
    OnDestroy,
    OnInit
} from '@angular/core';
import {
    IProductsResponseModel
} from "../../../../../../../../../../../../data/response-models/products/IProducts.response-model";
import {
    ProductsManagerService
} from "../../../../../../../../../../../../data/services/products/products.manager.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ShopService} from "../../../../../../../../../../../../data/services/shop/shop.service";
import {WebsiteDto} from "../../../../../../../../../../../../data/response-models/shop/shop.response-model";
import {CartService} from "../../../../../../../services/cart.service";
import {Subject, Subscription} from "rxjs";
import {ProductCountService} from "../../../../../../../services/product-count.service";

@Component({
    selector: 'app-constructor-card',
    templateUrl: './constructor-card.component.html',
    styleUrls: ['./styles/constructor-card.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConstructorCardComponent implements OnInit, OnDestroy {
    currentSlideIndex = 0;
    currentIndex = 0;
    visibleItems = 4;

    countProduct = 0;
    protected productId!: string;
    protected product!: IProductsResponseModel;
    protected website!: WebsiteDto;
    protected products: IProductsResponseModel[] = [];
    protected countProductSubscription!: Subscription;
    private destroy$ = new Subject<void>();

    constructor(
        private readonly _productManagerService: ProductsManagerService,
        private readonly _shopService: ShopService,
        private readonly _destroyRef: DestroyRef,
        private readonly _changeDetectorRef: ChangeDetectorRef,
        protected readonly _router: Router,
        private readonly _route: ActivatedRoute,
        private cartService: CartService,
        private productCountService: ProductCountService,
    ) {
    }

    get chunkedProducts() {
        const chunkSize = this.visibleItems;
        const array = this.products.slice();
        const chunks = [];
        while (array.length) {
            chunks.push(array.splice(0, chunkSize));
        }
        return chunks;
    }

    ngOnDestroy(): void {
        this.countProductSubscription.unsubscribe();
        this.destroy$.next();
        this.destroy$.complete();
        window.removeEventListener('resize', this.calculateVisibleItems.bind(this));
    }

    ngOnInit(): void {
        this.countProduct = this.productCountService.getCountProduct();
        this.countProductSubscription = this.productCountService.countProductChanged.subscribe((count: number) => {
            this.countProduct = count;
        });

        this._route.params.subscribe((params: Params): void => {
            this.productId = params['id'];

            this._productManagerService.getProduct(this.productId).pipe(
                takeUntilDestroyed(this._destroyRef)
            ).subscribe((product: IProductsResponseModel): void => {
                this.product = product;

                this._changeDetectorRef.detectChanges();
            });
        });

        this._productManagerService.getAllProducts().pipe(
            takeUntilDestroyed(this._destroyRef)
        ).subscribe((products: IProductsResponseModel[]): void => {
            this.products = products;

            this._changeDetectorRef.detectChanges();
        });

        this._shopService.getWebsiteInfo().pipe(
            takeUntilDestroyed(this._destroyRef)
        ).subscribe((web: WebsiteDto): void => {
            this.website = web;

            this._changeDetectorRef.detectChanges();
        });
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.calculateVisibleItems();
    }

    calculateVisibleItems(): void {
        const screenWidth = window.innerWidth;
        if (screenWidth < 768) {
            this.visibleItems = 1;
        } else if (screenWidth < 1100) {
            this.visibleItems = 2;
        } else if (screenWidth < 1300) {
            this.visibleItems = 3;
        } else {
            this.visibleItems = 4;
        }

        this.currentIndex = Math.min(this.currentIndex, this.products.length - this.visibleItems);
        this._changeDetectorRef.detectChanges();
    }

    nextSlide() {
        const totalChunks = Math.ceil(this.products.length / this.visibleItems);
        const totalSlides = totalChunks * this.visibleItems;
        if (this.currentIndex < totalSlides - this.visibleItems) {
            this.currentIndex += this.visibleItems;
        } else {
            this.currentIndex = 0;
        }
    }

    prevSlide() {
        const totalChunks = Math.ceil(this.products.length / this.visibleItems);
        const totalSlides = totalChunks * this.visibleItems;
        if (this.currentIndex >= this.visibleItems) {
            this.currentIndex -= this.visibleItems;
        } else {
            this.currentIndex = totalSlides - this.visibleItems;
        }
    }

    showSlide(index: number) {
        this.currentSlideIndex = index;
    }

    addToCart(product: IProductsResponseModel) {
        this.cartService.addToCart(product);

    }

    removeFromCart(productId: string) {
        this.cartService.removeFromCart(productId);
    }

    protected navigateToPreviousPage(): void {
        this._router.navigate(['crm/shop/shop-templates/templates-preview/constructor/main']);
    }

    protected navigateToCartPage(): void {
        this._router.navigate(['crm/shop/shop-templates/templates-preview/constructor/cart']);
    }
}
