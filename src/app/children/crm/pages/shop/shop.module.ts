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
import {
    EditGeneralComponent
} from "./children/templates/children/template-preview/children/constructor/edit/edit-general/edit-general.component";
import {
    EditContentComponent
} from "./children/templates/children/template-preview/children/constructor/edit/edit-content/edit-content.component";
import {
    ConstructorHeaderComponent
} from './children/templates/children/template-preview/children/constructor/components/constructor-header/constructor-header.component';

@NgModule({
    declarations: [
        ShopComponent,
        TemplatesComponent,
        TemplatePreviewComponent,
        ConstructorHeaderComponent,
        ConstructorCardComponent,
        ConstructorCartComponent,
        MainComponent,
        EditGeneralComponent,
        EditContentComponent,
    ],
    imports: [],
    providers: []
})
export class ShopModule {
}
