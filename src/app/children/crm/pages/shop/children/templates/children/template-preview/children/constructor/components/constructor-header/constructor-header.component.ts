import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'app-constructor-header',
    templateUrl: './constructor-header.component.html',
    styleUrl: './styles/constructor-header.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConstructorHeaderComponent {

}
