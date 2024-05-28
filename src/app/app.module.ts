import {NgDompurifySanitizer} from "@tinkoff/ng-dompurify";
import {TUI_SANITIZER, TuiAlertModule, TuiDialogModule, TuiRootModule} from "@taiga-ui/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthorizationModule} from "./children/authorization/authorization.module";
import {ShopModule} from "./children/crm/pages/shop/shop.module";
import {CrmModule} from "./children/crm/crm.module";
import {HttpClientModule} from "@angular/common/http";
import {IdentityService} from "./data/services/auth/identity.service";
import {AuthService} from "./data/services/auth/auth.service";
import {AuthGuard} from "./data/guards/auth.guard";
import {UserService} from "./data/services/user/user.service";
import {UserManagerService} from "./data/services/user/user.manager.service";
import {ProductsService} from "./data/services/products/products.service";
import {ProductsManagerService} from "./data/services/products/products.manager.service";
import {ProductPhotoManagerService} from "./data/services/products/product-photo/product-photo.manager.service";
import {ProductPhotoService} from "./data/services/products/product-photo/product-photo.service";
import {ClientsService} from "./data/services/clients/clients.service";
import {ClientsManagerService} from "./data/services/clients/clients.manager.service";
import {OrderHistoryService} from "./data/services/order/order-history/order-history.service";
import {OrderHistoryManagerService} from "./data/services/order/order-history/order-history.manager.service";
import {registerLocaleData} from "@angular/common";
import localeRu from '@angular/common/locales/ru';
import {StageOrderService} from "./data/services/order/stage-order/stage-order.service";
import {StageOrderManagerService} from "./data/services/order/stage-order/stage-order.manager.service";

registerLocaleData(localeRu);

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        TuiRootModule,
        TuiDialogModule,
        TuiAlertModule,
        AuthorizationModule,
        CrmModule,
        ShopModule,
        HttpClientModule,
    ],
    providers: [
        AuthGuard,
        AuthService,
        IdentityService,

        UserService,
        UserManagerService,

        ProductsService,
        ProductsManagerService,
        ProductPhotoService,
        ProductPhotoManagerService,

        ClientsService,
        ClientsManagerService,

        StageOrderService,
        StageOrderManagerService,

        OrderHistoryService,
        OrderHistoryManagerService,

        provideClientHydration(),
        {provide: TUI_SANITIZER, useClass: NgDompurifySanitizer},
        {provide: LOCALE_ID, useValue: 'ru'}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
