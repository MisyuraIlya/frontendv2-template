import { FC, useState, KeyboardEvent } from 'react'
import { HourOfDay } from '../../../store/ScheduleCalendar.store'
import Modals from '../../Modals'

type DayOfWeek = 'ראשון' | 'שני' | 'שלישי' | 'רביעי' | 'חמישי' | 'שישי' | 'שבת'

interface MySheduleCalendarItemProps {
  event: IAgentObjective
  day: DayOfWeek
  hour: HourOfDay
  eventDuration: number
}

const MySheduleCalendarItem: FC<MySheduleCalendarItemProps> = ({
  event,
  eventDuration,
}) => {
  const [open, setOpen] = useState(false)

  const handleType = () => {
    switch (event.objectiveType) {
      case 'mix':
        return 'event_3'
      case 'task':
        return 'event_2'
      case 'visit':
      default:
        return 'event_1'
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setOpen((o) => !o)
    }
  }

  return (
    <>
      <div
        className={handleType()}
        style={{ height: `${eventDuration * 100}px` }}
        onClick={() => setOpen((o) => !o)}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-expanded={open}
      >
        <div className="entire">
          <div className="head">
            <div className="hour_card">{event.hourTo}</div>
            <div className="hour_card">{event.hourFrom}</div>
          </div>
          <div className="cont_block">
            <div className="heading">
              {event.subTusk ? (
                <h3>{event.subTusk.length} משולב</h3>
              ) : (
                <h3>{event.objectiveType === 'task' ? 'משימה' : 'ביקור'}</h3>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modals.Agent.Mission.Update item={event} open={open} setOpen={setOpen} />
    </>
  )
}

export default MySheduleCalendarItem
