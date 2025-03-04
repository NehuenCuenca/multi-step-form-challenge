import './NavigationButtons.css'

interface NavigationButtonsProps{
  quantitySteps: number;
  currentStep: number;
  newNavigation: (step: number) => void;
  confirmFinishForm: () => void;
}


const NavigationButtons = ({quantitySteps, currentStep, newNavigation, confirmFinishForm}: NavigationButtonsProps) => {
  const isBetweenStartAndEnd = () => (currentStep > 0) && (currentStep < quantitySteps)
  const isBeforeTheEnd = () => (currentStep < quantitySteps-1)
  const isAtTheEnd = () => (currentStep === quantitySteps-1)

  return (
    <section className="navigation-buttons">
        {isBetweenStartAndEnd() && <button type="button" onClick={() => newNavigation(-1)} className="navigation-buttons__button navigation-buttons__button_back">Go Back</button>}
        {isBeforeTheEnd() && <button type="button" onClick={() => newNavigation(1)} className="navigation-buttons__button navigation-buttons__button_forward">Next Step</button>}
        {isAtTheEnd() && <button type="button" onClick={confirmFinishForm} className="navigation-buttons__button navigation-buttons__button_confirm">Confirm</button>}
    </section>
  )
}

export default NavigationButtons