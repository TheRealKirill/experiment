const section = document.querySelector("section");
let offset = 0;
let totalCount;
let observer;
let target;
const userId = String(window.location)
    .split('/')[4]
    .slice(2)

const imgs = async function () {
    const response = await fetch(`/hallo?offset=${offset}`, {
        method: "GET"
    });
    offset += 10;
    if (target) observer.unobserve(target)
    const obj = await response.json();
    totalCount = obj.totalCount;

    obj.list.forEach((item) => {
        let post = document.createElement("div");
        post.className = "post";
        section.append(post);
        let content = document.createElement("div");
        content.className = "content";
        post.append(content);
        let data = document.createElement("div");
        data.className = "content-data";
        let theBigDay = new Date(+item.data * 1000);
        data.textContent = `${theBigDay.getDate()}.${theBigDay.getMonth() + 1}.${theBigDay.getFullYear()}`;
        content.append(data);

        if (item.text) {
            let text = document.createElement("div");
            text.className = "content-text";
            content.append(text);
            let button
            if (item.text.length > 209) {
                text.textContent = item.text.slice(0, 206) + '...';
                button = document.createElement('button');
                button.className = "content-button";
                button.textContent = 'читать полностью';
                text.append(button);
            } else {
                text.textContent = item.text;
            }
            if (button) {
                button.addEventListener('click', () => {
                    text.textContent = item.text;
                    button.remove();
                })
            }
        }
        let img = document.createElement("div");
        img.className = "content-img";
        img.style.background = `no-repeat center/100% url(${item.img})`;
        content.append(img);
        let likeWrapper = document.createElement("div");
        likeWrapper.className = "likeWrapper";
        post.append(likeWrapper);
        let like = document.createElement("div");
        like.className = "likeWrapper-like";
        like.name = item.id;
        const checkingLiked = item.isLiked.some((item) => item == userId);
        if (checkingLiked) {
            like.style.background = `no-repeat center/100% url("/img/true.svg")`;
        } else if (!checkingLiked) {
            like.style.background = `no-repeat center/100% url("/img/false.svg")`;
        }
        like.addEventListener('click', eventPresses);
        likeWrapper.append(like);

    })
    observer = new IntersectionObserver((entries) => {
        if (entries[0].intersectionRatio > 0) imgs()
    });
    target = section.lastChild;
    if (obj.totalCount > offset) {
        observer.observe(target);
    }
};

const eventPresses = async function eventPresses(event) {
    let liked
    if (event.target.style.backgroundImage == `url("/img/false.svg")`) {
        liked = true
        event.target.style.background = `no-repeat center/100% url("/img/true.svg")`
    } else {
        liked = false;
        event.target.style.background = `no-repeat center/100% url("/img/false.svg")`
    }
    const obj = {
        isLiked: liked
    };
    await fetch(`/${userId}/postLikes/${event.target.name}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(obj)
    });
}

imgs();