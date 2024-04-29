import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'app-constructor-card',
    templateUrl: './constructor-card.component.html',
    styleUrl: './styles/constructor-card.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConstructorCardComponent {

}
