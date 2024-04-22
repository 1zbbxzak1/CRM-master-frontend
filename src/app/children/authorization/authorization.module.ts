import {NgModule} from "@angular/core";
import {LoginComponent} from "./components/login/login.component";
import {
    TuiAlertModule,
    TuiButtonModule,
    TuiDialogModule,
    TuiModeModule,
    TuiRootModule,
    TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {TuiDialogFormService, TuiInputModule, TuiInputPasswordModule} from "@taiga-ui/kit";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {HeaderComponent} from "./pages/components/header/header.component";
import {WelcomeComponent} from "./pages/welcome/welcome.component";
import {TuiActiveZoneModule} from "@taiga-ui/cdk";
import {TuiSidebarModule} from "@taiga-ui/addon-mobile";
import {RegistrationComponent} from "./components/registration/registration.component";

@NgModule({
    declarations: [
        HeaderComponent,
        WelcomeComponent,
        LoginComponent,
        RegistrationComponent,
    ],
    imports: [
        TuiRootModule,
        TuiDialogModule,
        TuiAlertModule,
        TuiInputModule,
        FormsModule,
        TuiButtonModule,
        ReactiveFormsModule,
        TuiInputPasswordModule,
        TuiTextfieldControllerModule,
        CommonModule,
        TuiActiveZoneModule,
        TuiSidebarModule,
        NgOptimizedImage,
        TuiModeModule,
    ],
    exports: [
        LoginComponent,
        RegistrationComponent,
    ],
    providers: [
        TuiDialogFormService
    ],
})
export class AuthorizationModule {
}
