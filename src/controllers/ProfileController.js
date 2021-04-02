const Profile = require('../Model/Profile')

module.exports = {
    index(req, res) {
        return res.render('profile', {profile : Profile.get()})
    },
    update(req,res){
        const data = req.body
        const weeksPerYear = 52
        const weeksPerMonth = (weeksPerYear-data["vacation-per-year"])/12
        const weektotalHours = data["hours-per-day"] * data["days-per-week"]
        const monthlyTotalHours = weeksPerMonth * weektotalHours
        const valueHour = data["monthly-budget"] / monthlyTotalHours
        
        Profile.update({
            ...Profile.get(),
            ...req.body,
            "value-hour": valueHour
        }) 

        return res.redirect('/profile')
    }
}