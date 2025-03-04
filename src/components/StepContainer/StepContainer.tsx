import './StepContainer.css'

interface StepContainerProps{
  children: React.ReactNode;
  containerTitle: string;
  containerSubTitle: string;
  isVisible: boolean;
  hideContainerHeadings?: boolean
}

const StepContainer = ({children, containerTitle, containerSubTitle, isVisible, hideContainerHeadings}: StepContainerProps) => {
  return (
    <div className={`step-container ${(!isVisible) ? 'step-container_hidden':''}`}>
      {
        !hideContainerHeadings &&
        <>
          <h1 className='step-title'>{containerTitle}</h1>
          <h2 className='step-sub-title'>{containerSubTitle}</h2>
        </>
      }
      
      {children}
    </div>
  )
}

export default StepContainer