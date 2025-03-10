import './PlanList.css'
import { Period, Plan } from "@ownTypes/index";
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { plans } from '@data/mockPlans';

interface PlanListProps {
    selectedPeriod: string;
    selectNewPlan: (plan: Plan) => void;
}

const PlanList = ({selectedPeriod, selectNewPlan}: PlanListProps) => {

    const defaultSelectedPlanIndex = 0

    const plansListEl = useRef<HTMLUListElement>(null)
    const [selectedPlan, setSelectedPlan] = useState<Plan>(plans[defaultSelectedPlanIndex])


    useEffect(() => {
        const planButtons: Array<HTMLButtonElement> = plansListEl.current 
                                                        ? Array.from(plansListEl.current.querySelectorAll('.plan-btn'))
                                                        : [];
        planButtons[defaultSelectedPlanIndex].classList.add('plan-btn_selected')      
        selectNewPlan(selectedPlan)
    }, [])

    const handleClickPlan = (event: MouseEvent) => { 
        const plansButtons: Array<HTMLButtonElement> = Array.from(plansListEl.current!.querySelectorAll('.plan-btn'))
        
        const previousSelectedPlanBtn = plansButtons.find((plantBtn: HTMLButtonElement) => plantBtn.classList.contains('plan-btn_selected'))
        if( previousSelectedPlanBtn ){ previousSelectedPlanBtn.classList.remove('plan-btn_selected')}
        
        event.currentTarget.classList.add('plan-btn_selected')
        const indexOfSelectedPlan = Number(event.currentTarget.getAttribute('data-plan-idx')) 
        setSelectedPlan( plans[indexOfSelectedPlan] )
        selectNewPlan( plans[indexOfSelectedPlan] )
    }

    return (
        <ul className="plan-list" ref={plansListEl}>
            {
                plans.map( (plan, index) => <li className="plan-item" key={index}>
                    <button type="button" className="plan-btn" onClick={handleClickPlan} data-plan-idx={index}>
                        <img src={plan.iconImage} alt={`${plan.title} icon`} className="plan-btn__icon"/>
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