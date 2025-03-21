import classNames from "classnames";
import { Period } from "@ownTypes/index";
import './PriceRow.css'

interface PriceRowProps {
    changePlan?: () => void;
    title: string;
    price: number;
    period: string;
    belongsToPlan: boolean;
    isTotal: boolean;
}

const PriceRow = ({ changePlan, title, price, period, belongsToPlan, isTotal }: PriceRowProps) => {
    const togglePriceTextByPeriod = (price: number) => {
        const addPlusWhenIsAnAddon = (!belongsToPlan) ? '+':''

        return (period === Period.monthly)
                    ? `$${price}/mo`
                    : `${addPlusWhenIsAnAddon}$${price}/yr`
    } 

    const spanPriceGroupStyles = classNames(
        'summary-item__price',
        {
          'summary-item__price_plan': belongsToPlan,
          'summary-item__price_total': isTotal
        }
      );

    return (
        <div className="summary-item">
            <span className={`summary-item__title ${(belongsToPlan) ? 'summary-item__title_plan':''}`}>{title}</span>
            {belongsToPlan && <button type="button" onClick={changePlan} className="summary-item__change-plan-btn">Change</button>}
            <span className={spanPriceGroupStyles}>{togglePriceTextByPeriod(price)}</span>
        </div>
    )
}

export default PriceRow