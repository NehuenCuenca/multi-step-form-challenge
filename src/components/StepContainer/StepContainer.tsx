import './StepContainer.css'

interface StepContainerProps{
    children: React.ReactNode;
    containerTitle: string;
    containerSubTitle: string;
}

const StepContainer = ({children, containerTitle, containerSubTitle}: StepContainerProps) => {
  return (
    <div>
      <h1>{containerTitle}</h1>
      <h2>{containerSubTitle}</h2>
      {children}
    </div>
  )
}

export default StepContainer