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
import {AddProductComponent} from "./children/crm/pages/products/children/add-product/add-product.component";


export const routes: Routes = [
    // TODO: как только будем выкладывать на хостинг, вернуть пути,
    //  пока так, потому что VK SDK при локальной разработке работает на стандартном localhost, без /путь
    // {
    //     path: "",
    //     redirectTo: "crm/orders",
    //     pathMatch: "full",
    // },
    {
        path: "",
        component: WelcomeComponent,
        // canActivate: [(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate(router, state)],
    },
    {
        path: "crm/profile",
        component: ProfileComponent,
        canActivate: [(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate(router, state)],
    },
    {
        path: "crm/profile-edit",
        component: ProfileEditComponent,
        canActivate: [(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate(router, state)],
    },
    {
        path: 'crm/orders',
        component: OrdersComponent,
        canActivate: [(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate(router, state)],
        children: [
            {
                path: "",
                redirectTo: "all-orders",
                pathMatch: "full",
            },
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
        path: 'crm/clients',
        component: ClientsComponent,
        canActivate: [(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate(router, state)],
    },
    {
        path: 'crm/products',
        component: ProductsComponent,
        canActivate: [(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate(router, state)],
    },
    {
        path: `crm/products/info-product/:id`,
        component: InfoProductComponent,
        canActivate: [(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate(router, state)],
    },
    {
        path: `crm/products/update-product/:id`,
        component: UpdateProductComponent,
        canActivate: [(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate(router, state)],
    },
    {
        path: 'crm/products/add-product',
        component: AddProductComponent,
        canActivate: [(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate(router, state)],
    },
    {
        path: 'crm/shop',
        component: ShopComponent,
        canActivate: [(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate(router, state)],
    },
];
