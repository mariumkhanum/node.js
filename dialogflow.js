const dialogflow = require('@google-cloud/dialogflow');
const { WebhookClient, Suggestion } = require('dialogflow-fulfillment');
const express = require("express")
const cors = require("cors");

const app = express();
app.use(express.json())
app.use(cors());

const PORT = process.env.PORT || 8080;

app.post("/webhook", async (req, res) => {
    var id = (res.req.body.session).substr(43);
    console.log(id)
    const agent = new WebhookClient({ request: req, response: res });

    function hi(agent) {
        console.log(`intent  => hi `);
        agent.add("Hi there, I'm virtual asistant of Muneera Marium.")
        agent.add("Tell me how can i help you.")
    }

  function courses(agent) {
        console.log(`intent  => courses `);
        agent.add("What can i do?")
    }

    function sendNotes(agent) {
        const { number , date , email} = agent.parameters;
       agent.add("All subject notes are available.")
    }

    function firstyear(agent) {
        console.log(`intent  => courses `);
        agent.add("What can i do?")
    }

    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', hi); 
    intentMap.set('Default Fallback Intent', sendNotes);
    intentMap.set('courses', courses);
    intentMap.set('firstyear', firstyear);

    agent.handleRequest(intentMap);
})
app.listen(PORT, () => {
    console.log(`server is running  http://localhost:${PORT}`);
});