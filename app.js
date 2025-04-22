const apiBase = "https://jsonplaceholder.typicode.com/posts";
const productList = document.getElementById("productList");
const loadBtn = document.getElementById("loadProductsButton");
const searchInput = document.getElementById("searchInput");

let currentPage = 1;
const pageSize = 10;
let allProducts = [];

// Fetch Products with Pagination
async function fetchProducts() {
  try {
    const res = await fetch(apiBase);
    const data = await res.json();
    allProducts = data;
    renderProducts(data.slice(0, currentPage * pageSize));
  } catch (err) {
    console.error("Error loading products", err);
  }
}

// Render Products
function renderProducts(products) {
  productList.innerHTML = "";
  products.forEach((p) => {
    productList.innerHTML += `
      <div class="product">
        <h5>${p.title}</h5>
        <p>${p.body}</p>
        <button class="btn btn-warning me-2" onclick="updateProduct(${p.id})">Update</button>
        <button class="btn btn-danger" onclick="deleteProduct(${p.id})">Delete</button>
      </div>
    `;
  });
}

// Add Product
document.getElementById("productForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("productTitle").value;
  const body = document.getElementById("productBody").value;
  try {
    const res = await fetch(apiBase, {
      method: "POST",
      body: JSON.stringify({ title, body, userId: 1 }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    alert("Product Added!");
    allProducts.unshift(data);
    renderProducts(allProducts.slice(0, currentPage * pageSize));
    e.target.reset();
  } catch (err) {
    console.error("Add error", err);
  }
});

// Update Product
async function updateProduct(id) {
  const title = prompt("Enter new title:");
  const body = prompt("Enter new body:");
  if (!title || !body) return;

  try {
    await fetch(`${apiBase}/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, body }),
      headers: { "Content-Type": "application/json" },
    });
    alert("Product Updated!");
  } catch (err) {
    console.error("Update error", err);
  }
}

// Delete Product
async function deleteProduct(id) {
  if (!confirm("Are you sure?")) return;
  try {
    await fetch(`${apiBase}/${id}`, { method: "DELETE" });
    alert("Product Deleted!");
    allProducts = allProducts.filter((p) => p.id !== id);
    renderProducts(allProducts.slice(0, currentPage * pageSize));
  } catch (err) {
    console.error("Delete error", err);
  }
}

// Load More
loadBtn.addEventListener("click", () => {
  currentPage++;
  renderProducts(allProducts.slice(0, currentPage * pageSize));
});

// Debounce
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

// Live Search with Debounce
searchInput.addEventListener("input", debounce(async (e) => {
  const search = e.target.value.trim();
  if (!search) {
    renderProducts(allProducts.slice(0, currentPage * pageSize));
    return;
  }
  try {
    const res = await fetch(`${apiBase}?q=${search}`);
    const data = await res.json();
    renderProducts(data);
  } catch (err) {
    console.error("Search error", err);
  }
}, 500));

// Bonus: Batching
async function batchRequests() {
  try {
    const [userRes, postsRes] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/users/1"),
      fetch("https://jsonplaceholder.typicode.com/users/1/posts"),
    ]);
    const user = await userRes.json();
    const posts = await postsRes.json();
    console.log("User:", user);
    console.log("User's Posts:", posts);
  } catch (err) {
    console.error("Batch error", err);
  }
}

// Init
fetchProducts();
batchRequests();
