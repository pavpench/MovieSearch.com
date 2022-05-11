const http = require("http");
const url = require("url");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer(async (req, res) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    "Access-Control-Allow-Max-Age": 259200,
    "Content-Type": "application/json",
  };
  //access request.params data
  let requestParamsObject = url.parse(req.url, true).query;

  let requestParams =
    (requestParamsObject.s ? `&s=${requestParamsObject.s}` : "") +
    (requestParamsObject.y ? `&y=${requestParamsObject.y}` : "");

  console.log(requestParams);

  //access request.body data
  // let bufferData = [];
  // for await (const chunk of req) {
  //   bufferData.push(chunk);
  // }
  // let requestBody = bufferData.toString();

  let apiRequestQuery =
    `http://www.omdbapi.com/?apikey=5945647d` + requestParams;

  http.get(apiRequestQuery, (resp) => {
    console.log("request sent to api response:", resp);
    if (resp.statusCode === 200) {
      res.writeHead(200, headers);
      resp
        .on("data", (data) => {
          console.log(data.toString());
          res.write(data.toString());
        })
        .on("error", (err) => {
          console.log("err:", err, message);
          res.write(JSON.stringify(err));
        })
        .on("end", () => {
          console.log(apiRequestQuery);
          console.log("response ended");
          res.end();
        });
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
