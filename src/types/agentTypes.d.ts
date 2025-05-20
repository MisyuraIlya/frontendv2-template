interface IAgentTaget {
  id: number | null
  agent: { id: string } | IUser | string | null
  month: string
  year: string | null
  currentValue: number | null
  targetValue: number | null
  isCompleted: boolean | null
}

type objectiveTypes = 'visit' | 'task' | 'mix'

interface IAgentObjective {
  id?: number
  agent: IUser | null
  client?: IUser | null
  isCompleted: boolean
  completedAt: strin
  title: string
  description: string
  week1: boolean
  week2: boolean
  week3: boolean
  week4: boolean
  hourFrom: string
  hourTo: string
  choosedDay: string
  date: string
  createdAt: string
  updatedAt: string
  objectiveType: objectiveTypes
  subTusk: IAgentObjective[]
}

interface IAgentsStatistic {
  lines: IAgentProfile[]
  total: number
  totalOrders: number
  averageTotal: number
}

interface IAgentProfile {
  agentName: string
  agentExtId: string
  totalPriceMonth: number
  total: number
  totalOrders: number
  averageBasket: number
  totalClients: number
  monthlyTotals: IMonthlyTotals[]
  totalPriceDay: number
  totalDayCount: number
  totalMonthCount: number

  totalMissions: number
  targetPrecent: number
}

interface IMonthlyTotals {
  month: number
  total: number
  monthTitle: string
  target: number
  succeed: boolean | null
}

interface IPerformanceInfo {
  totalOrderSum: number
  dailySalesSum: number
  dailySalesQuantity: number
  minDate: string
  maxDate: string
  ordersQuantity: number
  monthsQuantityByOrderDates: number
  monthlyAverage: number
  clientsAssigned: number
  monthlySalesSum: number
  targetPercentage: number
}
type typeTask = 'visit' | 'objective'

interface IAgentTask {
  agentId: string
  uniqueId: number
  typeTask: typeTask
  dayOfWeek: string
  date: string
  endHour: string
  startHour: string
  typeId: string
  type: string
  mission: string
  visit: string
  idDocument: number
  tableName: string
  description: string
  completedDate: string | null
  completed: boolean
}

interface ITodayObjectives {
  visitsTotal: number
  visitsCompleted: number
  objectiveTotal: number
  objectiveCompleted: number
}

interface IGoals {
  name: string
  value: number
  strokeColor: string
}

interface IMonthAgenthSale {
  y: number
  x: string
  goals: IGoals[]
}

interface IScheduleCalendar {
  agentId: number
  uniqueId: number
  dayOfWeek: string
  date: string
  endHour: string
  startHour: string
  typeId: number
  type: typeTask
  mission: string
  visit: string
  idDocument: number
  tableName: string
  description: string
  completedDate: string
  completed: boolean
  subTusk: IAgentTask[]
}
