module.exports = {
    remainingDays(job) {
        const remainingDays = Math.floor(job["total-hours"]/job["daily-hours"])
            const createdDate = new Date(job['created-at'])
            const dueDay = createdDate.getDate() + Number(remainingDays)
            const dueDateInMs = createdDate.setDate(dueDay)
            const timeDiffInMs = dueDateInMs - Date.now()
            const dayInMs = 1000*60*60*24
            const dayDiff = Math.floor(timeDiffInMs/dayInMs)
    
            return dayDiff
    },
    calculateBudget (job, valueHour) {
        return valueHour*job["total-hours"]
    } 
}