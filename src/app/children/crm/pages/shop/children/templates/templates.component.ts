import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'app-templates',
    templateUrl: './templates.component.html',
    styleUrl: './styles/templates.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplatesComponent {

}
