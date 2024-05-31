import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, ViewChild} from "@angular/core";
import {FormatterService} from "../clients/services/formatter.service";
import {
    ChangeOrderRequest,
    GetOrderItemResponse,
    GetOrdersResponse
} from "../../../../data/response-models/orders/IOrders.response-model";
import {IStageOrderResponseModel} from "../../../../data/response-models/stage-order/IStage-order.response-model";
import {FormControl, FormGroup} from "@angular/forms";
import {SettingsComponent} from "./components/settings/settings.component";
import {AddOrderComponent} from "./components/add-order/add-order.component";
import {Router} from "@angular/router";
import {StageOrderManagerService} from "../../../../data/services/order/stage-order/stage-order.manager.service";
import {OrderService} from "../../../../data/services/order/orders.service";
import {DataUpdateService} from "../../../services/data-update";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Order} from "../../../../data/request-models/orders/IOrders.request-model";
import {PolymorpheusContent} from "@tinkoff/ng-polymorpheus";
import {TuiDialogContext} from "@taiga-ui/core";

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['../../styles/crm-styles.css', './styles/orders.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent extends FormatterService {
    protected orders!: GetOrdersResponse;
    protected stages: IStageOrderResponseModel[] = [];
    protected search: string = '';
    protected selectedStage: any;
    protected stagesList: string[] = [];
    protected stageItemForm: FormGroup = new FormGroup({
        stage: new FormControl(''),
    });
    protected isCollapsed: boolean = false;
    private stageMap: { [key: string]: number } = {};
    @ViewChild(SettingsComponent)
    private readonly _settingsComponent!: SettingsComponent;
    @ViewChild(AddOrderComponent)
    private readonly _addOrderComponent!: AddOrderComponent;
    private ascendingOrder: boolean = true;

    constructor(
        private readonly _router: Router,
        private readonly _destroyRef: DestroyRef,
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private readonly _stageOrderManagerService: StageOrderManagerService,
        private readonly _ordersManagerService: OrderService,
        private readonly _dataUpdateService: DataUpdateService,
    ) {
        super();

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

    // TODO: фильтрация для поиска
    get filteredOrders(): GetOrderItemResponse[] {
        return this.search ?
            this.orders?.orders.filter((order: GetOrderItemResponse) => order.client.fullName.toLowerCase().includes(this.search.toLowerCase())) :
            this.orders?.orders;
    }

    toggle(open: boolean): void {
        this.isCollapsed = open;

    }

    loadStages() {
        this._stageOrderManagerService.getStages().pipe(
            takeUntilDestroyed(this._destroyRef)
        ).subscribe((stages: IStageOrderResponseModel[]) => {
            this.stages = stages;

            this._changeDetectorRef.detectChanges();
        });
    }

    toggleSort(): void {
        this.ascendingOrder = !this.ascendingOrder;
        this.sortOrders();
    }

    sortOrders(): void {
        this.orders.orders.sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();

            if (this.ascendingOrder) {
                return dateA - dateB;
            } else {
                return dateB - dateA;
            }
        });
        // Trigger change detection to update the view
        this._changeDetectorRef.detectChanges();
    }

    selectStage(index: number): void {
        this.selectedStage = this.stages[index];
        this.loadOrdersByStage(this.selectedStage.order);
    }

    getOrderForm(order: GetOrderItemResponse): FormGroup {
        return new FormGroup({
            stage: new FormControl(order.stage || ''),
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


    protected openDialogSettings(
        settings: PolymorpheusContent<TuiDialogContext>,
    ): void {
        this._settingsComponent.openDialogSettings(settings);
    }

    protected navigateToInfoOrderPage(id: string): void {
        this._router.navigate([`crm/orders/info-order/`, id]);
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
