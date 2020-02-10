const http = require('http');
const server = http.createServer();

server.on('request', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // 解决前后端跨域问题 表示接受跨域请求，然后再进行请求转发
    res.setHeader("Access-Control-Allow-Headers", "*");

    if (req.url === '/') {
        if (req.method === 'POST') {
            var chunk = '';
            req.on('data', data => {
                chunk = data;
            })
            req.on("end", () => { // 请求传参完成
                console.log(typeof chunk, 'chunk'); // 转换回JSON对象
                const { name, age } = JSON.parse(chunk);
                res.end(`Your name is: ${name}, age is: ${age}`);
                // res.end(chunk)
            })
            // console.log(chunk)
        } else {
            // 测试同步异步
            // setTimeout(() => {
            //     res.end('ajax request success!');
            // }, 5000)
            // console.log(req.url)
            res.end('ajax request success!');
        }
    }

    if (req.url === '/index') {
        console.log(req.url)
        res.end("index");
    }
})

server.listen(1314, () => {
    console.log("listening on port 1314!!!");
})