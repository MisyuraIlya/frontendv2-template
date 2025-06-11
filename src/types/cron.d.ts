interface ICron {
    id: number
    jobName: string
    label: string
    cronTime: string
    lastFetchTime: string
    isActive: boolean
    status: boolean
    duration: number
    running: boolean
}