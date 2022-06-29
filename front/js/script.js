
 
//----------------------------------------------------------------------
// FETCH API   + appel des produit de l'API 
//----------------------------------------------------------------------
 
fetch('http://localhost:3000/api/products/')
.then(function(res) {
  console.log(res);
  if (res.ok)
    return res.json();  //.si la promesse est ok => retourne le resultat de la promesse en JSON
  }
)
.then(function(productData) { //ce que l'on a reçu et qui a été traité en json sera appelé productData
  console.log(productData);  // affiche en console productData
  displayArticles(productData);// appel de la fonction displayArticles pour afficher en dynamique

})
.catch(function(err) {
  document.querySelector("title").innerHTML = "404 ERROR";
  console.log(" ERROR 404 :" + err);

});

//----------------------------------------------------------------------
// fonction qui affichage les produits  sur la page index
//----------------------------------------------------------------------
 

function displayArticles (value) {

  for (let i=0; i<value.length; i++ ) {

    const items = document.getElementById("items");
    const a = document.createElement("a");
    a.href =`./product.html?id=${value[i]._id}`;

    const article = document.createElement("article");

    const img = document.createElement("img");
    img.src = value[i].imageUrl;
    img.alt = value[i].altTxt;

    const h3 = document.createElement("h3");
    h3.classList.add = "productName";
    h3.textContent = value[i].name;

    const p = document.createElement("p");
    p.classList.add ="productDescription";
    p.innerText = value[i].description;

    items.append(a);
    a.append(article);
    article.append(img);
    article.append(h3);
    article.append(p);

  }
};



 



// fetch('http://localhost:3000/api/products')
//     .then((res) => res.json())
//     .then(productData => {
//          console.log(productData[]);
//     })

//     .catch(function(error) {

//     });