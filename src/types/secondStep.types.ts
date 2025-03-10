export enum Period {
    monthly = 'MONTHLY',
    yearly = 'YEARLY'
}

export interface Price {
    price: number,
    monthsFree?: number
}

export interface Plan {
    iconPath: string,
    iconImage: string,
    title: string,
    monthlyPrice: Price,
    yearlyPrice: Price,
}