import {NgDompurifySanitizer} from "@tinkoff/ng-dompurify";
import {TUI_SANITIZER, TuiAlertModule, TuiDialogModule, TuiRootModule} from "@taiga-ui/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgModule} from '@angular/core';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthorizationModule} from "./children/authorization/authorization.module";
import {HomeModule} from "./children/crm/pages/home/home.module";
import {ShopModule} from "./children/crm/pages/shop/shop.module";
import {CrmModule} from "./children/crm/crm.module";
import {HttpClientModule} from "@angular/common/http";
import {IdentityService} from "./data/services/auth/identity.service";
import {AuthService} from "./data/services/auth/auth.service";
import {AuthGuard} from "./data/guards/auth.guard";
import {UserService} from "./data/services/user/user.service";
import {UserManagerService} from "./data/services/user/user.manager.service";

@NgModule({
    declarations: [
        AppComponent
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
        HomeModule,
        ShopModule,
        HttpClientModule,
    ],
    providers: [
        AuthGuard,
        AuthService,
        IdentityService,
        UserService,
        UserManagerService,
        provideClientHydration(),
        {provide: TUI_SANITIZER, useClass: NgDompurifySanitizer},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
