const port = 3000;
const express = require("express");
const serveStatic = require('serve-static');
const fs = require("fs");

const app = express();
const jsonParser = express.json();

function readFile(path, data) {
    return new Promise((resolve, reject) => fs.readFile(path, data, (err, usersRaw) => {
        if (err) reject(err);
        resolve(usersRaw);
    }))
}

function writeFile(path, arr) {
    return new Promise((resolve, reject) => fs.writeFile(path, arr, (err) => {
        if (err) reject(err);
        resolve();
    }))
}

app.use(`/as/id:userId`, serveStatic(__dirname + '/app', { 'index': ['tape.html'] }));

app.use("/a", serveStatic(__dirname + '/app', { 'index': ['registration.html'] }));

app.use("/", serveStatic(__dirname + '/app', { 'index': ['input.html'] }));

app.post("/input", jsonParser, async function (request, response) {
    const usersRaw = await readFile("file_JSON/инфа_о_клиентах.json", "utf8");
    const objJson = JSON.parse(usersRaw);
    const obj = request.body;
    const checkingValidity = objJson.some((item) => obj.email == item.email);

    if (checkingValidity) {
        let checkingPassword = false;
        objJson.forEach((item) => {
            if (item.email == obj.email && item.password == obj.password) {
                checkingPassword = true;
                obj.id = item.id;
            }
        })
        if (checkingPassword) {
            response.send(obj);
        } else if (!checkingPassword) {
            response.status(400).json({ error: 'Email или пароль введены неверно' })
        }
    } else {
        response.status(400).json({ error: 'Email или пароль введены неверно' })
    }
})

app.post("/register", jsonParser, async function (request, response) {
    const usersRaw = await readFile("file_JSON/инфа_о_клиентах.json", "utf8");
    const objJson = JSON.parse(usersRaw);
    const obj = request.body;

    obj.id = objJson.length + 1;
    const checkingValidity = objJson.some((item) => obj.email == item.email);

    if (checkingValidity) {
        response.status(400).json({ error: 'Данный email уже используется' })
    } else {
        objJson.push(obj);
        writeFile("file_JSON/инфа_о_клиентах.json", JSON.stringify(objJson));
        response.send(obj);
    }
})

app.get('/hallo', async function (request, response) {
    const offset = +request.query.offset;
    const objRaw = await readFile('file_JSON/картинки.json', 'utf8');
    const objJson = JSON.parse(objRaw);
    const objReady = { 'list': [] }
    let i = offset;
    for (i; i < Math.min(offset + 10, objJson.length); i++) {
        objReady.list.push(objJson[i]);
    }
    objReady.totalCount = objJson.length;
    response.send(objReady);
})

app.patch('/:userId/postLikes/:id', jsonParser, async function (request, response) {
    const id = request.params.id;
    const userId = request.params.userId;
    const objRaw = await readFile('file_JSON/картинки.json', 'utf8');
    const objJson = JSON.parse(objRaw);
    if (request.body.isLiked) {
        objJson[id - 1].isLiked.push(userId)
    }
    if (!request.body.isLiked) {
        objJson[id - 1].isLiked.forEach((item, index, arr) => {
            if (+item == userId) {
                delete arr[index];
            }
        });
    }
    writeFile('file_JSON/картинки.json', JSON.stringify(objJson));
    response.status(200);
})

app.listen(port, () => {
    console.log('сервер начал прослушивание');
});