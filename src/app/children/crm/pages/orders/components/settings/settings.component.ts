import {ChangeDetectorRef, Component, DestroyRef, Inject, Input, ViewChild} from '@angular/core';
import {Observer} from "rxjs";
import {PolymorpheusContent} from "@tinkoff/ng-polymorpheus";
import {TuiDialogContext, TuiDialogService} from "@taiga-ui/core";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {TuiDialogFormService} from "@taiga-ui/kit";
import {StageOrderManagerService} from "../../../../../../data/services/order/stage-order/stage-order.manager.service";
import {IStageOrderResponseModel} from "../../../../../../data/response-models/stage-order/IStage-order.response-model";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {DataUpdateService} from "../../../../../services/data-update";
import {DeleteStageComponent} from "../delete-stage/delete-stage.component";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrl: './styles/settings.component.css'
})
export class SettingsComponent {
    @Input() observerSettings?: Observer<never>;
    @Input() observer?: Observer<never>;
    protected stages: IStageOrderResponseModel[] = [];
    protected formStage: FormGroup = new FormGroup({
        stage: new FormControl(''),
    });
    @ViewChild(DeleteStageComponent)
    private readonly _deleteStageComponent!: DeleteStageComponent;

    constructor(
        private readonly _router: Router,
        @Inject(TuiDialogFormService)
        private readonly _dialogForm: TuiDialogFormService,
        @Inject(TuiDialogService)
        private readonly _dialogs: TuiDialogService,
        private readonly _destroyRef: DestroyRef,
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private readonly _stageOrderManagerService: StageOrderManagerService,
        private readonly _dataUpdateService: DataUpdateService,
    ) {
        this.loadStages();
    }

    loadStages() {
        this._stageOrderManagerService.getStages().pipe(
            takeUntilDestroyed(this._destroyRef)
        )
            .subscribe((stages: IStageOrderResponseModel[]): void => {
                this.stages = stages;
                this._changeDetectorRef.detectChanges();
            });
    }

    drop(event: CdkDragDrop<string[]>): void {
        moveItemInArray(this.stages, event.previousIndex, event.currentIndex);
    }

    removeStage(index: number): void {
        this.stages.splice(index, 1);
    }

    public openDialogSettings(
        settings: PolymorpheusContent<TuiDialogContext>,
    ): void {
        this._dialogs.open(
            settings,
            {
                size: "m",
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
        if (this.observerSettings) {
            this._changeDetectorRef.detectChanges();
            this.observerSettings.complete();
        }
    }

    public onCancel(): void {
        if (this.observer) {
            this._changeDetectorRef.detectChanges();
            this.observer.complete();
        }
    }

    protected openDialogDelete(
        stage: PolymorpheusContent<TuiDialogContext>,
    ): void {
        this._deleteStageComponent.openDialogDelete(stage);
    }

    protected updateStages(): void {
        this.stages.forEach((stage, index) => {
            stage.order = index;
        });

        this._stageOrderManagerService.updateStages(this.stages).pipe(
            takeUntilDestroyed(this._destroyRef)
        ).subscribe((stages: IStageOrderResponseModel[]) => {
            console.log(stages);

            this.onCancelSettings();
            this._dataUpdateService.updateData();
        });
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
