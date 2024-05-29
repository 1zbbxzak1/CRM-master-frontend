import {ErrorHandler, inject} from "@angular/core";
import {StageOrderService} from "./stage-order.service";
import {catchError, NEVER, Observable} from "rxjs";
import {IStageOrderResponseModel} from "../../../response-models/stage-order/IStage-order.response-model";
import {UpdateStageRequest} from "../../../request-models/stage-order/IStage-order.request-model";

export class StageOrderManagerService {

    private readonly _stageOrderService: StageOrderService = inject(StageOrderService);
    private readonly _errorHandler: ErrorHandler = inject(ErrorHandler);

    public getStages(): Observable<IStageOrderResponseModel[]> {
        return this._stageOrderService.getStages().pipe(
            catchError(err => {
                this._errorHandler.handleError(err);
                return NEVER;
            })
        );
    }

    public updateStage(id: string, stage: UpdateStageRequest): Observable<IStageOrderResponseModel> {
        return this._stageOrderService.updateStage(id, stage).pipe(
            catchError(err => {
                this._errorHandler.handleError(err);
                return NEVER;
            })
        );
    }

    public updateStages(stage: IStageOrderResponseModel[]): Observable<IStageOrderResponseModel[]> {
        return this._stageOrderService.updateStages(stage).pipe(
            catchError(err => {
                this._errorHandler.handleError(err);
                return NEVER;
            })
        );
    }

    public deleteStage(id: string): Observable<void> {
        return this._stageOrderService.deleteStage(id).pipe(
            catchError(err => {
                this._errorHandler.handleError(err);
                return NEVER;
            })
        );
    }
}
