const Database = require('../db/config')

module.exports={
    async get() {
        const db = await Database()
        const profile = await db.get(`SELECT * FROM profile WHERE id = 1`)
        
        await db.close()
        return {
            name: profile.name,
            avatar: profile.avatar,
            "monthly-budget": profile.monthly_budget,
            "days-per-week": profile.days_per_week,
            "hours-per-day": profile.hours_per_day,
            "vacation-per-year": profile.vacation_per_year,
            "value-hour": profile.value_hour
        }
    },
    async update(newData){
        const db = await Database()
        await db.run(`
        UPDATE profile SET
            name = "${newData.name}",
            avatar = "${newData.avatar}",
            monthly_budget= ${newData["monthly-budget"]},
            days_per_week= ${newData["days-per-week"]},
            hours_per_day= ${newData["hours-per-day"]},
            vacation_per_year= ${newData["vacation-per-year"]},
            value_hour= ${newData["value-hour"]} 
        `)

        await db.close()
    }
}