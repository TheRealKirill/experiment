const port = 4000;
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const app = express();
const jsonParser = express.json();

function readFile(path, data) {
  return new Promise((resolve, reject) =>
    fs.readFile(path, data, (err, usersRaw) => {
      if (err) reject(err);
      resolve(usersRaw);
    })
  );
}

function writeFile(path, arr) {
  return new Promise((resolve, reject) =>
    fs.writeFile(path, arr, err => {
      if (err) reject(err);
      resolve();
    })
  );
}

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser("id"));

app.get("/portionPosts", async function(request, response) {
  const number = +request.query.number;
  const state = await readFile("file_JSON/store.json", "utf8");
  const objJson = JSON.parse(state);
  const posts = objJson.posts;
  const infoComments = objJson.infoComments;
  const userId = request.cookies.id;
  let objReady = {
    posts: [],
    infoComments: infoComments,
    userId: userId,
    totalCount: posts.length
  };
  let i = number;

  for (i; i < Math.min(number + 3, posts.length); i++) {
    objReady.posts.push(posts[i]);
  }
  response.send(objReady).status(200);
});

app.post("/entrance", jsonParser, async function(request, response) {
  const usersRaw = await readFile("file_JSON/инфа_о_клиентах.json", "utf8");
  const objJson = JSON.parse(usersRaw);
  const obj = request.body;
  let index;
  const checkingValidity = objJson.some(item =>
    obj.email === item.email && obj.password === item.password
      ? (index = item.id)
      : index
  );

  if (checkingValidity) {
    obj.id = index;
    response.cookie("id", obj.id.toString(), {
      maxAge: 2.592e9,
      httpOnly: true
    });
    response.send(obj);
  } else {
    response.status(400).send({ error: "Email или пароль введены неверно" });
  }
});

app.post("/registration", jsonParser, async function(request, response) {
  const usersRaw = await readFile("file_JSON/инфа_о_клиентах.json", "utf8");
  const objJson = JSON.parse(usersRaw);
  const obj = request.body;
  const checkingValidity = objJson.some(item => obj.email == item.email);
  obj.id = objJson.length + 1;

  if (checkingValidity) {
    response.status(400).json({ error: "Данный email уже используется" });
  } else {
    objJson.push(obj);
    writeFile("file_JSON/инфа_о_клиентах.json", JSON.stringify(objJson));
    response.cookie("id", obj.id.toString(), {
      maxAge: 2.592e9,
      httpOnly: true
    });
    response.send(obj);
  }
});

app.get("/end", async function(request, response) {
  response.cookie("id", request.cookies.id, { maxAge: -1, httpOnly: true });
  response.send(true);
});

app.get("/getCookies", async function(request, response) {
  const id = request.cookies.id;
  response.send(id);
});

app.patch("/postLikes", jsonParser, async function(request, response) {
  const postId = request.query.postId;
  const userId = request.cookies.id;
  const liked = request.body.liked;
  const objRaw = await readFile("file_JSON/store.json", "utf8");
  const objStateJson = JSON.parse(objRaw);
  let newState;

  if (liked) {
    newState = objStateJson.posts.map(item => {
      if (item.postId == postId) {
        const newLikedArr = [...item.infoPost.liked];
        newLikedArr.splice(newLikedArr.indexOf(userId), 1);
        return {
          ...item,
          infoPost: {
            ...item.infoPost,
            liked: newLikedArr
          }
        };
      }
      return item;
    });
  } else if (!liked) {
    newState = objStateJson.posts.map(item => {
      if (item.postId == postId) {
        const newLikedArr = [...item.infoPost.liked, userId];
        return {
          ...item,
          infoPost: {
            ...item.infoPost,
            liked: newLikedArr
          }
        };
      }
      return item;
    });
  }

  writeFile(
    "file_JSON/store.json",
    JSON.stringify({
      ...objStateJson,
      posts: newState
    })
  );

  response.send({ postId, userId });
  response.status(200);
});

app.patch("/setnewcomment", jsonParser, async function(request, response) {
  const text = request.body.text;
  const idPosts = request.body.idPosts;
  const commentId = request.body.commentId;
  const userId = request.cookies.id;
  const objRaw = await readFile("file_JSON/store.json", "utf8");
  const objStateJson = JSON.parse(objRaw);
  const newInfoComments = {
    ...objStateJson.infoComments,
    [commentId]: {
      id: commentId,
      userId: userId,
      text: text
    }
  };

  const newPospsList = objStateJson.posts.map(item => {
    if (item.postId == idPosts) {
      return {
        ...item,
        infoPost: {
          ...item.infoPost,
          comments: [...item.infoPost.comments, commentId]
        }
      };
    }
    return item;
  });

  writeFile(
    "file_JSON/store.json",
    JSON.stringify({
      posts: newPospsList,
      infoComments: newInfoComments
    })
  );

  response.send("+");
  response.status(200);
});

app.listen(port, () => {
  console.log("сервер начал прослушивание");
});
