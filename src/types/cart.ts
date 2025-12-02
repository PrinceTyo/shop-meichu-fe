export interface CartItem {
    id: number;
    name: string;
    href: string;
    price: number;
    image: string;
    variant: string;
    quantity: number;
}

export interface RecommendedProduct {
    id: number;
    name: string;
    href: string;
    price: number;
    image: string;
}