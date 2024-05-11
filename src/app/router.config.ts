import {ActivatedRouteSnapshot, RouterStateSnapshot, Routes} from "@angular/router";
import {WelcomeComponent} from "./children/authorization/pages/welcome/welcome.component";
import {AuthGuard} from "./data/guards/auth.guard";
import {ProfileComponent} from "./children/crm/pages/profile/profile.component";
import {ProfileEditComponent} from "./children/crm/pages/profile/children/profile-edit/profile-edit.component";
import {OrdersComponent} from "./children/crm/pages/orders/orders.component";
import {ClientsComponent} from "./children/crm/pages/clients/clients.component";
import {ProductsComponent} from "./children/crm/pages/products/products.component";
import {ShopComponent} from "./children/crm/pages/shop/shop.component";
import {inject} from "@angular/core";
import {AllOrdersComponent} from "./children/crm/pages/orders/children/all-orders/all-orders.component";
import {NewOrdersComponent} from "./children/crm/pages/orders/children/new-orders/new-orders.component";
import {ProgressOrdersComponent} from "./children/crm/pages/orders/children/progress-orders/progress-orders.component";
import {DeliveryOrdersComponent} from "./children/crm/pages/orders/children/delivery-orders/delivery-orders.component";
import {ArchiveOrdersComponent} from "./children/crm/pages/orders/children/archive-orders/archive-orders.component";


export const routes: Routes = [
    {
        path: "",
        redirectTo: "orders",
        pathMatch: "full",
    },

    {
        path: "welcome",
        component: WelcomeComponent,
        canActivate: [(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate(router, state)],
    },
    {
        path: "profile",
        component: ProfileComponent,
        canActivate: [(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate(router, state)],
    },
    {
        path: "profile-edit",
        component: ProfileEditComponent,
        canActivate: [(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate(router, state)],
    },
    {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate(router, state)],
        children: [
            {
                path: 'all-orders',
                component: AllOrdersComponent,
            },
            {
                path: 'new-orders',
                component: NewOrdersComponent,
            },
            {
                path: 'progress-orders',
                component: ProgressOrdersComponent,
            },
            {
                path: 'delivery-orders',
                component: DeliveryOrdersComponent,
            },
            {
                path: 'archive-orders',
                component: ArchiveOrdersComponent,
            },
        ]
    },
    {
        path: 'clients',
        component: ClientsComponent,
        canActivate: [(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate(router, state)],
    },
    {
        path: 'products',
        component: ProductsComponent,
        canActivate: [(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate(router, state)],
    },
    {
        path: 'shop',
        component: ShopComponent,
        canActivate: [(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate(router, state)],
    },
];
