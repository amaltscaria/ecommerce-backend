# E-commerce Product API

## Overview
A RESTful API for managing products in an e-commerce platform built with Node.js and Express.js. The API supports CRUD operations with JSON file persistence and includes data validation for product creation.

## Tech Stack
- **Backend**: Node.js with Express.js framework
- **Data Storage**: JSON file with in-memory caching for performance
- **Validation**: Built-in request validation with proper error handling

## How to Run
```bash
npm install && npm start
```
The server will start on port 3000 (or PORT environment variable if set).

## API Endpoints

### Base URL: `http://localhost:3000/api/v1`

---

### 1. GET `/products`
**Description**: Retrieve all products or filter by category

**Query Parameters**:
- `category` (optional): Filter products by category (case-insensitive)

**Response**:
```json
{
  "success": true,
  "count": 10,
  "products": [
    {
      "id": 1,
      "name": "Classic White T-Shirt",
      "category": "Apparel",
      "price": 19.99,
      "description": "Comfortable cotton t-shirt perfect for everyday wear",
      "stock": 50,
      "image": "https://example.com/tshirt.jpg"
    }
  ]
}
```

---

### 2. GET `/products/:id`
**Description**: Retrieve a single product by ID

**Parameters**:
- `id`: Product ID (integer)

**Response**:
```json
{
  "success": true,
  "product": {
    "id": 1,
    "name": "Classic White T-Shirt",
    "category": "Apparel",
    "price": 19.99,
    "description": "Comfortable cotton t-shirt perfect for everyday wear",
    "stock": 50,
    "image": "https://example.com/tshirt.jpg"
  }
}
```

**Error Response** (404):
```json
{
  "success": false,
  "message": "Product not found"
}
```

---

### 3. POST `/products`
**Description**: Create a new product

**Request Body**:
```json
{
  "name": "New Product",
  "category": "Electronics",
  "price": 99.99,
  "description": "Product description",
  "stock": 10,
  "image": "https://example.com/image.jpg"
}
```

**Required Fields**: `name`, `category`, `price`

**Response**:
```json
{
  "success": true,
  "message": "Product created successfully",
  "product": {
    "id": 11,
    "name": "New Product",
    "category": "Electronics",
    "price": 99.99,
    "description": "Product description",
    "stock": 10,
    "image": "https://example.com/image.jpg"
  }
}
```

**Validation Errors** (400):
```json
{
  "success": false,
  "message": "Missing required fields: name, category, price"
}
```

---

## Sample curl Commands

### Get all products
```bash
curl http://localhost:3000/api/v1/products
```

### Filter products by category
```bash
curl "http://localhost:3000/api/v1/products?category=Apparel"
```

### Get single product
```bash
curl http://localhost:3000/api/v1/products/1
```

### Create new product
```bash
curl -X POST http://localhost:3000/api/v1/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Wireless Mouse",
    "category": "Electronics",
    "price": 25.99,
    "description": "Ergonomic wireless mouse with long battery life",
    "stock": 30,
    "image": "https://example.com/mouse.jpg"
  }'
```

---

## Sample Postman Collection

### Environment Variables
- `baseUrl`: `http://localhost:3000/api/v1`

### Test Cases

1. **Get All Products**
   - Method: GET
   - URL: `{{baseUrl}}/products`

2. **Filter by Category**
   - Method: GET
   - URL: `{{baseUrl}}/products?category=Apparel`

3. **Get Product by ID**
   - Method: GET
   - URL: `{{baseUrl}}/products/1`

4. **Create New Product**
   - Method: POST
   - URL: `{{baseUrl}}/products`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
   ```json
   {
     "name": "Test Product",
     "category": "Electronics",
     "price": 49.99,
     "description": "Test product description",
     "stock": 15
   }
   ```

---

## Available Categories
- Apparel
- Electronics
- Footwear
- Home & Kitchen
- Sports & Fitness
- Accessories

---

## Error Handling
- **400 Bad Request**: Missing required fields or invalid data
- **404 Not Found**: Product not found
- **500 Internal Server Error**: Server error

---

## Data Persistence
Products are stored in a JSON file (`src/data/products.json`) and loaded into memory for fast access. New products are immediately persisted to the file system.# ecommerce-backend
# ecommerce-backend
# ecommerce-backend
# ecommerce-backend
