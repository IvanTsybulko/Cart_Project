let shopElement = document.getElementById("shop");

let shopItemsData = [
  {
    id: "1",
    name: "G-Shock MTG1",
    price: "200",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/image1.png"
  },
  {
    id: "2",
    name: "G-Shock MTG2",
    price: "250",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/image2.png"
},
  {
    id: "3",
    name: "G-Shock MTG3",
    price: "275",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/image3.png"
},
  {
    id: "4",
    name: "G-Shock MTG4",
    price: "400",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/image4.png"
}
];

let basket = JSON.parse(localStorage.getItem("cart-data") || []);

let generateShop = () => {
  
  return (shopElement.innerHTML = shopItemsData.map((x)=>{
    let {id,name,price,desc,img} = x;

    let search = basket.find((x) => x.id === id) || [];
    return `
    <div id="product-id-${id}" class="item">
      <img width="220" src="${img}" alt="">
      <div class="details">
        <h3>${name}</h3>
        <p>${desc}</p>
        <div class="price-quantity">
          <h2>$ ${price}</h2>

          <div class="buttons">
            <i onclick="decrement(${id})" class="bi bi-dash-circle"></i>
            <div id="${id}" class="quantity">${search.item === undefined? 0 : search.item} </div>
            <i onclick="increment(${id})" class="bi bi-plus-circle"></i>
          </div>
        </div>
      </div>
    </div>
  `
  }).join(""))
};

generateShop();

let increment = (id) => {
  let selectedItem = document.getElementById(id);
  
  let search = basket.find((x)=> x.id === selectedItem.id);

  if(search === undefined)
  {
    basket.push(
      {
        id: selectedItem.id,
        item: 1
      }
    );

    search = basket.find((x)=> x.id === selectedItem.id);
  }
  else{
    search.item +=1;
  } 

  update(id, search.item);
};

let decrement = (id) => {
  let selectedItem = document.getElementById(id);
  
  let search = basket.find((x)=> x.id === selectedItem.id);

  if(search != undefined && search.item > 0)
  {
    search.item -=1;
    update(id, search.item);
  }
};

let update = (id,quantity) => {
  let selectedItem = document.getElementById(id);

  selectedItem.innerHTML = quantity;

  calculation();

  localStorage.setItem("cart-data", JSON.stringify(basket));
};

let calculation = () => {
  let cartAmountElement = document.getElementById("cart-amount");

  let sum = 0;
  for(let i = basket.length; i > 0; i--)
  {
    sum += basket[i - 1].item;
  }

  cartAmountElement.innerHTML = sum;
}

calculation();