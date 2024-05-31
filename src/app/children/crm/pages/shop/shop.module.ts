import {ShopComponent} from "./shop.component";
import {NgModule} from "@angular/core";
import {TemplatesComponent} from "./children/templates/templates.component";
import {FirstTemplateComponent} from "./children/templates/components/first-template/first-template.component";
import {
    MainComponent
} from "./children/templates/children/template-preview/children/constructor/pages/main/main.component";
import {ConstructorMainComponent} from "./children/templates/children/template-preview/constructor-main.component";
import {
    ConstructorCardComponent
} from "./children/templates/children/template-preview/children/constructor/pages/constructor-card/constructor-card.component";
import {
    ConstructorCartComponent
} from "./children/templates/children/template-preview/children/constructor/pages/constructor-cart/constructor-cart.component";
import {CrmModule} from "../../crm.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TuiButtonModule, TuiRootModule, TuiScrollbarModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {
    TuiComboBoxModule,
    TuiDataListWrapperModule,
    TuiFilterByInputPipeModule,
    TuiInputCopyModule,
    TuiInputModule
} from "@taiga-ui/kit";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {TuiValueChangesModule} from "@taiga-ui/cdk";


@NgModule({
    declarations: [
        ShopComponent,
        TemplatesComponent,
        FirstTemplateComponent,

        MainComponent,
        ConstructorMainComponent,
        ConstructorCardComponent,
        ConstructorCartComponent,
    ],
    imports: [
        CrmModule,
        ReactiveFormsModule,
        TuiButtonModule,
        TuiInputCopyModule,
        TuiInputModule,
        TuiTextfieldControllerModule,
        BrowserAnimationsModule,
        TuiRootModule,
        CommonModule,
        NgOptimizedImage,
        TuiScrollbarModule,
        FormsModule,
        TuiComboBoxModule,
        TuiDataListWrapperModule,
        TuiFilterByInputPipeModule,
        TuiValueChangesModule,
    ],
    providers: []
})
export class ShopModule {
}
