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
    error: string
}

interface ICronSettings {
    id: number,
    cronTime: string
    isActive: boolean
}