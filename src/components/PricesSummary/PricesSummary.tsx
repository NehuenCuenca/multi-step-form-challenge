import { Period } from "../../types";
import { SemiAddon, Summary } from "../../types/fourthStep.types"
import PriceRow from "../PriceRow/PriceRow";
import './PricesSummary.css'

interface SummaryProps {
    children: React.ReactNode
    summary: Summary | null;
}

const PricesSummary = ({ children: PlanPriceRow, summary }: SummaryProps) => {   

    const pickAddonPriceByPeriod = (addon: SemiAddon): number => { 
        return (summary?.selectedPeriod === Period.monthly)
                    ? addon.monthlyPrice
                    : addon.yearlyPrice
    }

    const calculateTotalPriceOfSummary = (): number => {
        const addonsTotalPrices = summary!.checkedAddons?.reduce((acum: number, addon: SemiAddon) => {
            acum += pickAddonPriceByPeriod(addon)
            return acum 
        }, 0)   
        
        return addonsTotalPrices + summary!.planPrice!.price 
    }

    const totalPerPeriod = (): string => (summary?.selectedPeriod === Period.monthly)
                                    ? 'Total (per month)'
                                    : 'Total (per year)'

    return (
        <div className="summary-container">
            {
                summary && 
                <div className="summary-prices-list">
                    {PlanPriceRow}
                    
                    {
                        summary.checkedAddons?.map( (addon: SemiAddon, index: number) => <PriceRow key={index} title={addon.title} price={pickAddonPriceByPeriod(addon)} belongsToPlan={false} period={summary.selectedPeriod!} isTotal={false}/>)
                    }
                </div>
            }
            <PriceRow 
                title={totalPerPeriod()}
                price={calculateTotalPriceOfSummary()} 
                belongsToPlan={false} 
                period={summary!.selectedPeriod!}
                isTotal={true}
            />
        </div>
    )
}

export default PricesSummary