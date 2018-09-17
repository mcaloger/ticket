let config = require('../config/config')

let timeServices = {

    daysFromCurrentDate: (days) => {
        let result = new Date()
        result.setDate(result.getDate() + days)
        return result
    },
    getExpirationTimestamp: () => {
        return timeServices.daysFromCurrentDate(config.securityTimePolicyDays)
    }
}

module.exports = timeServices