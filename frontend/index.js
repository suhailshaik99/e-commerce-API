const productButton = document.getElementsByClassName("submit-button")[0];
const displayArea = document.getElementById("display-div");
productButton.addEventListener("click", async function (e) {
  const url = "http://localhost:3000/api/products";
  const data = await fetch(url);
  const resp = await data.json();
  console.log(resp.data);
  resp.data.forEach((item) => {
    const divElem = document.createElement("div");
    divElem.innerHTML = `<p style="font-size: 1.5rem" >${item.category}</p>
                     <p style="display: inline-block;font-size: 2rem">${item.description}</p><br>
                     <img src="${item.imageUrl}" height="300px" width="300px" alt="item-images">`;
    displayArea.appendChild(divElem);
  });
});
