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
import {AddProductComponent} from "./children/crm/pages/products/children/add-product/add-product.component";
import {InfoProductComponent} from "./children/crm/pages/products/children/info-product/info-product.component";
import {UpdateProductComponent} from "./children/crm/pages/products/children/update-product/update-product.component";
import {ClientDetailsComponent} from "./children/crm/pages/clients/children/client-details/client-details.component";
import {UpdateClientsComponent} from "./children/crm/pages/clients/children/update-clients/update-clients.component";
import {TemplatesComponent} from "./children/crm/pages/shop/children/templates/templates.component";
import {
    MainComponent
} from "./children/crm/pages/shop/children/templates/children/template-preview/children/constructor/pages/main/main.component";
import {
    ConstructorCardComponent
} from "./children/crm/pages/shop/children/templates/children/template-preview/children/constructor/pages/constructor-card/constructor-card.component";
import {
    ConstructorCartComponent
} from "./children/crm/pages/shop/children/templates/children/template-preview/children/constructor/pages/constructor-cart/constructor-cart.component";


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
    },
    {
        path: 'crm/clients',
        component: ClientsComponent,
        canActivate: [(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate(router, state)],
    },
    {
        path: 'crm/clients/info-client/:id',
        component: ClientDetailsComponent,
        canActivate: [(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate(router, state)],
    },
    {
        path: 'crm/clients/update-client/:id',
        component: UpdateClientsComponent,
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
    {
        path: 'crm/shop/shop-templates',
        component: TemplatesComponent,
        canActivate: [(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate(router, state)],
    },
    {
        path: 'crm/shop/shop-templates/templates-preview/constructor/main',
        component: MainComponent,
        canActivate: [(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate(router, state)],
    },
    {
        path: 'crm/shop/shop-templates/templates-preview/constructor/card/:id',
        component: ConstructorCardComponent,
        canActivate: [(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate(router, state)],
    },
    {
        path: 'crm/shop/shop-templates/templates-preview/constructor/cart',
        component: ConstructorCartComponent,
        canActivate: [(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate(router, state)],
    },
];
