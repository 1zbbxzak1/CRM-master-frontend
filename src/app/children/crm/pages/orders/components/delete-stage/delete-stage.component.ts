import {Component, DestroyRef, Inject, Input} from '@angular/core';
import {Observer} from "rxjs";
import {TuiDialogFormService} from "@taiga-ui/kit";
import {TuiDialogContext, TuiDialogService} from "@taiga-ui/core";
import {PolymorpheusContent} from "@tinkoff/ng-polymorpheus";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {SettingsComponent} from "../settings/settings.component";

@Component({
    selector: 'app-delete-stage',
    templateUrl: './delete-stage.component.html',
    styleUrl: './delete-stage.component.css'
})
export class DeleteStageComponent {
    @Input() observer?: Observer<never>;
    @Input() id!: number;


    constructor(
        @Inject(TuiDialogFormService)
        private readonly _dialogForm: TuiDialogFormService,
        @Inject(TuiDialogService)
        private readonly _dialogs: TuiDialogService,
        private readonly _destroyRef: DestroyRef,
        private readonly _settingsComponent: SettingsComponent,
    ) {
    }

    public openDialogDelete(
        deleteProduct: PolymorpheusContent<TuiDialogContext>,
    ): void {
        this._dialogs.open(
            deleteProduct,
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

    protected deleteStage(id: number): void {
        this._settingsComponent.removeStage(id);
        this.onCancel();
    }

    protected onCancel(): void {
        if (this.observer) {
            this.observer.complete();
        }
    }
}
