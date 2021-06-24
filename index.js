const fs = require('fs');
const http = require('http');
const url = require('url');
const { replaceTemplate } = require('./modules/functional');
require('dotenv').config();

const data = fs.readFileSync(__dirname + '/data/data.json', 'utf-8');
const templateOverview = fs.readFileSync(
    __dirname + '/templates/html/template-overview.html',
    'utf-8'
);
const templateProducts = fs.readFileSync(
    __dirname + '/templates/html/template-products.html',
    'utf-8'
);
const templateCard = fs.readFileSync(
    __dirname + '/templates/html/template-card.html',
    'utf-8'
);
const dataObject = JSON.parse(data);

const server = http.createServer((req, res) => {
    const { query, pathname: pathName } = url.parse(req.url, true);

    // product path
    if (pathName === '/product') {
        const product = dataObject[query.id];
        const output = replaceTemplate(templateProducts, product);
        res.writeHead(200, { 'Content-type': 'text/html' }).end(output);
    }

    // overview path
    else if (pathName === '/' || pathName === '/overview') {
        const dataCard = dataObject
            .map((item) => replaceTemplate(templateCard, item))
            .join('');
        const output = templateOverview.replace(/{{PRODUCT_CARD}}/g, dataCard);
        // fs.writeFileSync("./output.html", dataCard, "utf-8");
        res.writeHead(200, { 'Content-type': 'text/html' }).end(output);
    }

    // api
    else if (pathName === '/api') {
        res.writeHead(200, { 'Content-type': 'application/json' }).end(data);
    }

    // if error occured
    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hehe lol',
        }).end('<h1>Errrroooooorrr 🧨</h1>');
    }
});

server.listen(process.env.PORT, process.env.localhost, () =>
    console.log(
        `sever listening at port http://${process.env.localhost}:${process.env.PORT}`
    )
);
