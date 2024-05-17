import {NgModule} from "@angular/core";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {ClientsComponent} from "./pages/clients/clients.component";
import {ProductsComponent} from "./pages/products/products.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {OrdersComponent} from "./pages/orders/orders.component";
import {ProfileEditComponent} from "./pages/profile/children/profile-edit/profile-edit.component";
import {ClientDetailsComponent} from "./pages/clients/children/client-details/client-details.component";
import {AsyncPipe, NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {
    TuiButtonModule,
    TuiRootModule,
    TuiScrollbarModule,
    TuiSvgModule,
    TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {
    TuiHighlightModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiMarkerIconModule,
    TuiTilesModule
} from "@taiga-ui/kit";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PasswordEditComponent} from './pages/profile/children/password-edit/password-edit.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AllOrdersComponent} from './pages/orders/children/all-orders/all-orders.component';
import {NewOrdersComponent} from './pages/orders/children/new-orders/new-orders.component';
import {ProgressOrdersComponent} from './pages/orders/children/progress-orders/progress-orders.component';
import {DeliveryOrdersComponent} from './pages/orders/children/delivery-orders/delivery-orders.component';
import {ArchiveOrdersComponent} from './pages/orders/children/archive-orders/archive-orders.component';
import {SettingsComponent} from './pages/orders/components/settings/settings.component';
import {IntersectionObserverModule} from "@ng-web-apis/intersection-observer";
import {DeleteProductComponent} from './pages/products/components/delete-product/delete-product.component';

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
        AllOrdersComponent,
        NewOrdersComponent,
        ProgressOrdersComponent,
        DeliveryOrdersComponent,
        ArchiveOrdersComponent,
        SettingsComponent,
        DeleteProductComponent,
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
        TuiHighlightModule,
        RouterOutlet,
        TuiMarkerIconModule,
        TuiSvgModule,
        TuiTilesModule,
        RouterLinkActive,
        TuiScrollbarModule,
        IntersectionObserverModule,
    ],
    exports: [
        SidebarComponent,
        PasswordEditComponent,
        SettingsComponent,
        DeleteProductComponent,
    ],
    providers: []
})
export class CrmModule {
}
