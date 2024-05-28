import {ErrorHandler, inject} from '@angular/core';
import {ClientsService} from './clients.service';
import {NEVER, Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {
    ClientDto,
    ClientItemResponse,
    IClientsResponseModel
} from '../../response-models/clients/IClients.response-model';
import {IClientsRequestModel} from '../../request-models/clients/IClients.request-model';

export class ClientsManagerService {

    private readonly _clientsService: ClientsService = inject(ClientsService);
    private readonly _errorHandler: ErrorHandler = inject(ErrorHandler);

    public getAllClients(): Observable<IClientsResponseModel> {
        return this._clientsService.getAllClients().pipe(
            catchError(err => {
                this._errorHandler.handleError(err);
                return NEVER;
            })
        );
    }

    public getClientById(id: string): Observable<ClientDto | null> {
        return this._clientsService.getByIdClient(id).pipe(
            catchError(error => {
                this._errorHandler.handleError(error);
                return of(null);
            })
        );
    }

    public updateClient(id: string, client: IClientsRequestModel): Observable<ClientItemResponse | null> {
        return this._clientsService.updateClient(id, client).pipe(
            catchError(error => {
                this._errorHandler.handleError(error);
                return of(null);
            })
        );
    }

    public deleteClient(id: string): Observable<boolean> {
        return this._clientsService.deleteClient(id).pipe(
            map(() => true),
            catchError(error => {
                this._errorHandler.handleError(error);
                return of(false);
            })
        );
    }
}
