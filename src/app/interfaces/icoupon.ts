export interface iCoupon {
    id: number;
    code: string;
    discount_percentage: number;
    is_active: boolean;
    expiration_date: Date;
    created_at: Date;
}