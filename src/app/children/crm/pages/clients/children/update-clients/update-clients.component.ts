import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef} from '@angular/core';
import {ClientDto} from "../../../../../../data/response-models/clients/IClients.response-model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ClientsManagerService} from "../../../../../../data/services/clients/clients.manager.service";
import {FormatterService} from "../../services/formatter.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {FormControl, FormGroup} from "@angular/forms";
import {IClientsRequestModel} from "../../../../../../data/request-models/clients/IClients.request-model";

@Component({
    selector: 'app-update-clients',
    templateUrl: './update-clients.component.html',
    styleUrls: ['../../../../styles/crm-styles.css', './styles/update-clients.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateClientsComponent extends FormatterService {
    protected clientId!: string;
    protected client!: ClientDto | null;

    protected formClientInfo: FormGroup = new FormGroup({
        fullName: new FormControl(''),
        phone: new FormControl(''),
        email: new FormControl(''),
    });

    constructor(
        private readonly _router: Router,
        private readonly _route: ActivatedRoute,
        private readonly _destroyRef: DestroyRef,
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

                if (client) {
                    this.formClientInfo.patchValue({
                        fullName: client.fullName,
                        phone: this.formatPhoneNumber(client.phone),
                        email: client.email,
                    })
                }

                this._changeDetectorRef.detectChanges();
            });
        });
    }

    protected updateClientInfo(): void {
        const name: string = this.formClientInfo.get('fullName')?.value;
        const phone: string = this.formClientInfo.get('phone')?.value;
        const email: string = this.formClientInfo.get('email')?.value;

        if (name && phone && email) {
            const client: IClientsRequestModel = {
                fullName: name,
                email: email,
                phone: phone,
            }

            this._clientsManagerService.updateClient(this.client!.id, client).pipe(
                takeUntilDestroyed(this._destroyRef)
            ).subscribe({
                next: (): void => {
                    this.navigateToPreviousPage(this.client!.id);
                },
            });
        }
    }

    protected navigateToPreviousPage(id: string | null): void {
        this._router.navigate(['crm/clients/info-client', id]);
    }
}
