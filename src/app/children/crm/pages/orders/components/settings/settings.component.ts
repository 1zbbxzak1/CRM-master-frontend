import {Component, DestroyRef, Inject, Input} from '@angular/core';
import {Observer} from "rxjs";
import {PolymorpheusContent} from "@tinkoff/ng-polymorpheus";
import {TuiDialogContext, TuiDialogService} from "@taiga-ui/core";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {TuiDialogFormService} from "@taiga-ui/kit";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.css'
})
export class SettingsComponent {
    @Input() observer?: Observer<never>;

    // TODO: отображение этапов, добавление и удаление

    constructor(
        @Inject(TuiDialogFormService)
        private readonly _dialogForm: TuiDialogFormService,
        @Inject(TuiDialogService)
        private readonly _dialogs: TuiDialogService,
        private readonly _destroyRef: DestroyRef,
    ) {
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
                complete: () => {
                    this._dialogForm.markAsPristine();
                },
            });
    }

    protected onCancel(): void {
        if (this.observer) {
            this.observer.complete();
        }
    }
}
