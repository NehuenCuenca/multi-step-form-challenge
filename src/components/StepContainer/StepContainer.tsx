import './StepContainer.css'

interface StepContainerProps{
  children: React.ReactNode;
  containerTitle: string;
  containerSubTitle: string;
  isVisible: boolean;
}

const StepContainer = ({children, containerTitle, containerSubTitle, isVisible}: StepContainerProps) => {
  return (
    <div className={`step-container ${(!isVisible) ? 'step-container_hidden':''}`}>
      <h1 className='step-title'>{containerTitle}</h1>
      <h2 className='step-sub-title'>{containerSubTitle}</h2>
      {children}
    </div>
  )
}

export default StepContainer