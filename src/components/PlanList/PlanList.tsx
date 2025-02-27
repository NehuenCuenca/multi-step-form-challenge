import './PlanList.css'
import { Period, Plan } from "../../types";
import { MouseEvent, MutableRefObject, useEffect, useRef, useState } from 'react';

interface PlanListProps {
    selectedPeriod: string;
    selectNewPlan: (plan: Plan) => void;
}

const PlanList = ({selectedPeriod, selectNewPlan}: PlanListProps) => {
    const plans: Array<Plan> = [
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

    const defaultSelectedPlanIndex = 0

    const planListEl = useRef<MutableRefObject>(null)
    const [selectedPlan, setSelectedPlan] = useState<Plan>(plans[defaultSelectedPlanIndex])


    useEffect(() => {
        const planButtons: Array<HTMLButtonElement> = Array.from(planListEl.current.querySelectorAll('.plan-btn'))
        planButtons[defaultSelectedPlanIndex].classList.add('plan-btn_selected')      
        selectNewPlan(selectedPlan)
    }, [])

    const handleClickPlan = (event: MouseEvent) => { 
        const planButtons: Array<HTMLButtonElement> = Array.from(planListEl.current.querySelectorAll('.plan-btn'))
        
        const previousSelectedPlanBtn = planButtons.find((plantBtn: HTMLButtonElement) => plantBtn.classList.contains('plan-btn_selected'))
        if( previousSelectedPlanBtn ){ previousSelectedPlanBtn.classList.remove('plan-btn_selected')}
        
        event.currentTarget.classList.add('plan-btn_selected')
        const indexOfSelectedPlan = Number(event.currentTarget.getAttribute('data-plan-idx')) 
        setSelectedPlan( plans[indexOfSelectedPlan] )
        selectNewPlan( plans[indexOfSelectedPlan] )
    }

    return (
        <ul className="plan-list" ref={planListEl}>
            {
                plans.map( (plan, index) => <li className="plan-item" key={index}>
                    <button type="button" className="plan-btn" onClick={handleClickPlan} data-plan-idx={index}>
                        <img src={plan.iconPath} alt={`${plan.title} icon`} className="plan-btn__icon"/>
                        <span className="plan-btn__title">{plan.title}</span>
                        
                        {selectedPeriod === Period.monthly && <span className="plan-item__price">${plan.monthlyPrice.price}/mo</span>}
                        {selectedPeriod === Period.yearly && <span className="plan-item__price">${plan.yearlyPrice.price}/yr</span>}
                        {selectedPeriod === Period.yearly && <span className="plan-item__months-free">{plan.yearlyPrice.monthsFree} months free</span>}
                    </button>
                </li>)
            }
        </ul>
    )
}

export default PlanList