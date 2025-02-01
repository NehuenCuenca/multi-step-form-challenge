import { ShortenedStep } from "../../types";
import "./StepsList.css";

interface StepsListProps{
  shortenedSteps: Array<ShortenedStep>;
}

const StepsList = ({shortenedSteps}: StepsListProps) => {
  return (
    <ul className="steps-list">
      { shortenedSteps.map((({listTitle}, index) => <li className="step-item" key={index}>
        <span className="step-item__number">{index+1}</span>
        <span className="step-item__step-indicator">step {index+1}</span>
        <span className="step-item__title">{listTitle}</span>
      </li>)) }
    </ul>
  )
}

export default StepsList