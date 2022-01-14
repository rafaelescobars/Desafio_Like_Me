const http = require("http");
const fs = require("fs");
const url = require("url");

const {
  insertar,
  like,
  consultar
} = require("./consultas");

http
  .createServer(async (req, res) => {
    if (req.url == "/" && req.method === "GET") {
      res.setHeader("content-type", "text/html");
      const html = fs.readFile("index.html", "utf8", (err, html) => {
        res.end(html);
      });
    }

    if (req.url.startsWith("/post") && req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", async () => {
        const datos = Object.values(JSON.parse(body));
        const respuesta = await insertar(datos);
        res.end(JSON.stringify(respuesta));
      });
    }

    if (req.url.startsWith("/post") && req.method == "PUT") {

      const {
        id
      } = url.parse(req.url, true).query
      const respuesta = await like([id]);
      res.end(JSON.stringify(respuesta));
    };


    if (req.url.startsWith("/posts") && req.method === "GET") {
      const registros = await consultar();
      res.end(JSON.stringify(registros));
    }

  })
  .listen(3000, () => {
    console.log("Escuchando el puerto 3000.");
  });