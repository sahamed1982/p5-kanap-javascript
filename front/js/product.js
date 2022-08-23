//--------------------------------------------------------------------------
// Récupération de l'id du produit via l' URL
//--------------------------------------------------------------------------

//on récupere l'URL de la page apres le click sur l'aticle  et on la stock dans searchParams
//=>(window.location)...
//....on découpe l'URL pour avoir la partie ou se trouve le id avec (window.location.search)
const searchParams = new URLSearchParams(window.location.search);

//.............................................................................
//  On stock 055743915a544fde83cfdfc904935ee7  qui est searchParams.get("id") dans  id
//  On affiche pour vérifier
//..................................................................................
const id = searchParams.get("id");

//----------------------------------------------------------------------
// FETCH API   + appel des produit de l'API
//----------------------------------------------------------------------
fetch(`http://localhost:3000/api/products/${id}`)
  .then(function (res) {
    if (res.ok) return res.json(); //.si la promesse est ok => retourne le resultat de la promesse en JSON
  })
  .then(function (productData) {
    //ce que l'on a reçu et qui a été traité en json sera appelé productData

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

  for (let c = 0; c < value.colors.length; c++) {
    const colors = document.getElementById("colors");

    const option = document.createElement("option");
    colors.append(option);
    option.value = value.colors[c];
    option.text = value.colors[c];

    item_img.append(img);
  }
  //...............local Storage ........................//

  //====================CREATION DU PANIER au Click =======

  addToCart.addEventListener("click", (e) => {
    const choixProduit = {
      id: searchParams.get("id"),
      colors: document.getElementById("colors").value,
      quantity: parseInt(document.getElementById("quantity").value),
    };
    if (
      document.getElementById("addToCart").textContent === "Ajouter au panier"
    ) {
      addProduct(choixProduit);
    } else if (
      document.getElementById("addToCart").textContent === "Produit Ajouté !"
    ) {
      document.getElementById("addToCart").removeEventListener("click", e);
    }
  });
  //... actualisation du bouton Ajouter au changement de couleur ou quantité...

  document.getElementById("quantity").addEventListener("change", () => {
    document.getElementById("addToCart").textContent = "Ajouter au panier";
    document.getElementById("addToCart").style.background = "#2C3E50";
  });
  document.getElementById("colors").addEventListener("change", () => {
    document.getElementById("addToCart").textContent = "Ajouter au panier";
    document.getElementById("addToCart").style.background = "#2C3E50";
  });
  document.getElementById("addToCart").addEventListener("mouseover", () => {
    (document.getElementById("addToCart").textContent = "Ajouter au panier"),
      (document.getElementById("addToCart").style.background = "#2C3E50");
  });

  //===============   FONCTION =========================

  function addProduct(article) {
    const isValidArticle = article.quantity > 0 && article.colors != "";
    if (!isValidArticle) return;

    let basket = JSON.parse(localStorage.getItem("basket")) || [];
    const index = basket.findIndex(
      // on boucle le panier par index ayant id
      (product) => article.id == product.id && article.colors == product.colors
    );
    if (basket.length == 0 || index == -1) {
      // .find retourne -1 si aucun index n'est trouvé
      basket.push(article);
    } else if (index != -1) {
      basket[index].quantity += article.quantity;
    }
    localStorage.setItem("basket", JSON.stringify(basket));
    document.getElementById("addToCart").textContent = "Produit Ajouté !";
    document.getElementById("addToCart").style.backgroundColor = "green";
    document.getElementById("addToCart").style.borderColor = "white";
  }
}

//================== END ========================