import urljoin from "url-join";

module.exports = function(RED) {
    function Send(config) {
        RED.nodes.createNode(this,config);
        const axios = require("axios");
        const node = this;

        node.on('input', async function(msg) {
          if(typeof msg.payload !== "object") {
            msg.payload = {
              title:config.name,
              message:''+msg.payload,
              priority:5
            }
          }
          try {
            const url = urljoin(config.server, "message", "?token=" + config.token);
            axios.post(url, msg.payload);
          } catch(e) {console.log(e);}
        });
    }
    RED.nodes.registerType("Gotify-Send",Send);
}
