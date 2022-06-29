// aller le local storage  getitems
//parse
//boucle

const clientBasket = localStorage.getItem("basket");
console.log(clientBasket);

const clientBasketJson = JSON.parse(clientBasket);
console.log(clientBasketJson);



for (let i = 0; i < clientBasketJson.length; i++) {
  console.log(clientBasketJson[i]);
  let id = clientBasketJson[i].id;

  fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => res.json())

    .then(function (product) {
      const cart_items = document.getElementById("cart__items");// div parent
      const article = document.createElement("article");
      article.classList.add = "cart__item";
      article.setAttribute("data-color", clientBasketJson[i].colors); // local storage

      const div_img = document.createElement("div");
      div_img.classList.add ="cart__item__img";
      

      const img = document.createElement("img");
      img.src = product.imageUrl;
      img.alt = product.altText; // undefined ?
      img.style.width ="400px";

      const div_content = document.createElement("div");
      div_content.classList.add = "cart__item__content";

      const div_description = document.createElement("div");
      div_description.classList.add = "cart__item__content__description";
      const h2 = document.createElement("h2");
      h2.textContent = product.name; // api
      const p_color = document.createElement("p");
      p_color.textContent = clientBasketJson[i].colors; // local storage
      const p_price = document.createElement("p");
      p_price.textContent = product.price; // api

      const div_setting = document.createElement("div");
      div_setting.classList.add = "cart__item__content__settings";

      const div_quantity = document.createElement("div");
      div_quantity.classList.add = "cart__item__content__settings__quantity";
      const p_quantity = document.createElement("p");
      p_quantity.textContent = "Qté : ";
      const input = document.createElement("input");
      input.type = "number";
      input.classList.add = "itemQuantity";
      input.name = "itemQuantity";
      input.min = "1";
      input.max = "100";
      input.value = clientBasketJson[i].quantity; // local storage

      //................total de la quantité .....

      var  total;
      total = total +  input.value;


      //.........................

      const div_delete = document.createElement("div");
      div_delete.classList.add = "cart__item__content__settings__delete";
      const p_delete = document.createElement("p");
      p_delete.classList.add = "deleteItem";
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
      article.append(div_content);total
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
    });
    let totalQuantity = document.getElementById("totalQuantity");
totalQuantity.textContent = total;
}
 



//==========================================================
//SUPPRIMER UN PRODUIT DU PANIER
//==========================================================

// addevntlistener sur bouton  supprimer ( click)
// parcourrir le dom  pour recupere l id (au dessus)=>closest ?
// supprimer l id de la bonne balise  ?
//




// //============================================================
// // CHANGER LA QUANTITE A PARTIR DU PANIER
// //============================================================

// let quantityChanged = document.querySelector(".itemQuantity");

