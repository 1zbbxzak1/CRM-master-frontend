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


export const routes: Routes = [
    {
        path: "",
        redirectTo: "profile",
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
