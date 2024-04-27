import {NgModule} from "@angular/core";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {ClientsComponent} from "./pages/clients/clients.component";
import {ProductsComponent} from "./pages/products/products.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {OrdersComponent} from "./pages/orders/orders.component";
import {ProfileEditComponent} from "./pages/profile/children/profile-edit/profile-edit.component";
import {ClientDetailsComponent} from "./pages/clients/children/client-details/client-details.component";
import {AsyncPipe, NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {TuiButtonModule, TuiRootModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {TuiInputModule, TuiInputPasswordModule} from "@taiga-ui/kit";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PasswordEditComponent} from './pages/profile/children/password-edit/password-edit.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
    declarations: [
        SidebarComponent,
        ClientsComponent,
        ProductsComponent,
        ProfileComponent,
        OrdersComponent,
        ProfileEditComponent,
        ClientDetailsComponent,
        PasswordEditComponent,
    ],
    imports: [
        NgOptimizedImage,
        RouterLink,
        NgClass,
        NgIf,
        AsyncPipe,
        BrowserAnimationsModule,
        TuiRootModule,
        TuiInputModule,
        FormsModule,
        ReactiveFormsModule,
        TuiTextfieldControllerModule,
        TuiButtonModule,
        TuiInputPasswordModule,
    ],
    exports: [
        SidebarComponent,
        PasswordEditComponent,
    ],
    providers: []
})
export class CrmModule {
}
