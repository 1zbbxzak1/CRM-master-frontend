import {NgModule} from "@angular/core";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {ClientsComponent} from "./pages/clients/clients.component";
import {ProductsComponent} from "./pages/products/products.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {OrdersComponent} from "./pages/orders/orders.component";
import {ProfileEditComponent} from "./pages/profile/children/profile-edit/profile-edit.component";
import {ClientDetailsComponent} from "./pages/clients/children/client-details/client-details.component";

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
    imports: [],
    providers: []
})
export class CrmModule {
}
