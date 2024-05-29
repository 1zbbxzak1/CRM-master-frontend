import {OrderClient} from "../../request-models/orders/IOrders.request-model";

export interface GetOrderItemResponse {
    id: string;
    name: string;
    stage: string;
    totalAmount: number;
    comment: string;
    address: string;
    date: string;
    client: OrderClientDto;
}

export interface OrderClientDto {
    id: string;
    fullName: string;
    email: string;
    phone: string;
}

export interface GetOrdersResponse {
    count: number;
    orders: GetOrderItemResponse[];
}

// requests.ts
export interface CreateOrderRequest {
    stageTab: number;
    totalAmount: number;
    isCalculationAutomated: boolean;
    comment: string;
    address: string;
    client: OrderClient;
    products: OrderProductRequest[];
}

export interface ChangeOrderRequest {
    stageTab?: number;
    totalAmount?: number;
    isCalculationAutomated?: boolean;
    comment?: string;
    address?: string;
    client?: ChangeOrderClientRequest;
    products?: OrderProductRequest[];
}

export interface ChangeOrderClientRequest {
    fullName?: string;
    email?: string;
    phone?: string;
}

export interface OrderProductRequest {
    productId: string;
    quantity: number;
}
