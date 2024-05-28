import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef} from '@angular/core';
import {Router} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ClientsManagerService} from '../../../../data/services/clients/clients.manager.service';
import {
    ClientItemResponse,
    IClientsResponseModel
} from '../../../../data/response-models/clients/IClients.response-model';

@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['../../styles/crm-styles.css', './styles/clients.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsComponent {
    protected clients!: IClientsResponseModel;
    protected search: string = '';

    constructor(
        private readonly _router: Router,
        private readonly _destroyRef: DestroyRef,
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private readonly _clientsManagerService: ClientsManagerService,
    ) {
        this._clientsManagerService.getAllClients().pipe(
            takeUntilDestroyed(this._destroyRef)
        )
            .subscribe((clients: IClientsResponseModel): void => {
                this.clients = clients;

                this._changeDetectorRef.detectChanges();
            });
    }

    protected searchClients(): ClientItemResponse[] {
        return this.clients.clients.filter((client: ClientItemResponse) => client.fullName.toLowerCase().includes(this.search.toLowerCase()));
    }

    protected navigateToInfoClientPage(id: string): void {
        this._router.navigate(['crm/clients/info-client', id]);
    }
}
