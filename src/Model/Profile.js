
let data= {
    name: 'Mario',
    avatar: 'https://github.com/mariodoncel.png',
    "monthly-budget":3000,
    "hours-per-day":8,
    "days-per-week":5,
    "vacation-per-year":4,
    "value-hour": 75 
}


module.exports={
    get() {
        return data
    },
    update(newData){
        data = newData
    }
}