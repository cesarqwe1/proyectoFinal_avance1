export interface iStorageCartItems {
    id: number;
    name: string;
    stock: number;
    price: number;
    quantity: number;
    brand: string;
    description: string;
    is_active: boolean;
    image: string;
    coupon: string;
    createdAt: Date;
}