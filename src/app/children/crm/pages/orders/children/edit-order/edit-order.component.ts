import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef} from '@angular/core';
import {FormatterService} from "../../../clients/services/formatter.service";
import {Order} from "../../../../../../data/request-models/orders/IOrders.request-model";
import {IStageOrderResponseModel} from "../../../../../../data/response-models/stage-order/IStage-order.response-model";
import {FormControl, FormGroup} from "@angular/forms";
import {
    ChangeOrderRequest,
    GetOrdersResponse
} from "../../../../../../data/response-models/orders/IOrders.response-model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {OrderService} from "../../../../../../data/services/order/orders.service";
import {DataUpdateService} from "../../../../../services/data-update";
import {StageOrderManagerService} from "../../../../../../data/services/order/stage-order/stage-order.manager.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ProductsManagerService} from "../../../../../../data/services/products/products.manager.service";

@Component({
    selector: 'app-edit-order',
    templateUrl: './edit-order.component.html',
    styleUrls: ['../../../../styles/crm-styles.css', './edit-order.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditOrderComponent extends FormatterService {
    protected orderId!: string;
    protected order!: Order;
    protected selectedStage: any;
    protected stages: IStageOrderResponseModel[] = [];
    protected stageItemForm: FormGroup = new FormGroup({
        stage: new FormControl(''),
    });
    protected stagesList: string[] = [];
    protected orders!: GetOrdersResponse;
    protected selectStage!: number;
    protected formOrder: FormGroup = new FormGroup({
        stage: new FormControl(''),
        totalAmount: new FormControl(''),
        comment: new FormControl(''),
        address: new FormControl(''),
        fullName: new FormControl(''),
        email: new FormControl(''),
        phone: new FormControl(''),
    });
    // protected products: IProductsResponseModel[] = [];
    // protected productList: IProductsResponseModel[] = [];
    // protected selectedProduct!: IProductsResponseModel;
    private stageMap: { [key: string]: number } = {};

    constructor(
        private readonly _router: Router,
        private readonly _route: ActivatedRoute,
        protected readonly _destroyRef: DestroyRef,
        private readonly _changeDetectorRef: ChangeDetectorRef,
        protected readonly _ordersManagerService: OrderService,
        private readonly _productManagerService: ProductsManagerService,
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

        // this._productManagerService.getAllProducts().pipe(
        //     takeUntilDestroyed(this._destroyRef)
        // ).subscribe((products: IProductsResponseModel[]) => {
        //     this.products = products;
        //
        //     this.productList = this.products;
        // });
    }

    // onProductSelect(selectedProduct: IProductsResponseModel): void {
    //     this.selectedProduct = selectedProduct;
    //     this.addProductToOrderList(selectedProduct);
    // }

    // // Method to add the selected product to the order
    // addProductToOrderList(selectedProduct: IProductsResponseModel): void {
    //     if (selectedProduct && this.order) {
    //         const newProduct: OrderProduct = {
    //             id: selectedProduct.id,
    //             productId: selectedProduct.id,
    //             name: selectedProduct.name,
    //             quantity: 1,
    //             unitPrice: selectedProduct.price,
    //             photo: selectedProduct.photos[0].url || 'assets/cap.svg'
    //         };
    //
    //         this.order.products.push(newProduct);
    //     }
    // }

    loadStages() {
        this._stageOrderManagerService.getStages().pipe(
            takeUntilDestroyed(this._destroyRef)
        ).subscribe((stages: IStageOrderResponseModel[]) => {
            this.stages = stages;

            this._changeDetectorRef.detectChanges();
        });
    }

    getOrderInfo(orderId: string) {
        this._ordersManagerService.getOrderById(orderId).pipe(
            takeUntilDestroyed(this._destroyRef)
        ).subscribe((order: Order): void => {
            this.order = order;

            this.formOrder.patchValue({
                stage: order.stage,
                totalAmount: order?.totalAmount,
                comment: order?.comment,
                address: order?.address,
                fullName: order?.client?.fullName,
                email: order?.client?.email,
                phone: order?.client?.phone,
            });

            this._changeDetectorRef.detectChanges();
        });
    }

    updateOrderStage(orderId: string, newStage: string): void {
        this._ordersManagerService.getOrderById(orderId).subscribe({
                next: (order: Order): void => {
                    this.selectStage = this.stageMap[newStage];
                }
            }
        );
    }

    updateOrder(orderId: string): void {
        this._ordersManagerService.getOrderById(orderId).subscribe({
            next: (order: ChangeOrderRequest): void => {
                const totalAmount: number = parseInt(this.formOrder.get('totalAmount')?.value);
                const comment: string = this.formOrder.get('comment')?.value;
                const address: string = this.formOrder.get('address')?.value;
                const fullName: string = this.formOrder.get('fullName')?.value;
                const email: string = this.formOrder.get('email')?.value;
                const phone: string = this.formOrder.get('phone')?.value;

                const stageTab = this.selectStage !== undefined ? this.selectStage : this.stageMap[this.order.stage];


                const request: ChangeOrderRequest = {
                    stageTab: stageTab,
                    totalAmount: totalAmount,
                    isCalculationAutomated: true,
                    comment: comment,
                    address: address,
                    client: {
                        fullName: fullName,
                        email: email,
                        phone: phone,
                    },
                    products: order.products,
                };

                console.log(request);

                this._ordersManagerService.updateOrder(orderId, request).subscribe({
                    next: (): void => {
                        this.getOrderInfo(this.orderId);
                        this.loadOrdersByStage(this.selectedStage.order);

                        this._router.navigate(['crm/orders']);
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

    protected navigateToInfoPage(id: string): void {
        this._router.navigate(['crm/orders/info-order', id]);
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
