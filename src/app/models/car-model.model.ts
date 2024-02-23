export class CarModel {
    code:string;
    colors: Colors[];
    description:string;
    imageUrl:string;
    selColors:Colors;

    constructor(){}
}

export class Colors {
    code: string;
    description:string;
    price:number;
    constructor(){}
}
