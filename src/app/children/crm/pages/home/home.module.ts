import {NgModule} from "@angular/core";
import {HomeComponent} from "./home.component";
import {CrmCardComponent} from "./children/crm-card/crm-card.component";
import {CrmCardEditComponent} from "./children/crm-card/children/crm-card-edit/crm-card-edit.component";

@NgModule({
    declarations: [
        HomeComponent,
        CrmCardComponent,
        CrmCardEditComponent,
    ],
    imports: [],
    providers: []
})
export class HomeModule {
}
