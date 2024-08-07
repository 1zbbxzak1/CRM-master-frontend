import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ClientDto} from "../../../../../../data/response-models/clients/IClients.response-model";
import {ClientsManagerService} from "../../../../../../data/services/clients/clients.manager.service";
import {FormatterService} from "../../services/formatter.service";

@Component({
    selector: 'app-client-details',
    templateUrl: './client-details.component.html',
    styleUrls: ['../../../../styles/crm-styles.css', './styles/client-details.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientDetailsComponent extends FormatterService {
    protected clientId!: string;
    protected client!: ClientDto | null;

    constructor(
        private readonly _router: Router,
        private readonly _route: ActivatedRoute,
        protected readonly _destroyRef: DestroyRef,
        private readonly _changeDetectorRef: ChangeDetectorRef,
        protected readonly _clientsManagerService: ClientsManagerService,
    ) {
        super();
        this._route.params.subscribe((params: Params): void => {
            this.clientId = params['id'];

            this._clientsManagerService.getClientById(this.clientId).pipe(
                takeUntilDestroyed(this._destroyRef)
            ).subscribe((client: ClientDto | null): void => {
                this.client = client;

                this._changeDetectorRef.detectChanges();
            });
        });
    }

    protected navigateToPreviousPage(): void {
        this._router.navigate(['crm/clients']);
    }

    protected navigateToUpdateInfoPage(id: string | undefined): void {
        this._router.navigate(['crm/clients/update-client', id]);
    }
}
