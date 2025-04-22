
# Dynamic Product Dashboard

This project is a dynamic, single-page product dashboard that allows users to perform CRUD operations (Create, Read, Update, Delete) on products, along with features such as live search, pagination, and asynchronous UI updates using AJAX.

## Features

- **CRUD Operations**: Add, update, delete, and view products.
- **Live Search**: Search for products dynamically using a debounce mechanism.
- **Pagination**: Load more products as you scroll down or click the "Load More" button.
- **Asynchronous Updates**: UI updates dynamically without page reload using AJAX and async/await.
- **Batching Requests**: Fetch multiple related data (user details and their posts) using `Promise.all`.

## API Used

This project uses the JSONPlaceholder API to simulate fetching, creating, updating, and deleting product data:

- **GET**: `https://jsonplaceholder.typicode.com/posts` (Fetches the list of products)
- **POST**: `https://jsonplaceholder.typicode.com/posts` (Adds a new product)
- **PUT**: `https://jsonplaceholder.typicode.com/posts/1` (Updates an existing product)
- **DELETE**: `https://jsonplaceholder.typicode.com/posts/1` (Deletes a product)

## Technologies Used

- **HTML5**: For structuring the content.
- **CSS3**: For styling the user interface.
- **JavaScript (ES6+)**: For handling dynamic operations and AJAX calls.
- **AJAX**: For making asynchronous requests to the API.
- **Async/Await**: For simplifying asynchronous code.
- **Bootstrap 5**: For responsive design and styling.


### Installation

1. Clone or download the repository.
2. Open the `index.html` file in your web browser to launch the product dashboard.

### How to Use

- **Load Products**: Click on the "Load More" button to fetch and display products from the API.
- **Add Product**: Fill in the title and body of the product in the form and click "Add Product" to create a new product.
- **Update Product**: Click the "Update" button next to a product to modify its title and body.
- **Delete Product**: Click the "Delete" button next to a product to remove it.
- **Live Search**: Type in the search bar to filter products dynamically.
- **Pagination**: Click the "Load More" button to load more products without refreshing the page.

