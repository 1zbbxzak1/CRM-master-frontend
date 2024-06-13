import {ChangeDetectorRef, Component, DestroyRef, Inject, Input} from '@angular/core';
import {IStageOrderResponseModel} from "../../../../../../data/response-models/stage-order/IStage-order.response-model";
import {Observer} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {TuiDialogFormService} from "@taiga-ui/kit";
import {TuiDialogContext, TuiDialogService} from "@taiga-ui/core";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {PolymorpheusContent} from "@tinkoff/ng-polymorpheus";

@Component({
    selector: 'app-add-stage',
    templateUrl: './add-stage.component.html',
    styleUrl: './add-stage.component.css'
})
export class AddStageComponent {

    @Input() observer?: Observer<never>;
    @Input() stages: IStageOrderResponseModel[] = [];
    protected formStage: FormGroup = new FormGroup({
        stage: new FormControl(''),
    });

    constructor(
        private readonly _changeDetectorRef: ChangeDetectorRef,
        @Inject(TuiDialogFormService)
        private readonly _dialogForm: TuiDialogFormService,
        @Inject(TuiDialogService)
        private readonly _dialogs: TuiDialogService,
        private readonly _destroyRef: DestroyRef,
    ) {
    }

    public openDialogAddStage(
        stage: PolymorpheusContent<TuiDialogContext>,
    ): void {
        this._dialogs.open(
            stage,
            {
                size: "s",
            })
            .pipe(
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe({
                complete: (): void => {
                    this._dialogForm.markAsPristine();
                },
            });
    }

    public onCancelSettings(): void {
        if (this.observer) {
            this._changeDetectorRef.detectChanges();
            this.observer.complete();
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
        this.onCancelSettings();
    }
}
