import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef} from '@angular/core';
import {FormatterService} from "../../../clients/services/formatter.service";
import {Order} from "../../../../../../data/request-models/orders/IOrders.request-model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {OrderService} from "../../../../../../data/services/order/orders.service";
import {FormControl, FormGroup} from "@angular/forms";
import {
    ChangeOrderRequest,
    GetOrdersResponse
} from "../../../../../../data/response-models/orders/IOrders.response-model";
import {IStageOrderResponseModel} from "../../../../../../data/response-models/stage-order/IStage-order.response-model";
import {DataUpdateService} from "../../../../../services/data-update";
import {StageOrderManagerService} from "../../../../../../data/services/order/stage-order/stage-order.manager.service";

@Component({
    selector: 'app-info-product',
    templateUrl: './info-order.component.html',
    styleUrls: ['../../../../styles/crm-styles.css', './info-order.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoOrderComponent extends FormatterService {
    protected orderId!: string;
    protected order!: Order | null;
    protected selectedStage: any;
    protected stages: IStageOrderResponseModel[] = [];
    protected stageItemForm: FormGroup = new FormGroup({
        stage: new FormControl(''),
    });
    protected orders!: GetOrdersResponse;
    protected stagesList: string[] = [];
    private stageMap: { [key: string]: number } = {};

    constructor(
        private readonly _router: Router,
        private readonly _route: ActivatedRoute,
        protected readonly _destroyRef: DestroyRef,
        private readonly _changeDetectorRef: ChangeDetectorRef,
        protected readonly _ordersManagerService: OrderService,
        private readonly _dataUpdateService: DataUpdateService,
        private readonly _stageOrderManagerService: StageOrderManagerService,
    ) {
        super();
        this._route.params.subscribe((params: Params): void => {
            this.orderId = params['id'];

            this.getOrderInfo(this.orderId);
        });

        this._stageOrderManagerService.getStages().pipe(
            takeUntilDestroyed(this._destroyRef)
        )
            .subscribe((stages: IStageOrderResponseModel[]): void => {
                this.stages = stages;

                if (this.selectedStage) {
                    const selectedStageIndex = stages.findIndex(stage => stage === this.selectedStage);
                    if (selectedStageIndex !== -1) {
                        const selectedStageName = stages[selectedStageIndex].name;
                        this.stageItemForm.patchValue({
                            stage: selectedStageName
                        });
                    }
                }

                this.stagesList = stages.map((stage: IStageOrderResponseModel) => stage.name);


                this.stageMap = {};
                stages.forEach((stage: IStageOrderResponseModel) => {
                    this.stageMap[stage.name] = stage.order;
                });

                if (this.stages.length > 0) {
                    this.selectedStage = this.stages[0];
                    this.loadOrdersByStage(this.selectedStage.order);
                }


                this._dataUpdateService.onUpdateData().subscribe(() => {
                    this.loadStages();
                });
            });
    }

    loadStages() {
        this._stageOrderManagerService.getStages().pipe(
            takeUntilDestroyed(this._destroyRef)
        ).subscribe((stages: IStageOrderResponseModel[]) => {
            this.stages = stages;

            this._changeDetectorRef.detectChanges();
        });
    }

    getOrderForm(order: string | undefined): FormGroup {
        return new FormGroup({
            stage: new FormControl(order || ''),
        });
    }

    getOrderInfo(orderId: string) {
        this._ordersManagerService.getOrderById(orderId).pipe(
            takeUntilDestroyed(this._destroyRef)
        ).subscribe((order: Order | null): void => {
            this.order = order;

            this._ordersManagerService

            this._changeDetectorRef.detectChanges();
        });
    }

    updateOrderStage(orderId: string, newStage: string): void {
        this._ordersManagerService.getOrderById(orderId).subscribe({
            next: (order: Order): void => {
                const stageNumber: number = this.stageMap[newStage];

                const request: ChangeOrderRequest = {
                    stageTab: stageNumber,
                    totalAmount: order.totalAmount,
                    isCalculationAutomated: order.isCalculationAutomated,
                    comment: order.comment,
                    address: order.address,
                    client: order.client,
                    products: order.products,
                };

                this._ordersManagerService.updateOrder(orderId, request).subscribe({
                    next: (): void => {
                        this.getOrderInfo(this.orderId);
                        this.loadOrdersByStage(this.selectedStage.order);
                    },
                    error: (error): void => {
                        console.log(error);
                    }
                });
            },
            error: (error): void => {
                console.log(error);
            }
        });
    }

    protected navigateToPreviousPage(): void {
        this._router.navigate(['crm/orders']);
    }

    protected navigateToUpdateInfoPage(id: string): void {
        this._router.navigate(['crm/orders/edit-order', id]);
    }

    private loadOrdersByStage(stageId: number): void {
        this._ordersManagerService.getOrders(stageId).pipe(
            takeUntilDestroyed(this._destroyRef)
        )
            .subscribe((response: GetOrdersResponse) => {
                this.orders = response;
                this._changeDetectorRef.detectChanges();
            });
    }
}
