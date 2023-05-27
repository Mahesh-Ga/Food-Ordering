var count = 0;
var noOfDishes = 0;
var QTY = new Array();


var TOTAL = 0;
var basketTotal = 0;


function getData() {
    var txt = document.getElementById("wlc");
    txt.innerText += sessionStorage.getItem("email").split("@")[0];
    if (count == 0) {
        var t = document.getElementById("cartTable");
        t.style.display = "none";
    }

    var helper = new XMLHttpRequest();

    helper.onreadystatechange = () => {
        if (helper.readyState == 4 && helper.status == 200) {
            var a = document.getElementById("dishes");
            var string = helper.responseText;
            var menu = JSON.parse(string);
            for (i = 0; i < menu.length; i++) {
                var dish = menu[i];
                var dishJSON = JSON.stringify(dish);
                QTY.push(1);
                a.innerHTML += `
                <div class="card" style="width: 18rem; margin:0.2vh">
                    <img src="${dish.img}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h3 class="card-title">${dish.name}</h3>
                      <p class="card-text">$ ${dish.price}</p>
                      <div style="display:flex;justify-content: space-between">
                      <button type="button" class="btn btn-outline-info" onclick = addtoCart(${dishJSON})>Add to Cart</button> 
                        <div id="alert${dish.id}"class="alert alert-success" role="alert" style="font-size:1.5vh;visibility:hidden;margin-bottom: 0px">
                                Item added to cart!
                        </div>
                      </div>             
                    </div>  
                <div>
                      ` ;

            }
        }
    };
    helper.open("GET", "http://127.0.0.1:5500/Day10/Data/dishes.json");
    helper.send();
}

var basketotal = document.getElementById("amount");

function increaseQuantity(id, price) {
    var inc = document.getElementById(id);
    var subTotal = document.getElementById(id - 10000);
    QTY[id - 1]++;
    subTotal.innerText = QTY[id - 1] * price;
    inc.innerText = QTY[id - 1];
    basketTotal += parseInt(price);
    basketotal.innerText = basketTotal;
}

function decreaseQuantity(id, price) {
    var dec = document.getElementById(id);
    var subTotal = document.getElementById(id - 10000);
    QTY[id - 1]--;
    if (QTY[id - 1] == 0) {
        var db = document.getElementById("decBtn" + id);
        db.disabled = true;
    }
    subTotal.innerText = QTY[id - 1] * price;
    dec.innerText = QTY[id - 1];

    basketTotal -= price;
    basketotal.innerText = basketTotal;
}

var temp = new Array();

function addtoCart(d) {

    if (temp == null || !temp.includes(d.id)) {
        temp.push(d.id);
        var t = document.getElementById("cartTable");
        count++;
        t.style.display = "";

        t.innerHTML +=
        `<tr>
        <td>${count}</td>
        <td>${d.name}</td>
        <td><button id="decBtn${d.id}" type="button" class="btn btn-outline-secondary" onclick= decreaseQuantity(${d.id},${d.price})>-</button></td>
        <td id="${d.id}">
        ${QTY[d.id - 1]}
        </td>
        <td><button id="incBtn" type="button" class="btn btn-outline-primary" onclick= increaseQuantity(${d.id},${d.price})>+</button></td>
        <td>${d.price}</td>
        <td class="subTotal" id="${d.id - 10000}">${d.price}</td>
        </tr>`;
        basketTotal += parseInt(d.price);
        basketotal.innerText = basketTotal;

        var pay = document.getElementById("payBtn");
        var txt = document.getElementById("txtAmount");
        var txtCart = document.getElementById("txtCart");
        txt.style.opacity = 1;
        pay.style.opacity = 1;
        txtCart.style.visibility = "visible";
        var alert = document.getElementById("alert" + d.id);
        alert.style.visibility = "visible";
        setTimeout(()=>{
            alert.style.visibility = "hidden";
        },500);
    }
    else {
        increaseQuantity(d.id, d.price);
        var alert = document.getElementById("alert" + d.id);
        alert.style.visibility = "visible";
        setTimeout(()=>{
            alert.style.visibility = "hidden";
        },500);
    }
}

function logout(){
    window.location.href = "logIn.html"; 
}