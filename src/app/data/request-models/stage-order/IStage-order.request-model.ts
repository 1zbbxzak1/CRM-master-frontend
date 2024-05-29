export interface UpdateStageRequest {
    name?: string;
    order?: number;
}

export interface UpdateRangeRequest {
    updateStages?: UpdateStageItemRequest[];
    deleteStages?: string[];
}

export interface UpdateStageItemRequest {
    id: string;
    name?: string;
    order?: number;
}
