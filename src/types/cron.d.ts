interface ICron {
    id: number
    jobName: string
    cronTime: string
    lastFetchTime: string
    isActive: boolean
    status: boolean
    duration: number
    running: boolean
}