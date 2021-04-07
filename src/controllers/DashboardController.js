const Job = require('../Model/Job')
const Profile = require('../Model/Profile')
const jobUtils = require('../Utils/jobUtils')


module.exports = {
    async index(req, res) {
        const jobs = await Job.get()
        const profile = await Profile.get()
        // let jobTotalHours = 0
        
        let statusCount = {
            progress:0,
            done: 0,
            total: jobs.length,
            freeHours: 0
            
        }
        const updatedJobs = jobs.map(job => {
            const remaining = jobUtils.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress'
            statusCount[status]++
            
            // jobTotalHours = status == 'progress' ? jobTotalHours += Number(job["daily-hours"]) : jobTotalHours
            // if(status == 'progress'){
            //     jobTotalHours += Number(job["daily-hours"])
            // }
            return {
                ...job,
                remaining,
                status,
                budget: jobUtils.calculateBudget(job, profile["value-hour"])
            }
        })

        statusCount.freeHours = profile['hours-per-day'] - updatedJobs.reduce((accumulator, job)=> {
            if(job.status == 'progress') {
               return accumulator + job["daily-hours"]
            }
            return accumulator 
        },0)
        // const freeHours = profile['hours-per-day'] - jobTotalHours
        return res.render('index', {jobs: updatedJobs, profile, statusCount})
    },
}
