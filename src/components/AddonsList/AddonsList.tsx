import { ChangeEvent } from "react";
import { addons } from "../../data/mockAddons";
import { Addon, Period } from "../../types";
import "./AddonsList.css";

interface AddonsListProps {
    selectedPeriod: string;
    toggleCheckAddon: (clickedAddon: Addon, wantToRemove: boolean) => void;
}

const AddonsList = ({ selectedPeriod, toggleCheckAddon }: AddonsListProps) => {
    const handleClickAddon = (event: ChangeEvent) => { 
        const addonIdx = Number(event.currentTarget.getAttribute('data-addon-idx'))
        const clickedAddon = addons[addonIdx]
        return (event.currentTarget.checked) 
                    ? toggleCheckAddon(clickedAddon, false)
                    : toggleCheckAddon(clickedAddon, true)
    }

  return (
    <ul className="addons-list">
        {
            addons.map( (addon, index) => <li className="addon-item" key={index}>
                <input type="checkbox" id={`${index}-addon-checkbox`} name={`${index}-addon-checkbox`} className="addon-item__checkbox" onChange={handleClickAddon} data-addon-idx={index} />
                <div className="text-container">
                    <label htmlFor={`${index}-addon-checkbox`} className="text-container__title">{addon.title}</label>
                    <p className="text-container__paragraph">{addon.paragraph}</p>
                </div>
                    
                {selectedPeriod === Period.monthly && <span className="addon-item__price">+${addon.monthlyPrice}/mo</span>}
                {selectedPeriod === Period.yearly && <span className="addon-item__price">+${addon.yearlyPrice}/yr</span>}
            </li>)
        }
    </ul>
  )
}

export default AddonsList