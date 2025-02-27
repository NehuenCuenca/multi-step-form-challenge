import { MutableRefObject, useRef, useState } from 'react'
import './App.css'
import MultiStepForm from './components/MultiStepForm/MultiStepForm'
import StepContainer from './components/StepContainer/StepContainer'
import { Period, personalInfoForm, Plan, ShortenedStep, Step } from './types'
import NavigationButtons from './components/NavigationButtons/NavigationButtons'
import StepsList from './components/StepsList/StepsList'
import PlanList from './components/PlanList/PlanList'
import PeriodSwitch from './components/PeriodSwitch/PeriodSwitch'
import { steps } from './data/mockSteps'

function App() {
  const shortenedSteps: Array<ShortenedStep> = steps.map(({listTitle}) => ({listTitle}))
  
  const [currentStep, setCurrentStep] = useState<number>(0)
  const isCurrentStep: (step: number) => boolean = (stepNumber: number) => stepNumber === currentStep
  const personalInfoFormEl = useRef<MutableRefObject>(null)

  const [personalInfoFormValues, setPersonalInfoFormValues] = useState<personalInfoForm|null>(null)
  
  const validateTextFields = (form: HTMLFormElement) => { 
    const requiredInputs = form.elements;
    for (let i = 0; i < requiredInputs.length; i++) {
      const input = requiredInputs[i];
      const errorMsg = form.querySelector(`input#${input.id}+.field__error-msg`)
      
      const { valueMissing, valid, typeMismatch } = input.validity
      const hasEmptyText = (input.value.trim().length === 0 && ['text', 'email'].some(v => v === input.type))
      if( valueMissing || !valid || typeMismatch || hasEmptyText ){
        toggleFieldValidationStyle(input, errorMsg, false)
      } else {
        toggleFieldValidationStyle(input, errorMsg, true)
      }    
    }
  }

  const resetFieldsValidationStyles = (form: HTMLFormElement) => { 
    const requiredInputs = form.elements;

    for (let i = 0; i < requiredInputs.length; i++) {
      const input = requiredInputs[i];
      const errorMsg = form.querySelector(`input#${input.id}+.field__error-msg`)
      toggleFieldValidationStyle(input, errorMsg, true)
    }
  }

  const toggleFieldValidationStyle = (input: Element, errorMsg: Element | null, isValid: boolean) => { 
    if( isValid ){
      errorMsg?.classList.add('field__error-msg_hidden')
      input.classList.remove('field__input_invalid')
    } else {
      errorMsg?.classList.remove('field__error-msg_hidden')
      input.classList.add('field__input_invalid')
    } 
  }

  // Function with proper typing
  const getFormData = (form: HTMLFormElement): personalInfoForm => {
    const formData = new FormData(form);
    const object = Object.fromEntries(formData) as Record<string, FormDataEntryValue>;
    
    // Type assertion to ensure the object matches our interface
    return object as personalInfoForm;
  }

  const handleNavigationForm = (amount: number) => {
    const wantsToContinue = amount > 0
    if(wantsToContinue){
      if(currentStep === 0 && !personalInfoFormEl.current.checkValidity()) {
        validateTextFields(personalInfoFormEl.current)
        setPersonalInfoFormValues(null)
        return
      } else {
        resetFieldsValidationStyles(personalInfoFormEl.current)
        setPersonalInfoFormValues( getFormData(personalInfoFormEl.current) )
      }
    }

    if(currentStep === 1) {
      console.log('Step 2 selected info:', {
        planTitle: selectedPlan?.title,
        price: (selectedPeriod === Period.monthly) 
              ? selectedPlan?.monthlyPrice
              : selectedPlan?.yearlyPrice
      });
    }

    setCurrentStep(prev => prev + amount);
  };

  const [selectedPeriod, setSelectedPeriod] = useState<string>(Period.monthly)
  const handlePeriodSwitch = (period: string) => setSelectedPeriod(period);

  const [selectedPlan, setSelectedPlan] = useState<Plan|null>(null)
  const handleSelectPlan = (plan: Plan) => setSelectedPlan(plan);
  
  return (
    <main>
      <MultiStepForm>
        <StepsList shortenedSteps={shortenedSteps} currentStep={currentStep} />
        
        <StepContainer isVisible={isCurrentStep(0)} containerTitle={steps[0].containerTitle} containerSubTitle={steps[0].containerSubTitle}>
          <form className='personal-info-form' name='personalInfoForm' ref={personalInfoFormEl}>
            <div className="field">
              <label htmlFor="fullNameInput" className='field__label'>Name</label>
              <input type="text" required name="FullName" id="fullNameInput" className='field__input' placeholder='e.g. Sthephen King' />
              <span className="field__error-msg field__error-msg_hidden">This field is required</span>
            </div>
            <div className="field">
              <label htmlFor="emailInput" className='field__label'>Email Address</label>
              <input type="email" required name="EmailAddress" id="emailInput" className='field__input' placeholder='e.g. sthephenking@lorem.com' />
              <span className="field__error-msg field__error-msg_hidden">This field is required</span>
            </div>
            <div className="field">
              <label htmlFor="phoneInput" className='field__label'>Phone Number</label>
              <input type="text" required name="PhoneNumber" id="phoneInput" className='field__input' placeholder='e.g. +1 234 567 890'/>
              <span className="field__error-msg field__error-msg_hidden">This field is required</span>
            </div>
          </form>
        </StepContainer>
        <StepContainer isVisible={isCurrentStep(1)} containerTitle={steps[1].containerTitle} containerSubTitle={steps[1].containerSubTitle}>
          <PlanList selectedPeriod={selectedPeriod} selectNewPlan={handleSelectPlan}/>
          <PeriodSwitch changePeriod={handlePeriodSwitch} />
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
