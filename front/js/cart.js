//==========================================================
// Declaration de la constante pour appeler le local storage
//==========================================================

const clientBasket = localStorage.getItem("basket");

const clientBasketJson = JSON.parse(clientBasket);

let total = 0; // variable  total du prix . on l'initialise a 0.
let totalQte = 0; // variable de la quantite total..

//==========================================================
//On fait une boucle dans le local storage
//=========================================================

for (let i = 0; i < clientBasketJson.length; i++) {
  let id = clientBasketJson[i].id;
  let color = clientBasketJson[i].colors;

  fetch(`http://localhost:3000/api/products/${id}`) // appel de l'API
    .then((res) => res.json())

    .then(function (product) {
      const cart_items = document.getElementById("cart__items"); // div parent
      const article = document.createElement("article");
      article.classList.add("cart__item");
      article.setAttribute("data-color", clientBasketJson[i].colors); // local storage
      article.setAttribute("data-id", clientBasketJson[i].id); // local storage

      const div_img = document.createElement("div");
      div_img.classList.add("cart__item__img");

      const img = document.createElement("img");
      img.src = product.imageUrl;
      img.alt = product.altText;

      const div_content = document.createElement("div");
      div_content.classList.add("cart__item__content");

      const div_description = document.createElement("div");
      div_description.classList.add("cart__item__content__description");
      const h2 = document.createElement("h2");
      h2.textContent = product.name; // api
      const p_color = document.createElement("p");
      p_color.textContent = clientBasketJson[i].colors; // local storage
      const p_price = document.createElement("p");
      p_price.textContent = product.price; // api

      const div_setting = document.createElement("div");
      div_setting.classList.add("cart__item__content__settings");

      const div_quantity = document.createElement("div");
      div_quantity.classList.add("cart__item__content__settings__quantity");
      const p_quantity = document.createElement("p");
      p_quantity.textContent = "Qté : ";
      const input = document.createElement("input");
      input.type = "number";
      input.classList.add("itemQuantity");
      //.................................................
      //addEventListener + appel de la fonction
      input.addEventListener("change", (e) => {
        let quantity = input.value;

        changeQty(id, color, quantity, clientBasketJson);
      });
      //......................................................
      input.name = "itemQuantity";
      input.min = "1";
      input.max = "100";
      input.value = clientBasketJson[i].quantity; // local storage

      const div_delete = document.createElement("div");
      div_delete.classList.add("cart__item__content__settings__delete");
      const p_delete = document.createElement("p");
      p_delete.classList.add("deleteItem");
      p_delete.textContent = "Supprimer";

      cart_items.append(article);

      article.append(div_img);
      div_img.append(img);

      article.append(div_content);
      div_content.append(div_description);
      div_description.append(h2);
      div_description.append(p_color);
      div_description.append(p_price);
      div_content.append(div_setting);
      div_setting.append(div_quantity);
      div_quantity.append(p_quantity);
      div_quantity.append(input);
      div_content.append(div_delete);
      div_delete.append(p_delete);

      cart_items.append(article);
      article.append(div_img);
      div_img.append(img);
      article.append(div_content);
      div_content.append(div_description);
      div_description.append(h2);
      div_description.append(p_color);
      div_description.append(p_price);
      div_content.append(div_setting);
      div_setting.append(div_quantity);
      div_quantity.append(p_quantity);
      div_quantity.append(input);
      div_content.append(div_delete);
      div_delete.append(p_delete);

      // addEvenListener sur le bouton supprimer (on est sur qu'íl est créé)
      div_delete.addEventListener("click", () =>
        deleteProduct(clientBasketJson[i].id, clientBasketJson[i].colors)
      );

      //===============================================================
      //................total de la quantité & total articles  .....
      //===============================================================
      // appel de la fonction

      //.........................
    });
}
document.getElementById("totalQuantity").textContent = calculateTotalQuantity(); //rappel la function calcul qui return la quantity
calculateTotalPrice().then((total) => {
  document.getElementById("totalPrice").textContent = total;
});
//==================================================================================================
//                              FONCTION
//==================================================================================================
// ----------------deleteProduct  -- SUPPRIMER UN PRODUIT DU PANIER--------------------

function deleteProduct(id, color) {
  const index = clientBasketJson.findIndex(
    (product) => product.id === id && product.colors === color
  );
  
  // on supprime la ligne où il y a l'index
  clientBasketJson.splice(index, 1);
  
  // on reinsere les nouvelles donnees dans le local storage
  localStorage.setItem("basket", JSON.stringify(clientBasketJson));
  // ... pour refresh de la page
  location.reload();
}

// let article = document.querySelector(`article[data-id="${id}"][data-color="${color}"]`);
// article.remove(); // ou supprimer la div qui evite de rafraichir la page

//__________________________________________________________________________________________________
// .....................fonction qui CALCUL le total et la quantite du panier -------------------
//___________________________________________________________________________________________________

function calculateTotal(totalQte, input, product) {
  totalQte = totalQte + Number(input.value);
  document.getElementById("totalQuantity").textContent = totalQte;

  let totalArticle = product.price * input.value;

  total = total + totalArticle;
  document.getElementById("totalPrice").textContent = total;
}

//...............calculateTotalQuantity().......FONCTION CALCUL LE TOTAL DE LA QUANTITE

function calculateTotalQuantity() {
  const basket = JSON.parse(localStorage.getItem("basket"));
  let totalQuantity = 0;
  for (let i = 0; i < basket.length; i++) {
    totalQuantity = totalQuantity + Number(basket[i].quantity);
  }

  return totalQuantity;
}
//....//
async function calculateTotalPrice() {
  const basket = JSON.parse(localStorage.getItem("basket"));
  let totalPrice = 0;
  if (basket.length > 0) {
    await Promise.all(
      basket.map(async (basketProduct) => {
        const res = await fetch(
          `http://localhost:3000/api/products/${basketProduct.id}`
        ); // appel de l'API
        const product = await res.json();

        totalPrice += product.price * Number(basketProduct.quantity);
        return totalPrice;
      })
    );
  }

  return totalPrice;
}


//===========================================================
//          CHANGER LA QUANTITE A PARTIR DU PANIER
// ============================================================

function changeQty(id, color, quantity, clientBasketJson) {
  const index = clientBasketJson.findIndex(
    (clientBasketJson) =>
      clientBasketJson.id === id && clientBasketJson.colors === color
  ); // retrouver l article

  clientBasketJson[index].quantity = quantity; //'affectation de quantity dans le tableau
  localStorage.setItem("basket", JSON.stringify(clientBasketJson)); //mettre le panier a jour

  document.getElementById("totalQuantity").textContent =
    calculateTotalQuantity(); //rappel la function calcul qui return la quantity
  calculateTotalPrice().then((total) => {
    document.getElementById("totalPrice").textContent = total;
  });
}
//=================================================================
//                          REGEX
//=================================================================
const form = document.querySelector("form");
let isValid = true
const regexFirstName = /^([A-Za-z\-àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]{2,20})?([-]{0,1})?([A-Za-z\-àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]{2,20})$/ ;
const regexLastName = /^([A-Za-z\-àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]{2,20})?([-]{0,1})?([A-Za-z\-àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]{2,20})$/
const regexAddress = /^[a-zA-ZA-Za-z\-àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ0-9\s]{5,50}$/
const regexCity = /^[a-zA-Z\-àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ\s]{2,50}$/
const regexEmail = /^[\w-\.]+@{1}([\w-]+\.)+[\w-]{2,4}$/

//.......................................................................... 
//       1. Verification des regex sur le "CHANGE"
//.........................................................................
//....firstname 
 form.firstName.addEventListener("change",function () {
      verifOnChange(regexFirstName,this,"Le prénom ne peut pas contenir de chiffres ! Et dois être compris entre 2 et 20 caratères")
});
//....Lastname 
form.lastName.addEventListener("change",function () {
  verifOnChange(regexLastName,this,"Le nom ne peut pas contenir de chiffres ! Et dois être compris entre 2 et 20 caratères")
});
//....address
form.address.addEventListener("change",function () {
  verifOnChange(regexAddress,this,"L'adresse doit contenir des lettres sans ponctuation et des chiffres !")
});
//.......city
form.city.addEventListener("change",function () {
  verifOnChange(regexCity,this,"La ville doit contenir minimum 2 lettres sans chiffre")
});
//.......email
form.email.addEventListener("change",function () {
  verifOnChange(regexEmail,this,"L'adresse email n'est pas valide !")
});
//=================================================================
//                     FONCTION - verifOnChange
//=================================================================
function verifOnChange (regex,input, msg) {
  let test = regex.test(input.value);
  if (test == true) {
    let ErrorMsg = input.nextElementSibling;
    ErrorMsg.textContent = "";
    isValid = true;
  } else {
    let ErrorMsg = input.nextElementSibling;
    ErrorMsg.textContent = msg;
    isValid = false;
  };
  };
//=================================================================
//                          POST
//=================================================================
  const btnOrder = document.getElementById("order");

  btnOrder.addEventListener("click", (e) => {
  e.preventDefault();
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const address = document.getElementById("address");
  const city = document.getElementById("city");
  const email = document.getElementById("email");
  
  const contact = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
  };

  const basket = JSON.parse(localStorage.getItem("basket"));
  const products = basket.map((product) => product.id); //.map  crée un tableau avec tous les id

  const objet = {
    contact,
    products,
  };
  //=================================================================
  //                      VERIFICATION BEFORE SUBMIT
  //=================================================================
  //--------------------verification si le formulaire est valide------
  
  isValid = true;
  verifOnChange(regexFirstName,firstName,"Le prénom ne peut pas contenir de chiffres ! Et dois être compris entre 2 et 20 caratères");
  verifOnChange(regexLastName,lastName,"Le nom ne peut pas contenir de chiffres ! Et dois être compris entre 2 et 20 caratères");
  verifOnChange(regexAddress,address,"L'adresse doit contenir des lettres sans ponctuation et des chiffres !");
  verifOnChange(regexCity,city,"La ville doit contenir minimum 2 lettres sans chiffre");
  verifOnChange(regexEmail,email,"L'adresse email n'est pas valide !");
  if(isValid ) {

    send(objet).then((result) =>(document.location.href = `confirmation.html?orderId=${result.orderId}`));//redirection de la page
  } 
});

//=================================================================
//                          FONCTION SEND
//=================================================================
async function send(data = {}) {
  const response = await fetch(`http://localhost:3000/api/products/order`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}
