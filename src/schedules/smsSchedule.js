const schedule = require("node-schedule");

const smsSchedule = () => {
  schedule.scheduleJob("*/5 * * * *", async function () {
    console.log("ok");
  });
};

module.exports = {
  smsSchedule,
};
