const port = 3000;
const express = require("express");
const serveStatic = require("serve-static");
const fs = require("fs");
const cookieParser = require('cookie-parser');
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

app.use(cookieParser("id"));

app.get("/", (request, response, next) => {
    if (request.cookies.id) return next();
    response.redirect("/b")
}, serveStatic(__dirname + "/app", { "index": ["tape.html"] }));

app.get("/b", (request, response, next) => {
    if (!request.cookies.id) return next();
    response.redirect("/")
}, serveStatic(__dirname + "/app", { "index": ["input.html"] }));

app.get("/a", (request, response, next) => {
    if (!request.cookies.id) return next();
    response.redirect("/")
}, serveStatic(__dirname + "/app", { "index": ["registration.html"] }))

app.use(serveStatic(__dirname + '/app'));

app.use("/", serveStatic(__dirname + "/app", { "index": ["tape.html"] }));

app.use("/a", serveStatic(__dirname + "/app", { "index": ["registration.html"] }));

app.use("/b", serveStatic(__dirname + "/app", { "index": ["input.html"] }));

app.post("/end", async function (request, response) {
    response.cookie("id", request.cookies.id, { maxAge: -1, httpOnly: true })
    response.redirect("/b")
})

app.post("/input", jsonParser, async function (request, response) {
    const usersRaw = await readFile("file_JSON/инфа_о_клиентах.json", "utf8");
    const objJson = JSON.parse(usersRaw);
    const obj = request.body;
    let index
    const checkingValidity = objJson.some((item) => obj.email === item.email && obj.password === item.password ? index = item.id : index);

    if (checkingValidity) {
        obj.id = index;
        response.cookie("id", index.toString(), { maxAge: 2.592e9, httpOnly: true }); //, httpOnly: true 
        response.send(obj);
    } else {
        response.status(400).json({ error: "Email или пароль введены неверно" })
    }
})

app.post("/register", jsonParser, async function (request, response) {
    const usersRaw = await readFile("file_JSON/инфа_о_клиентах.json", "utf8");
    const objJson = JSON.parse(usersRaw);
    const obj = request.body;

    obj.id = objJson.length + 1;
    const checkingValidity = objJson.some((item) => obj.email == item.email);

    if (checkingValidity) {
        response.status(400).json({ error: "Данный email уже используется" })
    } else {
        objJson.push(obj);
        writeFile("file_JSON/инфа_о_клиентах.json", JSON.stringify(objJson));
        response.cookie('id', obj.id.toString(), { maxAge: 2.592e9, httpOnly: true }); //, httpOnly: true 
        response.send(obj);
    }
})

app.get("/hallo", async function (request, response) {
    const offset = +request.query.offset;
    const objRaw = await readFile("file_JSON/картинки.json", "utf8");
    const objJson = JSON.parse(objRaw);
    const objReady = { "list": [] }
    const userId = request.cookies.id;
    let i = offset;
    let index = 0;

    for (i; i < Math.min(offset + 10, objJson.length); i++) {
        objReady.list.push(objJson[i]);
        objReady.list[index].isLiked = objJson[i].isLiked.some((item) => item == userId);
        index++;
    }
    objReady.totalCount = objJson.length;
    response.send(objReady);
})

app.patch("/postLikes/:id", jsonParser, async function (request, response) {
    console.log(request.body)
    const id = request.params.id;
    const userId = request.cookies.id;
    const objRaw = await readFile("file_JSON/картинки.json", "utf8");
    const objJson = JSON.parse(objRaw);

    if (request.body.isLiked) {
        objJson[id - 1].isLiked.push(userId)
    }
    if (!request.body.isLiked) {
        let index = objJson[id - 1].isLiked.indexOf(userId);
        if (index > -1) {
            objJson[id - 1].isLiked.splice(index, 1)
        }
    }
    writeFile("file_JSON/картинки.json", JSON.stringify(objJson));
    response.status(200);
})

app.listen(port, () => {
    console.log("сервер начал прослушивание");
});