const jobUtils = require('../Utils/jobUtils')
const Job = require('../Model/Job')
const Profile = require('../Model/Profile')

module.exports= {
    create(req, res) {
        return res.render('job')
    },
    save(req, res) {
        const jobs = Job.get()
        const lastId = jobs[jobs.length - 1]?.id || 0
    
        jobs.push({
            id: lastId+1,
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_at: Date.now()
        })
        Job.update(jobs)
        return res.redirect('/')
    },
    show(req, res) {
        const jobId = req.params.id
        const profile = Profile.get()
        const jobs = Job.get()
        const job = jobs.find(job => job.id == jobId)
        if (!job) {
            return res.send('Job Not Found!')
        }
        job.budget = jobUtils.calculateBudget(job, profile["value-hour"])
        return res.render('job-edit', {job})
    },
    update(req, res) {
        const jobId = req.params.id
        let jobs = Job.get()
        const job = jobs.find(job => job.id == jobId)
        if (!job) {
            return res.send('Job Not Found!')
        }
        const updatedJob = {
            ...job,
            name: req.body.name,
            'total-hours':req.body["total-hours"] || 0,
            'daily-hours':req.body["daily-hours"] || 0,
        }
        jobs = jobs.map(job => {
            if (job.id == jobId) {
                job = updatedJob
            }
            return job
        })
        Job.update(jobs)
        return res.redirect(`/job/${jobId}`)
    },
    delete(req,res) {
        let jobs = Job.get()
        const jobId = req.params.id
        jobs = jobs.filter(job => job.id != jobId)
        Job.update(jobs)
        return res.redirect(`/`)
        // Job.delete(jobId)
    }
}