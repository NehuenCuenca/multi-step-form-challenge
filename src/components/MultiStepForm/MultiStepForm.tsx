import { ShortenedStep, Step } from "../../types"
import NavigationButtons from "../NavigationButtons/NavigationButtons";
import StepsList from "../StepsList/StepsList";
import './MultiStepForm.css'

interface MultiStepFormProps{
  children: React.ReactNode;
  steps: Array<Step>;
}

const MultiStepForm = ({ children, steps }: MultiStepFormProps) => {
  const shortenedSteps: Array<ShortenedStep> = steps.map(({listTitle}) => ({listTitle}))

  return (
    <article className="multi-step-container">
      <StepsList shortenedSteps={shortenedSteps} />
      {children}
      <NavigationButtons />
    </article>
  )
}

export default MultiStepForm