export class CarConfig {
    configs:Configs[];
    towHitch:boolean;
    yoke:boolean
    selConfig:Configs
}

export class Configs {
    description: string;
    id:number;
    price:number;
    range:number
    speed:number
}