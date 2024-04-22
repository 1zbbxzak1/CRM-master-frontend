import {NgModule} from "@angular/core";
import {LoginComponent} from "./components/login/login.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import {HeaderComponent} from "./pages/components/header/header.component";
import {WelcomeComponent} from "./pages/welcome/welcome.component";
import {NgOptimizedImage} from "@angular/common";

@NgModule({
    declarations: [
        LoginComponent,
        RegistrationComponent,
        HeaderComponent,
        WelcomeComponent,
    ],
    imports: [
        NgOptimizedImage
    ],
    exports: [
        LoginComponent,
        RegistrationComponent,
    ],
    providers: [],
})
export class AuthorizationModule {
}
