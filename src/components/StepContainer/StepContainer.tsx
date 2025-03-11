import { useEffect, useRef } from 'react';
import './StepContainer.css'

interface StepContainerProps{
  children: React.ReactNode;
  containerTitle: string;
  containerSubTitle: string;
  isVisible: boolean;
  hideContainerHeadings?: boolean
}

const StepContainer = ({children, containerTitle, containerSubTitle, isVisible, hideContainerHeadings}: StepContainerProps) => {
  const stepContainerElement = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if( !isVisible ){
      stepContainerElement.current?.addEventListener('click', (event) => {
        const target = event.target as Element;
        if (target.closest('.step-container_hidden')) {
          event.stopPropagation();
          event.preventDefault();
          return false;
        }
      }, true)
    }
  }, [isVisible])

  return (
    <div ref={stepContainerElement} className={`step-container ${(!isVisible) ? 'step-container_hidden':''}`}>
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