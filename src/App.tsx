import './App.css'
import MultiStepForm from './components/MultiStepForm/MultiStepForm'
import StepContainer from './components/StepContainer/StepContainer'
import { Step } from './types'

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
  return (
    <main>
      <MultiStepForm steps={steps}>
        <StepContainer containerTitle={'Un TITULO harcodeado'} containerSubTitle={'Un SUBtitulo harcodeado'}>
          Aca va el form
        </StepContainer>
      </MultiStepForm>
    </main>
  )
}

export default App
