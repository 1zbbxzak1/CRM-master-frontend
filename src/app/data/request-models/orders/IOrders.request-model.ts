export interface Order {
    id: string;
    name: string;
    stage: string;
    totalAmount: number;
    isCalculationAutomated: boolean;
    comment: string;
    address: string;
    date: Date;
    client: OrderClient;
    products: OrderProduct[];
}

export interface OrderClient {
    fullName: string;
    email: string;
    phone: string;
}

export interface OrderProduct {
    id: string;
    productId: string;
    quantity: number;
    name: string;
    photo?: string;
}
