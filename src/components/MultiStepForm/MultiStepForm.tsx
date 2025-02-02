import './MultiStepForm.css'

const MultiStepForm = ({ children }: {children :React.ReactNode}) => {
  return (
    <article className="multi-step-container">
      {children}
    </article>
  )
}

export default MultiStepForm