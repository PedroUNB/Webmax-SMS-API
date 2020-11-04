const schedule = require("node-schedule");
const Campaign = require("../app/schemas/Campaing")
const Contact = require("../app/schemas/Contacts")

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const waitFor = (ms) => new Promise((r) => setTimeout(r, ms));

const send_sms = (line, nome, numero) => {
  const sms = new HttpSms("http://172.16.99.13", line, "admin", "admin", {
    waitForStatus: true,
  });
  const message = `CLARO: ${nome}, pré aprovado para voce claro controle 8 gigas + ligacoes, Whatsapp e apps ilimitados! A partir de 44,90! Ligue 0800 591 1029 e ative!`
  sms.send(numero, message)
      .then(() => {
        Campaign.create({
          message,
          phone: numero,
          name: nome
        })
      })
      .catch(() => {
        console.log("error");

        Campaign.create({
          message,
          phone: numero,
          name: nome,
          status: "error"
        })
      });
};

const smsSchedule = () => {
  schedule.scheduleJob("*/1 * * * *", async function () {
    const contacts = await Contact.find()


    const forNumber = () => {
      asyncForEach(contacts, async(num) => {
        const line = Math.floor(Math.random() * (16 - 1) + 1)
        await waitFor(15000);
        send_sms(line, num["name"], num["phone"])
      })
    }

    forNumber()
  });
};

module.exports = {
  smsSchedule,
};
