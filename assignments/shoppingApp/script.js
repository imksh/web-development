//Variables
let products = [];
let isLoading = false;
let cart;
let selected = null;

//Elements
const horizontalCardContainer = document.getElementById(
  "horizontalCardContainer"
);
const homeCardContainer = document.getElementById("homeCardContainer");
const verticalCardContainer = document.getElementById("verticalCardContainer");
const largeCardContainer = document.getElementById("largeCardContainer");
const cartContainer = document.getElementById("cartContainer");
const cartNo = document.getElementById("cartNo");
const main = document.getElementById("main");
const loading = document.getElementById("loading");
const input = document.getElementById("search");
const searchList = document.getElementById("searchList");
const searchProductList = document.getElementById("searchProductList");
const productAdd = document.getElementById("productAdd");

function init() {
  cart = get("cart") || [];
  if (cart.length > 0) {
    cartContainer?.classList.remove("d-none");
    if (cartContainer) {
      cartNo.innerText = cart.length;
    }
  }
  products = get("products") || [];
  selected = get("id") || "";
}
init();

async function fetchAllProduct() {
  try {
    isLoading = false;
    main?.classList.add("d-none");
    loading?.classList.remove("d-none");
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    products = data;
    set("products", products);
    console.log(products);
    displayProducts();
  } catch (error) {
    console.log(error);
  } finally {
    isLoading = true;
    main?.classList.remove("d-none");
    loading?.classList.add("d-none");
  }
}

function add(e, id) {
  e.stopPropagation();
  cart = get("cart") || [];
  if (!cart.includes(id)) cart.push(id);

  set("cart", cart);

  cartContainer.classList.remove("d-none");
  cartContainer.classList.add("d-flex");
  cartNo.innerText = cart.length;
}

function handleCategory(name) {
  const list = document.querySelectorAll("li");
  list.forEach((ele) => {
    if (ele.innerText === name) {
      ele.classList.add("bg-primary");
    } else {
      ele.classList.remove("bg-primary");
    }
  });

  if (!cat) return;
}

function clearCart() {
  cart.length = 0;
  set("cart", []);
  console.log(cart);
  cartContainer.classList.add("d-none");
  cartNo.innerText = cart.length;
}

function setSelected(id) {
  localStorage.setItem("id", JSON.stringify(id));

  window.location.href = "./product.html";
}

async function showProduct() {
  const id = JSON.parse(localStorage.getItem("id"));
  if (!id) {
    main?.classList.add("d-none");
    loading?.classList.remove("d-none");
  } else {
    main?.classList.remove("d-none");
    loading?.classList.add("d-none");
  }

  const product = products.find(
    (ele) => ele?.id?.toString() === id?.toString()
  );

  document.getElementById("img").src = product.image;
  document.getElementById("price").innerText = (product.price * 80).toFixed(2);
  document.getElementById("title").innerText = product.title;
  document.getElementById("desc").innerText = product.description;
  document.getElementById("category").innerText = product.category;
  document.getElementById("rating").innerText = product.rating.rate;
  document.getElementById("count").innerText = product.rating.count;

  const flag = cart.find((i) => i === selected);

  if (flag) {
    productAdd.classList.remove("btn-primary");
    productAdd.classList.add("btn-danger");
    productAdd.innerText = "Remove";
  } else {
    productAdd.classList.add("btn-primary");
    productAdd.classList.remove("btn-danger");
    productAdd.innerText = "Add to Cart";
  }
}

function removeItem(e, id) {
  cart = cart.filter((item) => item != id);
  console.log("removed");

  set("cart", cart);

  if (cart.length <= 0) {
    cartContainer.classList.add("d-none");
    cartContainer.classList.remove("d-flex");
  }
  cartNo.innerText = cart.length;
}

function set(id, val) {
  localStorage.setItem(id, JSON.stringify(val));
}

function get(id) {
  return JSON.parse(localStorage.getItem(id));
}

function checkout() {
  document.getElementById("cartCheckOut").classList.remove("d-none");
  document.getElementById("orderInfo").classList.remove("d-none");
  document.getElementById("cartCheckOut").classList.add("d-flex");
  document.getElementById("orderInfo").classList.add("d-flex");
  cart.length = 0;
  set("cart", cart);
}

function openItems() {
  window.location.href = "./cart.html";
}

async function cartPage() {
  const list = products.filter((p) =>
    cart.map((item) => p.id?.toString() === item.toString())
  );
  console.log(cart);
  console.log("list : ", list);

  list.forEach((ele) => {
    const div = document.createElement("div");
    const id = ele.id;
    const title = ele.title;
    const price = (ele.price * 80).toFixed(2);
    const desc = ele.description;
    const category = ele.category;
    const img = ele.image;
    const rating = ele.rating?.rate;
    const count = ele.rating?.count;
    div?.classList.add(
      "cardLarge",
      "rounded-3",
      "shadow",
      "py-3",
      "px-4",
      "my-3",
      "mx-auto",
      "d-flex"
    );

    div.innerHTML = `
     
            <div onclick="setSelected(${id})">
              <img
                src=${img}
                width="100px"
                height="100px"
                alt=""
                class="object-fit-contain rounded-3"
              />
            </div>
            <div class="position-relative flex-grow-1 ps-4">
              
              <p class="pb-0 mt-1 fw-bold fs-5">
               ${title}
              </p>

              <span class=" fs-5 d-block fw-bold text-primary primary"
                >Rs ${price}</span
              >
              <button class="btn btn-primary float-end" onclick=removeItem(event,${id})>Remove</button>
            </div>
    `;
    document.getElementById("cartList")?.appendChild(div);
  });

  let total = list.reduce((sum, item) => sum + item.price, 0);
  total = (total * 80).toFixed(2);

  document.getElementById("totalPrice").innerText = `Rs ${total}`;
}

function search() {
  if (!input.value) {
    searchList?.classList.add("d-none");
    return;
  }
  searchList?.classList.remove("d-none");
  const val = input.value.toLowerCase();

  const list = products.filter((ele) => ele.title.toLowerCase().includes(val));

  list.forEach((ele) => {
    const div = document.createElement("div");
    const id = ele.id;
    const title = ele.title;
    const price = (ele.price * 80).toFixed(2);
    const desc = ele.description;
    const category = ele.category;
    const img = ele.image;
    const rating = ele.rating?.rate;
    const count = ele.rating?.count;
    const div3 = document.createElement("div");
    div3.classList.add(
      "cardLarge",
      "rounded-3",
      "shadow",
      "p-4",
      "my-2",
      "mx-auto",
      "d-flex"
    );
    div3.onclick = () => setSelected(id);

    div3.innerHTML = `
     
            <div>
              <img
                src=${img}
                width="100px"
                height="100px"
                alt=""
                class="object-fit-contain rounded-3"
              />
            </div>
            <div class="position-relative flex-grow-1 ps-4">
              
              <p class="pb-0 mt-2 fw-bold fs-5">
               ${title}
              </p>

              <span class="mt-3 fs-5 d-block fw-bold text-primary primary"
                >Rs ${price}</span
              >
              <button class="btn btn-primary float-end" onclick=add(event,${id})>Add to Cart</button>
            </div>
          
    `;
    searchList?.appendChild(div3);
    searchProductList?.appendChild(div3);
  });
}

function displayProducts() {
  products.slice(0, 10).forEach((ele) => {
    const div = document.createElement("div");
    const id = ele.id;
    const title = ele.title;
    const price = (ele.price * 80).toFixed(2);
    const desc = ele.description;
    const category = ele.category;
    const img = ele.image;
    const rating = ele.rating.rate;
    const count = ele.rating.count;
    const smallTitle =
      title.length > 20 ? title.substring(0, 17).concat("...") : title;

    div.innerHTML = `
         <div
            class="cardSmall rounded-3 overflow-hidden flex-shrink-0 shadow pb-2 mx-3"
            onclick="setSelected(${id})"
          >
            <img
              src=${img}
              width="200px"
              height="150px"
              alt=""
              class="object-fit-contain"
            />
            <span class="p-2 pb-0 d-block"
              >${smallTitle}</span
            >
            <span class="px-2 d-block text-primary fw-bold">Rs ${price}</span>
            <button class="btn btn-primary float-end me-3" onclick="add(event, ${id})">+</button>
          </div>
    `;
    horizontalCardContainer?.appendChild(div);

    homeCardContainer?.appendChild(div);
  });
  products.forEach((ele) => {
    const div = document.createElement("div");
    const id = ele.id;
    const title = ele.title;
    const price = (ele.price * 80).toFixed(2);
    const desc = ele.description;
    const category = ele.category;
    const img = ele.image;
    const rating = ele.rating.rate;
    const count = ele.rating.count;
    const div3 = document.createElement("div");
    div3.classList.add(
      "cardLarge",
      "rounded-3",
      "shadow",
      "p-4",
      "my-4",
      "mx-auto",
      "d-flex"
    );
    div3.onclick = () => setSelected(id);

    div3.innerHTML = `
            <div onclick="setSelected(${id})">
              <img
                src=${img}
                width="250px"
                height="250px"
                alt=""
                class="object-fit-contain rounded-3"
              />
            </div>
            <div class="position-relative flex-grow-1 ps-4">
              <div class="d-flex rating rounded-start-3 px-3">
                <i class="bi bi-star-fill mx-2"></i>
                <span>${rating}/5</span>
                <span class="ms-2">${count}</span>
              </div>
              <p class="pb-0 mt-4 fw-bold fs-5">
               ${title}
              </p>
              <p id="desc">${desc}</p>
              <div class="d-flex">
                <strong>Category: </strong><span id="category">${" "} ${category}</span>
              </div>

              <span class="mt-3 fs-5 d-block fw-bold text-primary primary"
                >Rs ${price}</span
              >

              <button class="btn btn-primary float-end" onclick="add(event, ${id})">Add to Cart</button>
            </div>
          
    `;
    largeCardContainer?.appendChild(div3);
  });

  products.slice(10, 18).forEach((ele) => {
    const container = document.getElementById("recentlyLaunched");
    const div2 = document.createElement("div");
    const id = ele.id;
    const title = ele.title;
    const price = (ele.price * 80).toFixed(2);
    const desc = ele.description;
    const category = ele.category;
    const img = ele.image;
    const rating = ele.rating.rate;
    const count = ele.rating.count;
    const midTitle =
      title.length > 23 ? title.substring(0, 20).concat("...") : title;

    div2.innerHTML = `
        <div onclick="setSelected(${id})" class="py-4 px-3 rounded-3 hoverScale overflow-hidden shadow my-4">
            <img
              src=${img}
              width="220px"
              height="180px"
              alt=""
              class="object-fit-contain"
            />
           
            <span class="p-2 pb-0 d-block"
              >${midTitle}</span
            >

            <span class="px-2 fs-5 d-block fw-bold text-primary primary"
              >Rs ${price}</span
            >
            <button class="btn btn-primary float-end me-2" onclick="add(event, ${id})">Add</button>
          </div>
    `;
    container?.appendChild(div2);
  });

  products
    .reverse()
    .slice(0, 12)
    .forEach((ele) => {
      const div2 = document.createElement("div");
      const id = ele.id;
      const title = ele.title;
      const price = (ele.price * 80).toFixed(2);
      const desc = ele.description;
      const category = ele.category;
      const img = ele.image;
      const rating = ele.rating.rate;
      const count = ele.rating.count;
      const midTitle =
        title.length > 23 ? title.substring(0, 20).concat("...") : title;

      div2.innerHTML = `
        <div onclick="setSelected(${id})" class="cardMid rounded-3 overflow-hidden shadow pb-2 my-4">
            <img
              src=${img}
              width="220px"
              height="180px"
              alt=""
              class="object-fit-contain"
            />
            <div class="d-flex rating rounded-start-3 px-3">
              <i class="bi bi-star-fill mx-2"></i>
              <span>${rating}/5</span>
            </div>
            <div class="d-flex px-2 justify-content-end mt-1">
              <i class="bi bi-bookmark-fill"></i> ${category}
            </div>
            <span class="p-2 pb-0 d-block"
              >${midTitle}</span
            >

            <span class="px-2 fs-5 d-block fw-bold text-primary primary"
              >Rs ${price}</span
            >
            <button class="btn btn-primary float-end me-2" onclick="add(event, ${id})">Add</button>
          </div>
    `;
      verticalCardContainer?.appendChild(div2);
    });
}

//animations

const animation = lottie.loadAnimation({
  container: document.getElementById("lottie"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "./src/animation/infinity.json",
});

const infinity = lottie.loadAnimation({
  container: document.getElementById("infinity"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "./src/animation/infinity.json",
});

const cartAnimate = lottie.loadAnimation({
  container: document.getElementById("cartAnimate"),
  renderer: "svg",
  loop: false,
  autoplay: true,
  path: "./src/animation/celebrate.json",
});

const cartCheckOut = lottie.loadAnimation({
  container: document.getElementById("cartCheckOut"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "./src/animation/celebrate.json",
});

productAdd.addEventListener("click", () => {
  const flag = cart.find((i) => i === selected);

  if (!flag) {
    add(event, selected);
    productAdd.classList.remove("btn-primary");
    productAdd.classList.add("btn-danger");
    productAdd.innerText = "Remove";
  } else {
    removeItem(event, selected);
    productAdd.classList.add("btn-primary");
    productAdd.classList.remove("btn-danger");
    productAdd.innerText = "Add to Cart";
  }
});
