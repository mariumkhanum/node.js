const dialogflow = require('@google-cloud/dialogflow');
const { WebhookClient, Suggestion } = require('dialogflow-fulfillment');
const express = require("express")
const cors = require("cors");

const app = express();
app.use(express.json())
app.use(cors());

const PORT = process.env.PORT || 5000;

app.post("/webhook", async (req, res) => {
    var id = (res.req.body.session).substr(43);
    console.log(id)
    const agent = new WebhookClient({ request: req, response: res });

    function hi(agent) {
        console.log(`intent  => hi `);
        agent.add("Hi there, I'm virtual asistant of Muneera Marium.")
        agent.add("Tell me how can i help you.")
    }

  function Pakistan(agent) {
        console.log(`intent  => Pakistan `);
        agent.add("Pakistan zindabad.")
    }

    function Province(agent) {
        const { number , date , email} = agent.parameters;
       agent.add("There are four province in pakistan.")
    }

    function ProvinceName(agent) {
        console.log(`intent  => Province Name `);
        agent.add("Sindh, Blochistan, Panjab, KPK.")
    }

    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', hi); 
    intentMap.set('Default Fallback Intent', sendNotes);
    intentMap.set('Pakistan', Pakistan);
    intentMap.set('ProvinceName', ProvinceName);

    agent.handleRequest(intentMap);
})
app.listen(PORT, () => {
    console.log(`server is running  http://localhost:${PORT}`);
});