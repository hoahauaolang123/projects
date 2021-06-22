import xhr, {createPost } from "./common.js";


    fetch('http://localhost:3000/cart')
        .then(response => response.json())
        .then((data) => {
         let post =document.getElementById("cart");
         data.forEach((cart)=>{
             let html=createPost(cart);
             post.insertAdjacentHTML("afterbegin",html)
         })
        })
        .catch(error => console.log(error));
document.getElementById("btn-province-ha-noi").onclick = function () {
    fetch('http://localhost:3000/cart?address_like=nội')
.then(response => response.json())
.then((res) => {
    let post =document.getElementById("cart");
    post.innerHTML = ""
    res.forEach((cart)=>{
        let html=createPost(cart);
       
        post.insertAdjacentHTML("afterbegin",html)

})})
.catch(error => console.log(error));
};
document.getElementById("btn-province-ho-chi-minh").onclick = function () {
    fetch('http://localhost:3000/cart?address_like=minh')
    .then(response => response.json())
    .then((res) => {
        let post =document.getElementById("cart");
        post.innerHTML=""
        res.forEach((cart)=>{
            let html=createPost(cart);
            post.insertAdjacentHTML("afterbegin",html)
   
    })})
    .catch(error => console.log(error));;
};
document.getElementById("xoa-loc").onclick = function () {
   
    fetch('http://localhost:3000/cart')
        .then(response => response.json())
        .then((data) => {
         let post =document.getElementById("cart");
         data.forEach((cart)=>{
             let html=createPost(cart);
             post.insertAdjacentHTML("afterbegin",html)
         })
        })
};
document.getElementById("btn-seat-5").onclick = function () {
    fetch('http://localhost:3000/cart?seat_like=5')
.then(response => response.json())
.then((res) => {
    let post =document.getElementById("cart");
    post.innerHTML = ""
    res.forEach((cart)=>{
        let html=createPost(cart);
       
        post.insertAdjacentHTML("afterbegin",html)

})})
.catch(error => console.log(error));
};
document.getElementById("btn-seat-7").onclick = function () {
    fetch('http://localhost:3000/cart?seat_like=7')
.then(response => response.json())
.then((res) => {
    let post =document.getElementById("cart");
    post.innerHTML = ""
    res.forEach((cart)=>{
        let html=createPost(cart);
       
        post.insertAdjacentHTML("afterbegin",html)

})})
.catch(error => console.log(error));
};
