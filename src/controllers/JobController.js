const jobUtils = require('../Utils/jobUtils')
const Job = require('../Model/Job')
const Profile = require('../Model/Profile')

module.exports= {
    create(req, res) {
        return res.render('job')
    },
    async save(req, res) {
        await Job.create({        
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_at: Date.now()
        })
        return res.redirect('/')
    },
    async show(req, res) {
        const jobId = req.params.id
        const profile = await Profile.get()
        const jobs = await Job.get()
        const job = jobs.find(job => job.id == jobId)
        if (!job) {
            return res.send('Job Not Found!')
        }
        job.budget = jobUtils.calculateBudget(job, profile["value-hour"])
        return res.render('job-edit', {job})
    },
    async update(req, res) {
        const jobId = req.params.id
        
        const updatedJob = {
            name: req.body.name,
            'total-hours':req.body["total-hours"] || 0,
            'daily-hours':req.body["daily-hours"] || 0,
        }
        
        await Job.update(updatedJob, jobId)
        return res.redirect(`/job/${jobId}`)
    },
    async delete(req,res) {
        const jobId = req.params.id
        await Job.delete(jobId)
        return res.redirect(`/`)
        
    }
}