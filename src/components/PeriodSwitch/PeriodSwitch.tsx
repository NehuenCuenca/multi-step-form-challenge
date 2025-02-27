import { ChangeEventHandler, MutableRefObject, useEffect, useRef } from 'react';
import './PeriodSwitch.css'
import { Period } from '../../types';

interface PeriodSwitchProps {
  changePeriod: (period: string | null) => void;
}

const PeriodSwitch = ({ changePeriod }: PeriodSwitchProps) => {
  const periodSwitchEl = useRef<MutableRefObject>(null)

  const switchHandler = (event: ChangeEventHandler<HTMLInputElement>) => {
    const periodsNameEls: Array<HTMLLabelElement> = Array.from(periodSwitchEl.current.querySelectorAll('.period-name'))
    const previousActivePeriodName = periodsNameEls.find( (element): HTMLLabelElement => element.classList.contains('period-name_active'))
    const activePeriodNameEl = periodsNameEls[Number(event.target.checked)]
    previousActivePeriodName.classList.remove('period-name_active')
    activePeriodNameEl.classList.add('period-name_active')
    
    changePeriod( activePeriodNameEl.getAttribute('data-period') )
  }

  useEffect(() => {
    const switchCheckboxEl = periodSwitchEl.current.querySelector('.switch__checkbox')
    const defaultCheckedPeriod = (switchCheckboxEl.checked) ? Period.yearly : Period.monthly
    changePeriod(defaultCheckedPeriod)
    
    const periodsNameEls: Array<HTMLLabelElement> = Array.from(periodSwitchEl.current.querySelectorAll('.period-name'))
    const activePeriodNameEl = periodsNameEls[Number(switchCheckboxEl.checked)]
    activePeriodNameEl.classList.add('period-name_active')
  }, [])


  return (
    <div className='periodSwitch' ref={periodSwitchEl}>
      <label className="period-name" htmlFor='switchCheckbox' data-period={Period.monthly}>Monthly</label>
      <label className="switch">
        <input type="checkbox" className='switch__checkbox' id='switchCheckbox' onChange={switchHandler}  /* checked */ />
        <span className="switch__slider switch__slider_round"></span>
      </label>
      <label className="period-name" htmlFor='switchCheckbox' data-period={Period.yearly}>Yearly</label>
    </div>
  )
}

export default PeriodSwitch