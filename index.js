/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let createEmployeeRecord = function(attributes=[]) {
    return {
        firstName: attributes[0],
        familyName: attributes[1],
        title: attributes[2],
        payPerHour: attributes[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employees) {
    return employees.map(function(e){
        return createEmployeeRecord(e)
    })
}

let createTimeInEvent= function(timeStamp){
    let [date, time] = timeStamp.split(' ')
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(time, 10),
        date: date
    })
    return this
}

let createTimeOutEvent= function(timeStamp){
    let [date, time] = timeStamp.split(' ')
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time, 10),
        date: date
    })
    return this
}

let hoursWorkedOnDate = function(workDate) {
    let start = this.timeInEvents.find(function(e){
        return e.date === workDate
    })
    let end = this.timeOutEvents.find(function(e){
        return e.date === workDate
    })

    return (end.hour - start.hour)/100
}

let wagesEarnedOnDate = function(workDate) {
    let wages = hoursWorkedOnDate.call(this, workDate) * this.payPerHour
    return wages
}

let calculatePayroll = function(employees) {
    return employees.reduce(function(total,e){
        return (total + allWagesFor.call(e))
    }, 0)
}

let findEmployeeByFirstName = function(array, firstName){
    return array.find(function(employee){
        return employee.firstName === firstName
    })
}