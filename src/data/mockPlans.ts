import { Plan } from "@ownTypes/index";
import arcadeIcon from '@starterFiles/assets/images/icon-arcade.svg';
import advancedIcon from '@starterFiles/assets/images/icon-advanced.svg';
import proIcon from '@starterFiles/assets/images/icon-pro.svg';

export const plans: Array<Plan> = [
    {
        iconPath: '../../../starter_files/assets/images/icon-arcade.svg',
        iconImage: arcadeIcon,
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
        iconImage: advancedIcon,
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
        iconImage: proIcon,
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