import {Component} from '@angular/core';
import {TemplatesServiceComponent} from "../../../services/templates-service.component";


@Component({
    selector: 'app-first-template',
    templateUrl: './first-template.component.html',
    styleUrl: './styles/first-template.component.css'
})
export class FirstTemplateComponent extends TemplatesServiceComponent {

}
