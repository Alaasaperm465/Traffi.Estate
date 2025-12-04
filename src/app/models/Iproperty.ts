export interface Iproperty {
    id: number;
    title: string;
    description: string;
    price: number;
    location: string;
    Area:number;
    pathRoomCount:number;
    RoomsCount:number;
    FinishLevel:string;
    purpos:string;
    type: 'sale' | 'rent';
    image: string;
    sellerId: number;
    status:string;
}
