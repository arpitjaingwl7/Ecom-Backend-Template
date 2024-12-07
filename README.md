

# Backend Project Template

This project provides a foundational setup for backend applications, including user authentication, profile management, and image upload capabilities. It uses Node.js, Express, MongoDB, and integrates Cloudinary for image storage.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Folder Structure](#folder-structure)
- [API Routes](#api-routes)
- [Usage](#usage)
- [License](#license)

---

### Features
- **User Authentication**: Signup, Login, Logout using JSON Web Tokens (JWT).
- **Protected Routes**: Middleware for authentication using JWT tokens.
- **Profile Management**: Update user details and profile picture upload.
- **Cloudinary Integration**: Stores profile pictures on Cloudinary.

---

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Ensure MongoDB is running, or configure your cloud MongoDB URL in the environment variables (see `.env` section).

---

### Environment Variables

Create a `.env` file in the root directory of the project with the following variables:

```plaintext
PORT=8000
MONGO_DBURI='your_mongodb_uri'
ACCESS_KEY="ThisisSecretAcccessKey"
ACCESS_EXPIRY="1d"
REFRESH_EXPIRY='10d'
REFRESH_KEY="THISISSECRETREFRESHKEY"
CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
```

- `MONGO_DBURI`: MongoDB connection string.
- `ACCESS_KEY`: Secret key for JWT access tokens.
- `ACCESS_EXPIRY`: Expiration time for access tokens.
- `REFRESH_KEY`: Secret key for JWT refresh tokens.
- `REFRESH_EXPIRY`: Expiration time for refresh tokens.
- `CLOUDINARY_*`: Cloudinary credentials for image uploads.

---

### Folder Structure

```
project-root
│
├── Controllers
│   └── user.controller.js       # Handles user-related logic
│
├── Middlewares
│   ├── auth.middleware.js       # Auth middleware for route protection
│   └── multer.middleware.js     # Middleware for file uploads using Multer
│
├── Models
│   └── user.model.js            # Mongoose model for user
│
├── Routes
│   └── user.routes.js           # Defines user-related routes
│
├── Utility
│   └── Cloudinary.js            # Utility functions for Cloudinary integration
│
├── .env                         # Environment variables
└── app.js                       # Main app entry point
```

---

### API Routes

#### Auth Routes

| Route          | Method | Description          | Protected |
|----------------|--------|----------------------|-----------|
| `/signup`      | POST   | Register a new user  | No        |
| `/login`       | POST   | Login user           | No        |
| `/logout`      | POST   | Logout user          | Yes       |

#### User Routes

| Route              | Method | Description                    | Protected |
|--------------------|--------|--------------------------------|-----------|
| `/`                | GET    | Get authenticated user data    | Yes       |
| `/update`          | PATCH  | Update user information        | Yes       |
| `/updatePicture`   | PATCH  | Update profile picture         | Yes       |

---

### Usage

1. **Run the Project**:
   Start the server by running:

   ```bash
   npm start
   ```

2. **Access API**:
   The server will run by default on `http://localhost:8000`. Use a tool like Postman or Insomnia to test API endpoints.

3. **Example Requests**:

   - **Signup**:
     ```bash
     POST http://localhost:8000/signup
     ```
     Request Body:
     ```json
     {
       "email": "user@example.com",
       "password": "password",
       "userName": "username"
     }
     ```

   - **Login**:
     ```bash
     POST http://localhost:8000/login
     ```
     Request Body:
     ```json
     {
       "email": "user@example.com",
       "password": "password"
     }
     ```

   - **Get User**:
     ```bash
     GET http://localhost:8000/
     ```
     Requires Authorization header: `Bearer <AccessToken>`

4. **Upload Profile Picture**:
   Use `updatePicture` endpoint to upload a profile picture. Attach the image file under the form-data field named `profilePicture`.

---


Here’s a comprehensive **README.md** file for your APIs:

---




## **Endpoints**

### **Cart APIs**
#### 1. Add a Product to Cart
- **Endpoint**: `POST /api/cart/add`
- **Description**: Adds a product to the user's cart.
- **Headers**: 
  - `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "productId": "string",
    "quantity": "number"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Cart updated successfully",
    "cart": { ... }
  }
  ```

#### 2. Get User's Cart
- **Endpoint**: `GET /api/cart/`
- **Description**: Retrieves the user's cart details.
- **Headers**: 
  - `Authorization: Bearer <token>`
- **Response**:
  ```json
  {
    "_id": "string",
    "userId": "string",
    "products": [
      {
        "productId": { ... },
        "quantity": "number"
      }
    ]
  }
  ```

#### 3. Update Product Quantity in Cart
- **Endpoint**: `PUT /api/cart/update`
- **Description**: Updates the quantity of a product in the cart. If quantity is 0, the product is removed.
- **Headers**: 
  - `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "productId": "string",
    "quantity": "number"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Cart updated successfully",
    "cart": { ... }
  }
  ```

#### 4. Remove Product from Cart
- **Endpoint**: `DELETE /api/cart/remove/:productId`
- **Description**: Removes a specific product from the user's cart.
- **Headers**: 
  - `Authorization: Bearer <token>`
- **Response**:
  ```json
  {
    "message": "Product removed from cart",
    "cart": { ... }
  }
  ```

---

### **Order APIs**
#### 1. Place an Order
- **Endpoint**: `POST /api/orders/place`
- **Description**: Places an order based on the user's cart and clears the cart.
- **Headers**: 
  - `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "shippingDetails": {
      "address": "string",
      "city": "string",
      "postalCode": "string",
      "country": "string"
    }
  }
  ```
- **Response**:
  ```json
  {
    "message": "Order placed successfully",
    "order": { ... }
  }
  ```

#### 2. Get All Orders (Admin Only)
- **Endpoint**: `GET /api/orders/`
- **Description**: Retrieves all orders in the system.
- **Headers**: 
  - `Authorization: Bearer <admin-token>`
- **Response**:
  ```json
  [
    {
      "_id": "string",
      "userId": "string",
      "products": [ ... ],
      "totalAmount": "number",
      "shippingDetails": { ... }
    }
  ]
  ```

#### 3. Get Orders by Customer ID
- **Endpoint**: `GET /api/orders/:userId`
- **Description**: Fetches all orders made by a specific user.
- **Headers**: 
  - `Authorization: Bearer <token>`
- **Response**:
  ```json
  [
    {
      "_id": "string",
      "products": [ ... ],
      "totalAmount": "number",
      "shippingDetails": { ... }
    }
  ]
  ```

---

## **Authentication Middleware**
All routes are secured using `userAuth` or `adminAuth` middlewares:
- **`userAuth`**: Validates the user's JWT and attaches `req.user`.
- **`adminAuth`**: Validates the admin's JWT and ensures admin privileges.

---

## **Models**
### **Cart**
```javascript
{
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true }
    }
  ]
}
```

### **Order**
```javascript
{
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  shippingDetails: { type: Object, required: true },
  orderDate: { type: Date, default: Date.now }
}
```

---

## **Error Handling**
- **400**: Bad Request (e.g., missing required fields)
- **401**: Unauthorized (e.g., invalid or missing token)
- **404**: Resource not found (e.g., cart or product not found)
- **500**: Server error (e.g., database issues)

---

## **Future Enhancements**
- Add product management APIs (CRUD for products).
- Integrate payment gateway for order payment.
- Enhance cart with discount and promo code features.




