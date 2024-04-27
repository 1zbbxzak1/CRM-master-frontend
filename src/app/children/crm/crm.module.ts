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
import {TuiRootModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {TuiInputModule} from "@taiga-ui/kit";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        SidebarComponent,
        ClientsComponent,
        ProductsComponent,
        ProfileComponent,
        OrdersComponent,
        ProfileEditComponent,
        ClientDetailsComponent,
    ],
    imports: [
        NgOptimizedImage,
        RouterLink,
        NgClass,
        NgIf,
        AsyncPipe,
        TuiRootModule,
        TuiInputModule,
        FormsModule,
        ReactiveFormsModule,
        TuiTextfieldControllerModule
    ],
    exports: [
        SidebarComponent
    ],
    providers: []
})
export class CrmModule {
}
