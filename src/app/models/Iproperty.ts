export interface Iproperty {
    id: number;
    title: string;
    description: string;
    price: number;
    location: string;
    type: 'sale' | 'rent';
    image: string;
    sellerId: number;
}
