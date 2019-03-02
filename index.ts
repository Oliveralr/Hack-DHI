// Importa las dependencias y configura el servidor http
const
  express:any = require('express'),
  request:any = require('request'),
  bodyParser:any = require('body-parser'),
  app = express().use(bodyParser.json()); // creates express http server

//PAGE_ACCESS_TOKEN = "EAADZC8apK3RUBAJD9rvLb8PsKcf5943zm9UFKU68Rq8IiZBLXcbzx5wsJt3ZCFRS4NYozPjay7uFENkjswMBBSbjnfxjWzCgKxtLGlt6sheMCrd4PxJfZCJrDoEKf3Mk5yrV7BZAncVZBs3huQIuzJIwLhxRMU1l92db3G0P2z9mCY4vAgLPRL"
//PAGE_ACCESS__TOKEN = EAAGAnxVDnckBAANDdt6yfiUXMUE6OLnbQPeOhLZB4OPb7mNj5e3FyWR9yqaiAMPdwYIAoxJIcEK49HwJswZCbXQTeCt5h2zqxP5skREE7sdIW4kdcxvmYgezeLRQqerSo0TzkZBJ8c6bJR64YuKiTu4D3nYZARe9BrZBZAwihUEWNWx5v9tQro0C4PnTwWLxgZD

const PAGE_ACCESS_TOKEN:string = process.env.PAGE_ACCESS_TOKEN;

// Configuración de puerto y servidor
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));

// Crea un endpoint WebHook
app.post('/webhook', (req, res) => {  
 
  let body = req.body;

  // Verifica si el evento es una subscripción
  if (body.object === 'page') {

    // Itera sobre cada entrada
    body.entry.forEach(function(entry) {

      // Obtén el mensaje. entry.messaging es un arreglo, pero
      // solo contendrá el mensaje, iniciamos con el índice 0
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);
      
      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      console.log('Sender PSID: ' + sender_psid);

      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);        
      } else if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback);
      }

    });

    // Manejador de Mensajes
    function handleMessage(sender_psid, received_message) {
      let response: object;
      
      // Verifíca si el mensaje contiene texto
      if (received_message.text == "hola") {    
        // Crea el payload para un mensaje de texto básico, which
        // será añadido al cuerpo del Send API
        response = {
          "text": `¡Me has despertado!, soy el GlassBot, ¿Qué necesitas?`
        }

        /*let basic_hello:Array<string> = ["hola","Hola","hey","Hey","Buenas","buenas","que onda",
        "¿Qué onda?","¿qué onda?","que onda","hi","Hi","buen dia","buenas tardes",
        "buenas noches","Buenas Noches","Buenas Tardes","ayuda","ola","Ola","whatsup",
        "whats up","oye","Oye","oie","Oie"];*/
      }

      else if(received_message.text === "muestrame"){
        sendMessageAPI(sender_psid);
        response = {
          "text": `Vendemos Lentes de muy buena calidad ;)`
        }
      }

      else if(received_message.text === "ver mas"){
        productSelectionOne(sender_psid);
        response = {
          "text": `Uff estos son buenos :)`
        }
      }

      else if(received_message.text === "otra compra"){
        productSelectionTwo(sender_psid);
      }
       
      else if (received_message.attachments) {
        // Obtén la URL del mensaje
        let attachment_url = received_message.attachments[0].payload.url;
        response = {
          "attachment": {
            "type": "template",
            "payload": {
              "template_type": "generic",
              "elements": [{
                "title": "¿Está imágen es correcta?",
                "subtitle": "Presiona el botón para escoger",
                "image_url": attachment_url,
                "buttons": [
                  {
                    "type": "postback",
                    "title": "¡Sí!",
                    "payload": "yes",
                  },
                  {
                    "type": "postback",
                    "title": "Nel",
                    "payload": "no",
                  }
                ],
              }]
            }
          }
        }
      }
      
      else if(received_message.text === "gracias"){
        response = {
          "text":"Estoy para servirte ;)"
        }
      }

      // Envía la respuesta
      callSendAPI(sender_psid, response); 
    
    }

  // Manejador de eventos messaging_postbacks 
      function handlePostback(sender_psid, received_postback) {

        let response: object;

        let payload = received_postback.payload;

        if(payload === 'yes'){
          response = {"text":"¡Cool!"}
        }
        else if(payload === 'no') {
          response = {"text":"Oops, envíala otra vez"}
        }

        callSendAPI(sender_psid, response)
      }

  // Sends response messages via the Send API
      function callSendAPI(sender_psid, response) {
        
        let request_body = {
          "recipient": {
            "id": sender_psid
          },
          "message": response
        }

        request({
          "uri": "https://graph.facebook.com/v2.6/me/messages",
          "qs": { "access_token": "EAADZC8apK3RUBADV6uDhSV563gXkkNIv57xnJCQMNZCptCrZAi7GqitRLtrvrvhRqOAOSPzZA7JTv2GPblxAHXVorZBlp3HTULvUSemdosyyq0PlW3y1TtfOzHZA1hyNAMsSBzM4h41Df8tZCSmLJVQj2ogEDZBjIrNb9099DLUy54641gdy3RSI" },
          "method": "POST",
          "json": request_body
          }, (err, res, body) => {
            if(!err){
              console.log("Message Sent!");
            } else {
              console.error("Unable to send message:" + err);
            }
        })
    }

    function sendMessageAPI(sender_psid){
      let request_body_two = {
        "recipient": {
          "id": sender_psid
        },
        "message": {
          "attachment":{
            "type":"image", 
            "payload":{
              "url":"https://cdn.shopify.com/s/files/1/0302/4437/products/gafas-sol-hawkers-one-otr01-g.progressive.jpg?v=1529678750", 
              "is_reusable":true
            }
         }
      }
    }

      request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": "EAADZC8apK3RUBADV6uDhSV563gXkkNIv57xnJCQMNZCptCrZAi7GqitRLtrvrvhRqOAOSPzZA7JTv2GPblxAHXVorZBlp3HTULvUSemdosyyq0PlW3y1TtfOzHZA1hyNAMsSBzM4h41Df8tZCSmLJVQj2ogEDZBjIrNb9099DLUy54641gdy3RSI" },
        "method": "POST",
        "json": request_body_two
        }, (err, res, body) => {
          if(!err){
            console.log("Message Sent!");
          } else {
            console.error("Unable to send message:" + err);
          }
      })
    }

    function productSelectionOne(sender_psid){
      let request_body_three = {
        "recipient": {
          "id": sender_psid
        },
        "message": {
          "attachment":{
            "type":"template", 
            "payload":{
              "template_type":"media",
              "elements": [
                {
                   "media_type": "image",
                   "url": "https://www.facebook.com/1494102097294193/photos/a.1495260733844996/1825749034129496/?type=3&theater", 
                   "buttons": [
                      {
                         "type": "web_url",
                         "url": "https://www.hawkersco.com/",
                         "title": "Nuevo Modelo 2019"
                      },
                      {
                         "type": "web_url",
                         "url": "https://www.hawkersco.com/",
                         "title": "Adquirir $549"
                      }
                   ]
                }
             ]
            }
         }
      }
    }

      request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": "EAADZC8apK3RUBADV6uDhSV563gXkkNIv57xnJCQMNZCptCrZAi7GqitRLtrvrvhRqOAOSPzZA7JTv2GPblxAHXVorZBlp3HTULvUSemdosyyq0PlW3y1TtfOzHZA1hyNAMsSBzM4h41Df8tZCSmLJVQj2ogEDZBjIrNb9099DLUy54641gdy3RSI" },
        "method": "POST",
        "json": request_body_three
        }, (err, res, body) => {
          if(!err){
            console.log("Message Sent!");
          } else {
            console.error("Unable to send message:" + err);
          }
      })
    }

    function productSelectionTwo(sender_psid){
      let request_body_four = {
        "recipient": {
          "id": sender_psid
        },
        "message": {
          "attachment":{
            "type":"template", 
            "payload":{
              "template_type":"media",
              "elements": [
                {
                   "media_type": "image",
                   "url": "https://www.facebook.com/1494102097294193/photos/a.1495260733844996/1707592979278436/?type=3&theater", 
                   "buttons": [
                      {
                         "type": "web_url",
                         "url": "https://www.hawkersco.com/",
                         "title": "Gafas de Sol Nuevas"
                      },
                      {
                        "type": "web_url",
                        "url": "https://www.hawkersco.com/",
                        "title": "Adquirelos - $499" 
                      }
                   ]
                }
             ]
            }
         }
      }
    }

      request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": "EAADZC8apK3RUBADV6uDhSV563gXkkNIv57xnJCQMNZCptCrZAi7GqitRLtrvrvhRqOAOSPzZA7JTv2GPblxAHXVorZBlp3HTULvUSemdosyyq0PlW3y1TtfOzHZA1hyNAMsSBzM4h41Df8tZCSmLJVQj2ogEDZBjIrNb9099DLUy54641gdy3RSI" },
        "method": "POST",
        "json": request_body_four
        }, (err, res, body) => {
          if(!err){
            console.log("Message Sent!");
          } else {
            console.error("Unable to send message:" + err);
          }
      })
    }

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

});

// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {

  // Your verify token. Should be a random string.
  let VERIFY_TOKEN:string = "gangster";
    
  // Parse the query params
  let mode:any = req.query['hub.mode'];
  let token:any = req.query['hub.verify_token'];
  let challenge:any = req.query['hub.challenge'];
    
  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
  
    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      
      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);      
    }
  }
});


//verify_token: gangster
//"localhost:1337/webhook?hub.verify_token=gangster&hub.challenge=CHALLENGE_ACCEPTED&hub.mode=subscribe"
//setting POST method: 
//curl -H "Content-Type: application/json" -X POST "localhost:1337/webhook" -d '{"object": "page", "entry": [{"messaging": [{"message": "IT WORKS"}]}]}'

//PAGE_ACCESS_TOKEN: EAADZC8apK3RUBADV6uDhSV563gXkkNIv57xnJCQMNZCptCrZAi7GqitRLtrvrvhRqOAOSPzZA7JTv2GPblxAHXVorZBlp3HTULvUSemdosyyq0PlW3y1TtfOzHZA1hyNAMsSBzM4h41Df8tZCSmLJVQj2ogEDZBjIrNb9099DLUy54641gdy3RSI