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
    TuiDataListModule,
    TuiHostedDropdownModule,
    TuiRootModule,
    TuiScrollbarModule,
    TuiSvgModule,
    TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {
    TuiComboBoxModule,
    TuiDataListWrapperModule,
    TuiFilterByInputPipeModule,
    TuiHighlightModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiMarkerIconModule,
    TuiTextareaModule,
    TuiTilesModule
} from "@taiga-ui/kit";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PasswordEditComponent} from './pages/profile/components/password-edit/password-edit.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SettingsComponent} from './pages/orders/components/settings/settings.component';
import {IntersectionObserverModule} from "@ng-web-apis/intersection-observer";
import {DeleteProductComponent} from './pages/products/components/delete-product/delete-product.component';
import {AddProductComponent} from "./pages/products/children/add-product/add-product.component";
import {InfoProductComponent} from './pages/products/children/info-product/info-product.component';
import {ProductPhotosComponent} from './pages/products/components/product-photos/product-photos.component';
import {UpdateProductComponent} from './pages/products/children/update-product/update-product.component';
import {OrderHistoryComponent} from './pages/clients/components/order-history/order-history.component';
import {UpdateClientsComponent} from './pages/clients/children/update-clients/update-clients.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {DeleteStageComponent} from './pages/orders/components/delete-stage/delete-stage.component';
import {AddOrderComponent} from './pages/orders/components/add-order/add-order.component';
import {TuiActiveZoneModule} from "@taiga-ui/cdk";
import {TuiSidebarModule} from "@taiga-ui/addon-mobile";

@NgModule({
    declarations: [
        SidebarComponent,

        ClientsComponent,
        ClientDetailsComponent,
        UpdateClientsComponent,

        ProductsComponent,
        DeleteProductComponent,
        ProductPhotosComponent,
        AddProductComponent,
        InfoProductComponent,
        UpdateProductComponent,

        ProfileComponent,
        ProfileEditComponent,
        PasswordEditComponent,

        OrdersComponent,
        SettingsComponent,
        OrderHistoryComponent,
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
        TuiComboBoxModule,
        TuiDataListModule,
        TuiFilterByInputPipeModule,
        TuiDataListWrapperModule,
        TuiTextareaModule,
    ],
    exports: [
        SidebarComponent,
        PasswordEditComponent,
        SettingsComponent,
        DeleteProductComponent,
        ProductPhotosComponent,
    ],
    providers: []
})
export class CrmModule {
}
