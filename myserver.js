express = require("express");
let app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Contorl-Allow-Methods",
    "GET,POST,OPTIONS,PUT,PATCH,DELETE,HEAD"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
});
var port = process.env.PORT || 2410;
app.listen(port, () => console.log(`Node app listening on port ${port} !`));
let axios = require("axios");

app.post("/myserver", async function (req, res) {
  let rep = req.body;
  let {
    data = {},
    method,
    fetchUrl,
    headerkey1 = "",
    headervalue1 = "",
    headerkey2 = "",
    headervalue2 = "",
    headerkey3 = "",
    headervalue3 = "",
  } = rep;

  let header = {};
  headerkey1 ? (header[headerkey1] = headervalue1) : {};
  headerkey2 ? (header[headerkey2] = headervalue2) : {};
  headerkey3 ? (header[headerkey3] = headervalue3) : {};
  let headers = header;
  if (method === "GET") {
    console.log("GET Called");
    try {
      let response = await axios.get(fetchUrl, {
        headers: headers,
      });
      console.log(response.data);
      let data = Number.isInteger(response.data)
        ? response.data.toString()
        : response.data;
      console.log(data);
      res.send(data);
    } catch (error) {
      if (error.response) {
        console.log("err");
        let { status, statusText } = error.response;
        console.log("error", status, statusText);
        res.status(status).sendStatus(statusText);
      } else {
        console.log("else err");
        res.status(404).send(error);
      }
    }
  } else if (method === "POST") {
    try {
      let body = data;
      console.log(body);
      let response = await axios.post(fetchUrl, body, {
        headers: headers,
      });
      console.log("resp Post", response.data);
      res.send(response.data);
    } catch (error) {
      if (error.response) {
        let { status, statusText } = error.response;
        console.log("Error", status, statusText);
        res.status(status).send(statusText);
      } else res.status(404).send(error);
    }
  } else if (method === "PUT") {
    console.log("PUT Called");
    try {
      let body = data;
      console.log(body);
      let response = await axios.put(fetchUrl, body, {
        headers: headers,
      });
      console.log("resp", response.data);
      res.send(response.data);
    } catch (error) {
      if (error.response) {
        let { status, statusText } = error.response;
        console.log("Error", status, statusText);
        res.status(status).send(statusText);
      } else res.status(404).send(error);
    }
  } else if (method === "DELETE") {
    console.log("DELETE Called");
    try {
      let body = data;
      console.log(body);
      let response = await axios.delete(fetchUrl, {
        headers: headers,
      });
      console.log("resp", response.data);
      res.send(response.data);
    } catch (error) {
      if (error.response) {
        let { status, statusText } = error.response;
        console.log("Error", status, statusText);
        res.status(status).send(statusText);
      } else res.status(404).send(error);
    }
  }
});
