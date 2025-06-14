/* eslint-disable */
// @ts-nocheck
import {
  useMyScheduleCalendar,
} from '../../../store/ScheduleCalendar.store'
import Loader from '../../../utils/Loader'
import { ConvertHebrewNameDayToWeekDateByWeekName } from '../../../helpers/ScheduleCalendar.helper'
import { useMobile } from '../../../provider/MobileProvider'
import MySheduleCalendarItem from './MySheduleCalendarItem'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import useDataAgentMissions from '../../../hooks/agent/useAgentDataMissions'

const Schedule = () => {
  const { daysOfWeek, hoursOfDay, weekFrom, weekTo, loading } =
    useMyScheduleCalendar()
  const { isMobile } = useMobile()
  const { data } = useDataAgentMissions(weekFrom, weekTo)
  return (
    <>
      {!isMobile ? (
        <div className="weekly-scheduler myMarginBottom">
          <div className="header">
            <div className="cell img_time">
              <CalendarMonthIcon />
            </div>
            {daysOfWeek.map((day, index) => (
              <div key={day} className="cell day">
                <p>
                  {day} -{' '}
                  {ConvertHebrewNameDayToWeekDateByWeekName(index, weekFrom)}
                </p>
              </div>
            ))}
          </div>
          {/* <div className="body">
            {loading ? (
              <div className="myCenterAlign loaderHeightMin">
                <Loader />
              </div>
            ) : (
              hoursOfDay.map((hour, key1) => (
                <div key={key1} className="row">
                  <div className="cell hour">
                    <p>{hour}</p>
                  </div>
                  {daysOfWeek.map((day, key2) => (
                    <div key={`${key2}`} className="cell">
                      {data?.map((event, key3) => {
                        if (event.choosedDay == day && event.hourFrom == hour) {
                          const eventDuration =
                            hoursOfDay.indexOf(event.hourTo as HourOfDay) -
                            hoursOfDay.indexOf(event.hourFrom as HourOfDay)
                          return (
                            <MySheduleCalendarItem
                              key={key3}
                              event={event}
                              day={day}
                              hour={hour}
                              eventDuration={eventDuration}
                            />
                          )
                        }
                        return null
                      })}
                    </div>
                  ))}
                </div>
              ))
            )}
          </div> */}
        </div>
      ) : (
        <>{/* <MobileMyScheduleCalendar /> */}</>
      )}
    </>
  )
}

export default Schedule
