export interface Category {
    ref: string;
    name: string;
}

export interface CategoryResponse {
    data: Category[];
    message: string;
    status: string;
}
