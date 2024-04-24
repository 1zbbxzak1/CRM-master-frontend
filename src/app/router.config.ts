import {Routes} from "@angular/router";
import {WelcomeComponent} from "./children/authorization/pages/welcome/welcome.component";
import {AuthGuard} from "./data/guards/auth.guard";
import {ProfileComponent} from "./children/crm/pages/profile/profile.component";


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
];
