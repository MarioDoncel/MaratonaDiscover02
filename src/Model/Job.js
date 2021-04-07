const Database = require('../db/config')

module.exports = {
    async get() {
        const db = await Database()
        let jobs = await db.all(`SELECT * FROM jobs`)
        jobs = jobs.map(job => {
                Object.keys(job).forEach(key => {
                    let newKey = key.replace('_','-')
                    job[newKey] = job[key]
                    if (newKey != key) {
                        delete job[key]
                    } 
                })
                return job
            } )
        db.close()
        return jobs
    },
    async update(newData, jobId){
        const db = await Database()
        await db.run(`
        UPDATE jobs SET
            name = "${newData.name}",
            daily_hours = ${newData["daily-hours"]},
            total_hours = ${newData["total-hours"]}
            WHERE id = ${jobId} 
        `)
        db.close()
    },
    async create(newJob){
        const db = await Database()
        db.run(`
        INSERT INTO jobs (
            name,
            daily_hours,
            total_hours,
            created_at 
        ) VALUES (
            "${newJob.name}",
            ${newJob["daily-hours"]},
            ${newJob["total-hours"]},
            ${newJob.created_at}
        )
        `)
        await db.close()
    },
    async delete(id){
        const db = await Database()
        db.run(`
        DELETE FROM jobs where id = ${id}
        `)
        db.close()
    },
}