const http = require('http');
const handle = require('./controller/router');
const url = require('url')
const NotFoundRouting = require('./controller/handle/notFoundRouting')

function getURL(req) {
    const urlParse = url.parse(req.url, true);
    const pathName = urlParse.pathname;
    return pathName.split('/');
}

const sever = http.createServer((req, res) => {
    const arrPath = getURL(req);
    let trimPath = '';
    if (arrPath.length > 2) {
        trimPath = arrPath[1] + "/" + arrPath[2]
    } else {
        trimPath = arrPath[arrPath.length - 1];
    }
    let chosenHandle;
    if (typeof handle[trimPath] === 'undefined') {
        chosenHandle = NotFoundRouting.showNotFound;
    } else {
        chosenHandle = handle[trimPath];
    }
    chosenHandle(req, res)
});
sever.listen(8080, () => {
    console.log('Sever is running at 8080 !!');
});