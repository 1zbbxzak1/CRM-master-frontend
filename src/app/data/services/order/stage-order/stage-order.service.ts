import {HttpClient} from "@angular/common/http";
import {inject} from "@angular/core";
import {IStageOrderResponseModel} from "../../../response-models/stage-order/IStage-order.response-model";
import {Observable} from "rxjs";
import {UpdateStageRequest} from "../../../request-models/stage-order/IStage-order.request-model";

export class StageOrderService {

    private readonly _http: HttpClient = inject(HttpClient);
    private readonly _apiUrl: string = 'http://localhost:8080/orders/stages';

    public getStages(): Observable<IStageOrderResponseModel[]> {
        return this._http.get<IStageOrderResponseModel[]>(`${this._apiUrl}`, {withCredentials: true});
    }

    public updateStage(id: string, stage: UpdateStageRequest): Observable<IStageOrderResponseModel> {
        return this._http.put<IStageOrderResponseModel>(`${this._apiUrl}/${id}`, stage, {withCredentials: true});
    }

    public updateStages(stages: IStageOrderResponseModel[]): Observable<IStageOrderResponseModel[]> {
        return this._http.put<IStageOrderResponseModel[]>(`${this._apiUrl}`, stages, {withCredentials: true});
    }

    public deleteStage(id: string): Observable<void> {
        return this._http.delete<void>(`${this._apiUrl}/${id}`, {withCredentials: true});
    }
}
