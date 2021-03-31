const express = require('express')
const routes = express.Router()

const Profile = {
    data: {
        name: 'Mario',
        avatar: 'https://github.com/mariodoncel.png',
        "monthly-budget":3000,
        "hours-per-day":8,
        "days-per-week":5,
        "vacation-per-year":4,
        "value-hour": 75 
    },
    controllers: {
        index(req, res) {
            return res.render(views +'profile', {profile : Profile.data})
        },
        update(req,res){
            const data = req.body
            const weeksPerYear = 52
            const weeksPerMonth = (weeksPerYear/data["vacation-per-year"])/12
            const weektotalHours = data["hours-per-day"] * data["days-per-week"]
            const monthlyTotalHours = weeksPerMonth * weektotalHours
            data["value-hour"] = data["monthly-budget"] / monthlyTotalHours
            
            Profile.data = data
            return res.redirect('/profile')
        }
    }
}


const Job = {
    data: [
        {
            id:1,
            name: 'Pizzaria Guloso',
            "daily-hours": 2,
            "total-hours": 1,
            created_at: Date.now(),
            budget:4500
           
        },
        {
            id:2,
            name: 'OneTwo Project',
            "daily-hours": 3,
            "total-hours": 47,
            created_at: Date.now(),
            budget:4500
        }
    ],
    controllers: {
        index(req, res) {
            const updatedJobs = Job.data.map(job => {
                const remaining = Job.services.remainingDays(job)
                const status = remaining <= 0 ? 'done' : 'progress'
        
                return {
                    ...job,
                    remaining,
                    status,
                    budget: Job.services.calculateBudget(job, Profile.data["value-hour"])
                }
            })
            return res.render(views +'index', {jobs: updatedJobs})
        },
        create(req, res) {
            return res.render(views +'job')
        },
        save(req, res) {
            // const job = req.body
            // job.created_at  = Date.now()
            const lastId = Job.data[Job.data.length - 1]?.id || 0
        
            Job.data.push({
                id: lastId+1,
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],
                created_at: Date.now()
            })
            return res.redirect('/')
        },
        show(req, res) {
            const jobId = req.params.id
            const job = Job.data.find(job => job.id == jobId)
            if (!job) {
                return res.send('Job Not Found!')
            }
            job.budget = Job.services.calculateBudget(job, Profile.data["value-hour"])
            return res.render(views +'job-edit', {job})
        },
        update(req, res) {
            const jobId = req.params.id
            const job = Job.data.find(job => job.id == jobId)
            if (!job) {
                return res.send('Job Not Found!')
            }
            const updatedJob = {
                ...job,
                name: req.body.name,
                'total-hours':req.body["total-hours"] || 0,
                'daily-hours':req.body["daily-hours"] || 0,
            }
            Job.data = Job.data.map(job => {
                if (job.id == jobId) {
                    job = updatedJob
                }
                return job
            })
            return res.redirect(`/job/${jobId}`)
        },
        delete(req,res) {
            const jobId = req.params.id
            Job.data = Job.data.filter(job => job.id != jobId)
            
            return res.redirect(`/`)
        }
    },
    services: {
        remainingDays(job) {
            const remainingDays = Math.floor(job["total-hours"]/job["daily-hours"])
                const createdDate = new Date(job.created_at)
                const dueDay = createdDate.getDate() + Number(remainingDays)
                const dueDateInMs = createdDate.setDate(dueDay)
                const timeDiffInMs = dueDateInMs - Date.now()
                const dayInMs = 1000*60*60*24
                const dayDiff = Math.floor(timeDiffInMs/dayInMs)
        
                return dayDiff
        },
        calculateBudget : (job, valueHour) => valueHour*job["total-hours"]
    }
}

const views = __dirname + "/views/"
routes.get('/', Job.controllers.index)
routes.get('/index', (req, res) => res.redirect('/'))
routes.get('/job', Job.controllers.create)
routes.get('/job/:id', Job.controllers.show )
routes.get('/profile', Profile.controllers.index )

routes.post('/job', Job.controllers.save)
routes.post('/profile', Profile.controllers.update )
routes.post('/job/:id', Job.controllers.update )
routes.post('/job/delete/:id', Job.controllers.delete )

module.exports = routes