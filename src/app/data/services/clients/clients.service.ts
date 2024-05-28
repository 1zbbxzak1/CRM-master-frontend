import {HttpClient} from "@angular/common/http";
import {inject} from "@angular/core";
import {
    ClientDto,
    ClientItemResponse,
    IClientsResponseModel
} from "../../response-models/clients/IClients.response-model";
import {Observable} from "rxjs";
import {IClientsRequestModel} from "../../request-models/clients/IClients.request-model";

export class ClientsService {

    private readonly _http: HttpClient = inject(HttpClient);

    private apiUrl: string = 'http://localhost:8080/clients';

    public getAllClients(): Observable<IClientsResponseModel> {
        return this._http.get<IClientsResponseModel>(`${this.apiUrl}`, {withCredentials: true});
    }

    public getByIdClient(id: string): Observable<ClientDto> {
        return this._http.get<ClientDto>(`${this.apiUrl}/${id}`, {withCredentials: true});
    }

    public updateClient(id: string, client: IClientsRequestModel): Observable<ClientItemResponse> {
        return this._http.put<ClientItemResponse>(`${this.apiUrl}/${id}`, client, {withCredentials: true});
    }

    public deleteClient(id: string): Observable<void> {
        return this._http.delete<void>(`${this.apiUrl}/${id}`, {withCredentials: true});
    }
}
