import {Routes} from "@angular/router";
import {WelcomeComponent} from "./children/authorization/pages/welcome/welcome.component";
import {AuthGuard} from "./data/guards/auth.guard";
import {ProfileComponent} from "./children/crm/pages/profile/profile.component";
import {ProfileEditComponent} from "./children/crm/pages/profile/children/profile-edit/profile-edit.component";
import {OrdersComponent} from "./children/crm/pages/orders/orders.component";
import {ClientsComponent} from "./children/crm/pages/clients/clients.component";
import {ProductsComponent} from "./children/crm/pages/products/products.component";
import {ShopComponent} from "./children/crm/pages/shop/shop.component";


export const routes: Routes = [
    {
        path: "",
        redirectTo: "profile",
        pathMatch: "full",
    },
    {
        path: "welcome",
        component: WelcomeComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "profile",
        component: ProfileComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "profile-edit",
        component: ProfileEditComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'clients',
        component: ClientsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'products',
        component: ProductsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'shop',
        component: ShopComponent,
        canActivate: [AuthGuard],
    },
];
