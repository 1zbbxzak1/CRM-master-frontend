import {NgDompurifySanitizer} from "@tinkoff/ng-dompurify";
import {TUI_SANITIZER, TuiAlertModule, TuiDialogModule, TuiRootModule} from "@taiga-ui/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgModule} from '@angular/core';
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
import {AuthBaseComponent} from "./children/services/auth/auth-base-component";
import {ProductsService} from "./data/services/products/products.service";
import {ProductsManagerService} from "./data/services/products/products.manager.service";
import {ProductPhotoManagerService} from "./data/services/product-photo/product-photo.manager.service";
import {ProductPhotoService} from "./data/services/product-photo/product-photo.service";

@NgModule({
    declarations: [
        AppComponent,
        AuthBaseComponent,
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
        provideClientHydration(),
        {provide: TUI_SANITIZER, useClass: NgDompurifySanitizer},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
