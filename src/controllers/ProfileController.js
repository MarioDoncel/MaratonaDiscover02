const Profile = require('../Model/Profile')

module.exports = {
    async index(req, res) {
        return res.render('profile', {profile : await Profile.get()})
    },
    async update(req,res){
        const data = req.body
        const weeksPerYear = 52
        const weeksPerMonth = (weeksPerYear-data["vacation-per-year"])/12
        const weektotalHours = data["hours-per-day"] * data["days-per-week"]
        const monthlyTotalHours = weeksPerMonth * weektotalHours
        const valueHour = data["monthly-budget"] / monthlyTotalHours
        
        await Profile.update({
            ...await Profile.get(),
            ...req.body,
            "value-hour": valueHour
        }) 

        return res.redirect('/profile')
    }
}