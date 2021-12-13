const cron = require("node-cron");

module.exports = {
    callAtSpecificTime: () => {
        cron.schedule("0 9,15,22 * * *", () => {
            
            // Get Currunt Time
            const today = new Date();
            const date = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`;
            const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
            const dateTime = `${date} - ${time}`;
            
            console.log(`Cron will Run at 9am, 3pm and 10pm: ${dateTime}`);
        });
    },
    callEveryHour: () => {
        cron.schedule("0 * * * *", () => {
            console.log("Cron will Call every Hour.");
        });
    }
}

//  CRON Sedule

// ┌────────────── second (optional) 0-59
// │ ┌──────────── minute            0-59
// │ │ ┌────────── hour              0-23
// │ │ │ ┌──────── day of month      1-31
// │ │ │ │ ┌────── month             1-12 (or names)
// │ │ │ │ │ ┌──── day of week       0-7 (or names, 0 or 7 are sunday)
// │ │ │ │ │ │
// │ │ │ │ │ │
// * * * * * *
