const searchParams = new URLSearchParams(window.location.search);
const orderId =  searchParams.get("orderId");
console.log(orderId);
document.getElementById("orderId").textContent = orderId;