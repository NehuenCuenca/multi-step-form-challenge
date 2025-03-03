import classNames from "classnames";
import { Period } from "../../types";
import './PriceRow.css'

interface PriceRowProps {
    title: string;
    price: number;
    period: string;
    belongsToPlan: boolean;
    isTotal: boolean;
}

const PriceRow = ({ title, price, period, belongsToPlan, isTotal }: PriceRowProps) => {
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
            {/* TODO: Hacer un context provider para este boton */}{belongsToPlan && <button type="button" className="summary-item__change-plan-btn">Change</button>}
            <span className={spanPriceGroupStyles}>{togglePriceTextByPeriod(price)}</span>
        </div>
    )
}

export default PriceRow