const http = require("http");

const app = http.createServer((req, res) => {
  // 返回请求参数
  if (req.url === "/params") {
    const { method, url, httpVersion, headers } = req;
    return res.end(`${method} ${url} ${httpVersion} ${JSON.stringify(headers)}`);
  }

  // 返回HTML
  if (req.url === "/html") {
    const text = `<div style="color: red">hello world</div>`;
    return res.end(text);
  }

  // 返回JSON
  if (req.url === "/json") {
    const json = JSON.stringify({ name: "hello world" });
    return res.end(json);
  }

  // 监听GET请求
  if (req.url === "/get" && req.method === "GET") {
    return res.end("get");
  }

  // 监听POST请求
  if (req.url === "/post" && req.method === "POST") {
    return res.end("post");
  }

  // 监听PUT请求
  if (req.url === "/put" && req.method === "PUT") {
    return res.end("put");
  }

  // 监听DELETE请求
  if (req.url === "/delete" && req.method === "DELETE") {
    return res.end("delete");
  }

  // 监听PATCH请求
  if (req.url === "/patch" && req.method === "PATCH") {
    return res.end("patch");
  }

  // 获取Search参数 /search?username=juetan&password=123456
  if (req.url && /^\/search((\/|\?).*)?$/.test(req.url)) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const search = {};
    for (const [key, value] of url.searchParams) {
      search[key] = value;
    }
    return res.end(JSON.stringify(search));
  }

  // 获取Body参数
  if (req.url === "/body") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      res.end(body);
    });
    return;
  }

  // 获取JSON Body参数
  if (req.url === "/json-body") {
    let body = [];
    req.on("data", (chunk) => {
      body.push(...chunk);
    });
    req.on("end", () => {
      res.end(Buffer.from(body).toString());
    });
    return;
  }

  // 上传文件
  if (req.url === "/image") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(...chunk);
    });
    req.on("end", () => {
      const data = Buffer.from(body);
      res.setHeader("Content-Type", "image/png");
      res.end(data);
    });
    return;
  }

  // 设置Cookie
  if (req.url === "/cookie") {
    res.setHeader("Set-Cookie", "name=juetan; path=/; httpOnly");
    res.end("cookie");
    return;
  }

  // 获取Cookie
  if (req.url === "/get-cookie") {
    const cookie = req.headers.cookie;
    res.end(cookie);
    return;
  }

  // 设置响应头和状态码
  if (req.url === "/header") {
    res.setHeader("Content-Type", "text/html");
    res.setHeader("X-Foo", "bar");
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("header");
    return;
  }

  // 重定向
  if (req.url === "/redirect") {
    res.writeHead(302, { Location: "https://www.baidu.com" });
    res.end();
    return;
  }

  // 404
  if (req.url === "/404") {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
    return;
  }

  res.end("hello world" + req.url);
});

app.listen(3030, "0.0.0.0", () => {
  console.log("App is running at http://localhost:3030/");
});
