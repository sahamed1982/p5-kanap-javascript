//--------------------------------------------------------------------------
// Récupération de l'id du produit via l' URL
//--------------------------------------------------------------------------

//on récupere l'URL de la page apres le click sur l'aticle  et on la stock dans searchParams
//=>(window.location)...
//....on découpe l'URL pour avoir la partie ou se trouve le id avec (window.location.search)
const searchParams = new URLSearchParams(window.location.search);
console.log(searchParams);
console.log("window.location est : " + window.location); // http://127.0.0.1:5500/front/html/product.html?id=055743915a544fde83cfdfc904935ee7
console.log("window.location.search est : " + window.location.search); // ?id=055743915a544fde83cfdfc904935ee7
console.log(' searchParams.get("id") est : ' + searchParams.get("id")); // 055743915a544fde83cfdfc904935ee7

//.............................................................................
//  On stock 055743915a544fde83cfdfc904935ee7  qui est searchParams.get("id") dans  id
//  On affiche pour vérifier
//..................................................................................
const id = searchParams.get("id");

const cartItems = [];

//----------------------------------------------------------------------
// FETCH API   + appel des produit de l'API
//----------------------------------------------------------------------
fetch(`http://localhost:3000/api/products/${id}`)
  .then(function (res) {
    console.log(res);
    if (res.ok) return res.json(); //.si la promesse est ok => retourne le resultat de la promesse en JSON
  })
  .then(function (productData) {
    //ce que l'on a reçu et qui a été traité en json sera appelé productData
    console.log(productData); // affiche en console productData
    displaySoloArticles(productData); //ici--.appel de la fonction displaySoloArticles
  })
  .catch(function (err) {
    document.querySelector("title").innerHTML = "404 ERROR";
    console.log(" ERROR 404 :" + err);
  });

//----------------------------------------------------------------------
// fonction qui affichage les produits  sur la page product
//----------------------------------------------------------------------

function displaySoloArticles(value) {
  // for (let i = 0; i < value.length; i++) {
  //   if (id === value[i]._id) {
      const item_img = document.querySelector(".item__img");
      const img = document.createElement("img");
      img.src = value.imageUrl;
      img.alt = value.altText;

      const title = document.getElementById("title");
      title.textContent = value.name;

      const price = document.getElementById("price");
      price.textContent = value.price;

      const description = document.getElementById("description");
      description.textContent = value.description;

      console.log(value.colors.length + "  = value[i].colors.length");
      console.log(value.colors + "   = value[i].colors");

      for (let c = 0; c < value.colors.length; c++) {
        const colors = document.getElementById("colors");
        
        const option = document.createElement("option");
        colors.append(option);
        option.value = value.colors[c];
        option.text = value.colors[c];
        console.log(value.colors[c] + "   = value[i].colors[c]");
      }

      item_img.append(img);
    }
  //}
//}
//...............local Storage ........................//
//====================CREATION DU PANIER=======

addToCart.addEventListener("click", () => {
  const choixProduit = {
    id: searchParams.get("id"),
    colors: document.getElementById("colors").value,
    quantity: parseInt(document.getElementById("quantity").value),
  };
  addProduct(choixProduit);
});

//===============   FONCTION =========================

function addProduct(article) {
  const isValidArticle = article.quantity > 0   && article.colors != "";
  if (!isValidArticle) return;

  let basket = JSON.parse(localStorage.getItem("basket")) || [];
  const index = basket.findIndex(             // on boucle le panier par index ayant id 
    (product) => article.id == product.id && article.colors == product.colors
  );
  if (basket.length == 0 || index == -1) { // .find retourne -1 si aucun index n'est trouvé
    basket.push(article);
  } else if (index != -1) {
    basket[index].quantity += article.quantity;
  }
  localStorage.setItem("basket", JSON.stringify(basket));
}

//================ ==========================
