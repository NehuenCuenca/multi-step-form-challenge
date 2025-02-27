import { Plan } from "../types";

export const plans: Array<Plan> = [
    {
        iconPath: '../../../starter_files/assets/images/icon-arcade.svg',
        title: 'Arcade',
        monthlyPrice: {
            price: 9,
            monthsFree: 0
        },
        yearlyPrice: {
            price: 90,
            monthsFree: 2
        },
    },
    {
        iconPath: '../../../starter_files/assets/images/icon-advanced.svg',
        title: 'Advanced',
        monthlyPrice: {
            price: 12,
            monthsFree: 0
        },
        yearlyPrice: {
            price: 120,
            monthsFree: 2
        },
    },
    {
        iconPath: '../../../starter_files/assets/images/icon-pro.svg',
        title: 'Pro',
        monthlyPrice: {
            price: 15,
            monthsFree: 0
        },
        yearlyPrice: {
            price: 150,
            monthsFree: 2
        },
    },
]