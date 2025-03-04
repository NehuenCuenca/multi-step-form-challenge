import { ShortenedStep } from "../../types";
import "./StepsList.css";

interface StepsListProps{
  shortenedSteps: Array<ShortenedStep>;
  currentStep: number;
}

const StepsList = ({shortenedSteps, currentStep}: StepsListProps) => {
  const isCurrentStep: (step: number) => boolean = (step: number) => step === currentStep

  return (
    <ul className="steps-list">
      { shortenedSteps.map((({listTitle}, index) => <li className="step-item" key={index}>
        <span className={`step-item__number ${(isCurrentStep(index) ? 'step-item__number_active' : '')}`}>{index+1}</span>
        <span className="step-item__step-indicator">step {index+1}</span>
        <span className="step-item__title">{listTitle}</span>
      </li>)) }
    </ul>
  )
}

export default StepsList