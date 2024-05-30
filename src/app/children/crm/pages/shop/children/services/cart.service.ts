import {Injectable} from '@angular/core';
import {IProductsResponseModel} from "../../../../../../data/response-models/products/IProducts.response-model";
import {CookieService} from "ngx-cookie-service";
import {ProductCountService} from "./product-count.service";

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private readonly CART_KEY = 'cartItems';

    constructor(
        private cookieService: CookieService,
        private productCountService: ProductCountService
    ) {
    }

    addToCart(product: IProductsResponseModel): void {
        const cartItems: { product: IProductsResponseModel, quantity: number }[] = this.getCartItems();

        const existingItemIndex = cartItems.findIndex(item => item.product.id === product.id);
        if (existingItemIndex !== -1) {
            cartItems[existingItemIndex].quantity += 1;
        } else {
            cartItems.push({product, quantity: 1});
        }

        this.saveCartItems(cartItems);
        this.updateCountProduct(cartItems);
    }

    removeFromCart(productId: string): void {
        const cartItems: { product: IProductsResponseModel, quantity: number }[] = this.getCartItems();

        const itemIndex = cartItems.findIndex(item => item.product.id === productId);
        if (itemIndex !== -1) {
            if (cartItems[itemIndex].quantity > 1) {
                cartItems[itemIndex].quantity -= 1;
            } else {
                cartItems.splice(itemIndex, 1);
            }
        }

        this.saveCartItems(cartItems);
        this.updateCountProduct(cartItems);
    }

    getCartItems(): { product: IProductsResponseModel, quantity: number }[] {
        const cartItemsString = this.cookieService.get(this.CART_KEY);
        return cartItemsString ? JSON.parse(cartItemsString) : [];
    }

    clearCart(): void {
        this.cookieService.delete(this.CART_KEY);
        this.productCountService.setCountProduct(0);
    }

    private updateCountProduct(cartItems: { product: IProductsResponseModel, quantity: number }[]): void {
        const totalCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
        this.productCountService.setCountProduct(totalCount);
    }

    private saveCartItems(cartItems: { product: IProductsResponseModel, quantity: number }[]): void {
        this.cookieService.set(this.CART_KEY, JSON.stringify(cartItems));
    }
}
