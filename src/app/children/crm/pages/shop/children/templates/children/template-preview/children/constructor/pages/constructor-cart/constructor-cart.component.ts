import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnDestroy, OnInit} from '@angular/core';
import {
    IProductsResponseModel
} from "../../../../../../../../../../../../data/response-models/products/IProducts.response-model";
import {CartService} from "../../../../../../../services/cart.service";
import {Subscription} from "rxjs";
import {ProductCountService} from "../../../../../../../services/product-count.service";
import {
    CreateWebsiteOrderRequest,
    WebsiteDto
} from "../../../../../../../../../../../../data/response-models/shop/shop.response-model";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ShopService} from "../../../../../../../../../../../../data/services/shop/shop.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {
    fullNameValidator,
    phoneNumberValidator,
    ValidAuth
} from "../../../../../../../../../../../../validators/auth.validator";

@Component({
    selector: 'app-constructor-cart',
    templateUrl: './constructor-cart.component.html',
    styleUrls: ['./styles/constructor-cart.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConstructorCartComponent implements OnInit, OnDestroy {
    cartItems: { product: IProductsResponseModel, quantity: number }[] = [];
    countProduct = 0;
    protected countProductSubscription!: Subscription;
    protected website!: WebsiteDto;
    protected formUserInfo: FormGroup = new FormGroup({
        fullName: new FormControl('', [Validators.required, fullNameValidator()]),
        email: new FormControl('', [Validators.required, Validators.email]),
        phone: new FormControl('', [Validators.required, phoneNumberValidator()]),
        comment: new FormControl(''),
        address: new FormControl('', [Validators.required]),
    })

    private readonly _controlValidator: ValidAuth = new ValidAuth(this.formUserInfo);

    constructor(
        private cartService: CartService,
        private productCountService: ProductCountService,
        private readonly _destroyRef: DestroyRef,
        protected readonly _router: Router,
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private readonly _shopService: ShopService,
    ) {
    }

    ngOnInit(): void {
        this.countProduct = this.productCountService.getCountProduct();
        this.countProductSubscription = this.productCountService.countProductChanged.subscribe((count: number) => {
            this.countProduct = count;
        });

        this.cartItems = this.cartService.getCartItems();

        this._shopService.getWebsiteInfo().pipe(
            takeUntilDestroyed(this._destroyRef)
        ).subscribe((web: WebsiteDto): void => {
            this.website = web;

            this._changeDetectorRef.detectChanges();
        });
    }

    ngOnDestroy(): void {
        this.countProductSubscription.unsubscribe();
    }

    addToCart(product: IProductsResponseModel) {
        this.cartService.addToCart(product);
        this.cartItems = this.cartService.getCartItems();
    }

    removeFromCart(productId: string) {
        this.cartService.removeFromCart(productId);
        this.cartItems = this.cartService.getCartItems();
    }

    clearCart(): void {
        this.cartService.clearCart();
        this.cartItems = this.cartService.getCartItems();
    }

    getTotalPrice(): number {
        return this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    }

    createOrder(): void {
        if (this.formUserInfo.valid) {
            const formValue = this.formUserInfo.value;
            const orderRequest: CreateWebsiteOrderRequest = {
                client: {
                    fullName: formValue.fullName,
                    email: formValue.email,
                    phone: formValue.phone
                },
                comment: formValue.comment,
                address: formValue.address,
                products: this.cartItems.map(item => ({
                    productId: item.product.id,
                    quantity: item.quantity
                }))
            };

            this._shopService.createOrder(this.website.addressName, orderRequest).subscribe({
                next: () => {
                    console.log('Order created successfully');
                    this.formUserInfo.reset();
                    this.clearCart();

                    this._changeDetectorRef.detectChanges();
                },
                error: (err) => {
                    console.error('Error creating order:', err);
                }
            });
        }
    }

    protected navigateToPreviousPage(): void {
        this._router.navigate(['crm/shop/shop-templates/templates-preview/constructor/main']);
    }

    protected navigateToCartPage(): void {
        this._router.navigate(['crm/shop/shop-templates/templates-preview/constructor/cart']);
    }

    protected isControlError(controlName: string): boolean {
        return this._controlValidator.isControlError(controlName);
    }

    protected isControlRequired(controlName: string): boolean {
        return this._controlValidator.isControlRequired(controlName);
    }

    protected isCorrectFullName(controlName: string): boolean {
        return this._controlValidator.isCorrectFullName(controlName);
    }

    protected isEmailInvalid(controlName: string): boolean {
        return this._controlValidator.isEmailInvalid(controlName);
    }

    protected isCorrectPhoneNumber(controlName: string): boolean {
        return this._controlValidator.isCorrectPhoneNumber(controlName);
    }
}
