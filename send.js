module.exports = function(RED) {
    function Send(config) {
        RED.nodes.createNode(this,config);
        const axios = require("axios");
        const path = require("path-posix");
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
            const url = new URL(config.server);
            url.pathname = path.join(url.pathname, "message");
            url.searchParams.append("token", config.token);
            axios.post(url.toString(), msg.payload);
          } catch(e) {console.log(e);}
        });
    }
    RED.nodes.registerType("Gotify-Send",Send);
}
