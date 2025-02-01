import './NavigationButtons.css'

const NavigationButtons = () => {
  return (
    <section className="navigation-buttons">
        <button type="button" className="navigation-buttons__button navigation-buttons__button_back">Go Back</button>
        <button type="button" className="navigation-buttons__button navigation-buttons__button_forward">Next Step</button>
        <button type="button" className="navigation-buttons__button navigation-buttons__button_confirm">Confirm</button>
    </section>
  )
}

export default NavigationButtons