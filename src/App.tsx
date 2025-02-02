import { useState } from 'react'
import './App.css'
import MultiStepForm from './components/MultiStepForm/MultiStepForm'
import StepContainer from './components/StepContainer/StepContainer'
import { ShortenedStep, Step } from './types'
import NavigationButtons from './components/NavigationButtons/NavigationButtons'
import StepsList from './components/StepsList/StepsList'

function App() {
  const steps: Array<Step> = [
    {
      listTitle: 'Your info',
      containerTitle: 'Personal info',
      containerSubTitle: 'Please provide your name, email address, and phone number.',
    },
    {
      listTitle: 'Select plan',
      containerTitle: 'Select your plan',
      containerSubTitle: 'You have the option of monthly or yearly billing.',
    },
    {
      listTitle: 'Add-ons',
      containerTitle: 'Pick add-ons',
      containerSubTitle: 'Add-ons help enhance your gaming experience.',
    },
    {
      listTitle: 'Summary',
      containerTitle: 'Finishing up',
      containerSubTitle: 'Double-check everything looks OK before confirming.',
    },
  ]

  const shortenedSteps: Array<ShortenedStep> = steps.map(({listTitle}) => ({listTitle}))
  
  const [currentStep, setCurrentStep] = useState<number>(0)
  const isCurrentStep: (step: number) => boolean = (stepNumber: number) => stepNumber === currentStep

  const handleNavigationForm = (amount: number) => {
    setCurrentStep(prev => prev + amount);
  };
  
  return (
    <main>
      {currentStep}
      <MultiStepForm>
        <StepsList shortenedSteps={shortenedSteps} currentStep={currentStep} />
        
        {/* POSSIBLE TODO: Show one StepContainer by removing children content and render the step content conditionally (to reduce harcoded steps data and optimize dom content) */}
        <StepContainer isVisible={isCurrentStep(0)} containerTitle={steps[0].containerTitle} containerSubTitle={steps[0].containerSubTitle}>
          Aca va PRIMER STEP
        </StepContainer>
        <StepContainer isVisible={isCurrentStep(1)} containerTitle={steps[1].containerTitle} containerSubTitle={steps[1].containerSubTitle}>
          Aca va el SEGUNDO STEP
        </StepContainer>
        <StepContainer isVisible={isCurrentStep(2)} containerTitle={steps[2].containerTitle} containerSubTitle={steps[2].containerSubTitle}>
          Aca va el TERCERO STEP
        </StepContainer>
        <StepContainer isVisible={isCurrentStep(3)} containerTitle={steps[3].containerTitle} containerSubTitle={steps[3].containerSubTitle}>
          Aca va el CUARTO STEP
        </StepContainer>
        <StepContainer isVisible={isCurrentStep(steps.length)} containerTitle={''} containerSubTitle={''}>
          Aca va el THANK YOU
        </StepContainer>

        <NavigationButtons quantitySteps={steps.length} currentStep={currentStep} newNavigation={handleNavigationForm}/>
      </MultiStepForm>
    </main>
  )
}

export default App
