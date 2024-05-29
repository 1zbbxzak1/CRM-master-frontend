import {NgModule} from "@angular/core";
import {ShopComponent} from "./shop.component";
import {TemplatesComponent} from "./children/templates/templates.component";
import {TemplatePreviewComponent} from "./children/templates/children/template-preview/template-preview.component";
import {
    ConstructorCardComponent
} from "./children/templates/children/template-preview/children/constructor/pages/constructor-card/constructor-card.component";
import {
    ConstructorCartComponent
} from "./children/templates/children/template-preview/children/constructor/pages/constructor-cart/constructor-cart.component";
import {
    MainComponent
} from "./children/templates/children/template-preview/children/constructor/pages/main/main.component";
import {CrmModule} from "../../crm.module";

@NgModule({
    declarations: [
        ShopComponent,
        TemplatesComponent,
        TemplatePreviewComponent,
        ConstructorCardComponent,
        ConstructorCartComponent,
        MainComponent,
    ],
    imports: [
        CrmModule,
    ],
    providers: []
})
export class ShopModule {
}
