import moment from 'moment'

interface OptionType {
  value: string
  label: string
}

export const datesHandler: OptionType[] = [
  {
    value: (moment().year() - 1).toString(),
    label: (moment().year() - 1).toString(),
  },
  { value: moment().year().toString(), label: moment().year().toString() },
  {
    value: (moment().year() + 1).toString(),
    label: (moment().year() + 1).toString(),
  },
]
