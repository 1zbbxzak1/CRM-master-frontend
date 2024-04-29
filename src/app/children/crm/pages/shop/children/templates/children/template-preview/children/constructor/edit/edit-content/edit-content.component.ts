import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'app-edit-content',
    templateUrl: './edit-content.component.html',
    styleUrl: './styles/edit-content.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditContentComponent {

}
