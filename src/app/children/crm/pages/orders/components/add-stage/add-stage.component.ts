import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {Observer} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {IStageOrderResponseModel} from "../../../../../../data/response-models/stage-order/IStage-order.response-model";

@Component({
    selector: 'app-add-stage',
    templateUrl: './add-stage.component.html',
    styleUrl: './styles/add-stage.component.css'
})
export class AddStageComponent {
    @Input() observerSettings?: Observer<never>;
    protected formStage: FormGroup = new FormGroup({
        stage: new FormControl(''),
    });
    protected stages: IStageOrderResponseModel[] = [];

    constructor(
        private readonly _changeDetectorRef: ChangeDetectorRef,
    ) {
    }

    public onCancelSettings(): void {
        if (this.observerSettings) {
            this._changeDetectorRef.detectChanges();
            this.observerSettings.complete();
        }
    }

    protected addStageFunc(stageName: string): void {
        const newStage: IStageOrderResponseModel = {
            id: null,
            name: stageName,
            order: this.stages.length - 1, // Предполагается, что вы хотите добавить новый этап перед последним этапом
            isSystem: false
        };
        this.stages.splice(this.stages.length - 1, 0, newStage); // Добавляем новый этап перед последним этапом
    }
}
