export interface iProducts {
    id: number;
    name: string;
    stock: number;
    price: number;
    brand: string;
    description: string;
    is_active: boolean;
    image: string;
    category_id: number;
    created_at: Date;
}