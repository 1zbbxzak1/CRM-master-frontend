import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductCountService {
    countProductChanged = new Subject<number>();
    private countProduct = 0;

    constructor() {
        // Здесь можно добавить логику для чтения значения из куки
        const countProductCookie = this.readCookie('countProduct');
        if (countProductCookie) {
            this.countProduct = parseInt(countProductCookie, 10);
        }
    }

    getCountProduct(): number {
        return this.countProduct;
    }

    setCountProduct(count: number): void {
        this.countProduct = count;
        // Здесь можно добавить логику для сохранения значения в куки
        this.createCookie('countProduct', count.toString(), 365);
        this.countProductChanged.next(count);
    }

    // Функция для чтения куки
    private readCookie(name: string): string | null {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Функция для создания куки
    private createCookie(name: string, value: string, days: number): void {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + value + expires + '; path=/';
    }
}
