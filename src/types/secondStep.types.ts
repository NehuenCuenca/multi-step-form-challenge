export enum Period {
    monthly = 'MONTHLY',
    yearly = 'YEARLY'
}

interface Price {
    price: number,
    monthsFree: number
}

export interface Plan {
    iconPath: string,
    title: string,
    monthlyPrice: Price,
    yearlyPrice: Price,
}