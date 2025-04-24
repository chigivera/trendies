# Order Management API Documentation

## Overview

This document provides detailed information about the Order Management API endpoints, request/response formats, and usage examples.

**Base URL**: `http://localhost:3001/api`

## Table of Contents

- [Authentication](#authentication)
- [Orders](#orders)
- [Customers](#customers)
- [Products](#products)
- [Error Handling](#error-handling)

## Authentication

Currently, the API does not implement authentication. This would be a recommended addition for production use.

## Orders

### Get All Orders

Retrieves a paginated list of orders with optional filtering.

**Endpoint**: `GET /orders`

**Query Parameters**:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Number of items per page (default: 10)
- `status` (optional): Filter by order status (PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED)

**Response**:
```json
{
  "data": [
    {
      "id": 1,
      "orderNumber": "ORD-1001",
      "status": "PROCESSING",
      "total": 199.92,
      "tax": 21.99,
      "shipping": 9.99,
      "notes": "Livraison à effectuer en après-midi uniquement.",
      "createdAt": "2023-11-15T14:30:45.123Z",
      "updatedAt": "2023-11-15T14:30:45.123Z",
      "customer": {
        "id": 1,
        "name": "Jean Dupont",
        "email": "jean.dupont@example.com"
      },
      "items": [
        {
          "id": 1,
          "quantity": 2,
          "price": 29.99,
          "product": {
            "id": 1,
            "name": "Produit A",
            "sku": "SKU-1001"
          }
        }
      ]
    }
  ],
  "meta": {
    "total": 156,
    "page": 1,
    "limit": 10,
    "totalPages": 16
  }
}
```

### Get Order by ID

Retrieves a specific order by its ID.

**Endpoint**: `GET /orders/:id`

**Path Parameters**:
- `id`: Order ID

**Response**:
```json
{
  "id": 1,
  "orderNumber": "ORD-1001",
  "status": "PROCESSING",
  "total": 199.92,
  "tax": 21.99,
  "shipping": 9.99,
  "notes": "Livraison à effectuer en après-midi uniquement.",
  "createdAt": "2023-11-15T14:30:45.123Z",
  "updatedAt": "2023-11-15T14:30:45.123Z",
  "customer": {
    "id": 1,
    "name": "Jean Dupont",
    "email": "jean.dupont@example.com",
    "phone": "06 12 34 56 78",
    "address": "123 Rue de Paris, 75001 Paris, France"
  },
  "items": [
    {
      "id": 1,
      "quantity": 2,
      "price": 29.99,
      "product": {
        "id": 1,
        "name": "Produit A",
        "sku": "SKU-1001",
        "price": 29.99
      }
    }
  ]
}
```

### Create Order

Creates a new order.

**Endpoint**: `POST /orders`

**Request Body**:
```json
{
  "customerId": 1,
  "status": "PENDING",
  "notes": "Livraison à effectuer en après-midi uniquement.",
  "tax": 21.99,
  "shipping": 9.99,
  "items": [
    {
      "productId": 1,
      "quantity": 2,
      "price": 29.99
    },
    {
      "productId": 2,
      "quantity": 1,
      "price": 49.99
    }
  ]
}
```

**Response**: Returns the created order object.

### Update Order

Updates an existing order.

**Endpoint**: `PUT /orders/:id`

**Path Parameters**:
- `id`: Order ID

**Request Body**:
```json
{
  "status": "SHIPPED",
  "notes": "Expédié par transporteur express.",
  "items": [
    {
      "productId": 1,
      "quantity": 3,
      "price": 29.99
    },
    {
      "productId": 2,
      "quantity": 1,
      "price": 49.99
    }
  ]
}
```

**Response**: Returns the updated order object.

### Delete Order

Deletes an order.

**Endpoint**: `DELETE /orders/:id`

**Path Parameters**:
- `id`: Order ID

**Response**:
```json
{
  "id": 1,
  "message": "Commande supprimée avec succès"
}
```

## Customers

### Get All Customers

Retrieves a paginated list of customers with optional search.

**Endpoint**: `GET /customers`

**Query Parameters**:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Number of items per page (default: 10)
- `search` (optional): Search term for customer name, email, or phone

**Response**:
```json
{
  "data": [
    {
      "id": 1,
      "name": "Jean Dupont",
      "email": "jean.dupont@example.com",
      "phone": "06 12 34 56 78",
      "address": "123 Rue de Paris, 75001 Paris, France",
      "createdAt": "2023-11-15T14:30:45.123Z",
      "updatedAt": "2023-11-15T14:30:45.123Z",
      "ordersCount": 5,
      "totalSpent": 1250.75
    }
  ],
  "meta": {
    "total": 78,
    "page": 1,
    "limit": 10,
    "totalPages": 8
  }
}
```

### Get Customer by ID

Retrieves a specific customer by their ID.

**Endpoint**: `GET /customers/:id`

**Path Parameters**:
- `id`: Customer ID

**Response**:
```json
{
  "id": 1,
  "name": "Jean Dupont",
  "email": "jean.dupont@example.com",
  "phone": "06 12 34 56 78",
  "address": "123 Rue de Paris, 75001 Paris, France",
  "createdAt": "2023-11-15T14:30:45.123Z",
  "updatedAt": "2023-11-15T14:30:45.123Z",
  "orders": [
    {
      "id": 1,
      "orderNumber": "ORD-1001",
      "status": "DELIVERED",
      "total": 199.92,
      "createdAt": "2023-11-15T14:30:45.123Z"
    }
  ],
  "ordersCount": 5,
  "totalSpent": 1250.75
}
```

### Create Customer

Creates a new customer.

**Endpoint**: `POST /customers`

**Request Body**:
```json
{
  "name": "Marie Martin",
  "email": "marie.martin@example.com",
  "phone": "06 98 76 54 32",
  "address": "456 Avenue des Fleurs, 69000 Lyon, France"
}
```

**Response**: Returns the created customer object.

### Update Customer

Updates an existing customer.

**Endpoint**: `PUT /customers/:id`

**Path Parameters**:
- `id`: Customer ID

**Request Body**:
```json
{
  "phone": "06 11 22 33 44",
  "address": "789 Boulevard du Commerce, 69000 Lyon, France"
}
```

**Response**: Returns the updated customer object.

### Delete Customer

Deletes a customer.

**Endpoint**: `DELETE /customers/:id`

**Path Parameters**:
- `id`: Customer ID

**Response**:
```json
{
  "id": 1,
  "message": "Client supprimé avec succès"
}
```

## Products

### Get All Products

Retrieves a paginated list of products with optional filtering.

**Endpoint**: `GET /products`

**Query Parameters**:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Number of items per page (default: 10)
- `search` (optional): Search term for product name, SKU, or description
- `category` (optional): Filter by product category

**Response**:
```json
{
  "data": [
    {
      "id": 1,
      "name": "Produit A",
      "description": "Description du produit A",
      "sku": "SKU-1001",
      "price": 29.99,
      "stock": 42,
      "category": "electronics",
      "imageUrl": "/images/product-a.jpg",
      "createdAt": "2023-11-15T14:30:45.123Z",
      "updatedAt": "2023-11-15T14:30:45.123Z"
    }
  ],
  "meta": {
    "total": 214,
    "page": 1,
    "limit": 10,
    "totalPages": 22
  }
}
```

### Get Product by ID

Retrieves a specific product by its ID.

**Endpoint**: `GET /products/:id`

**Path Parameters**:
- `id`: Product ID

**Response**:
```json
{
  "id": 1,
  "name": "Produit A",
  "description": "Description détaillée du produit A avec toutes ses caractéristiques.",
  "sku": "SKU-1001",
  "price": 29.99,
  "stock": 42,
  "category": "electronics",
  "imageUrl": "/images/product-a.jpg",
  "createdAt": "2023-11-15T14:30:45.123Z",
  "updatedAt": "2023-11-15T14:30:45.123Z"
}
```

### Create Product

Creates a new product.

**Endpoint**: `POST /products`

**Request Body**:
```json
{
  "name": "Nouveau Produit",
  "description": "Description du nouveau produit",
  "sku": "SKU-2001",
  "price": 39.99,
  "stock": 100,
  "category": "clothing",
  "imageUrl": "/images/nouveau-produit.jpg"
}
```

**Response**: Returns the created product object.

### Update Product

Updates an existing product.

**Endpoint**: `PUT /products/:id`

**Path Parameters**:
- `id`: Product ID

**Request Body**:
```json
{
  "price": 34.99,
  "stock": 85,
  "description": "Description mise à jour du produit"
}
```

**Response**: Returns the updated product object.

### Delete Product

Deletes a product.

**Endpoint**: `DELETE /products/:id`

**Path Parameters**:
- `id`: Product ID

**Response**:
```json
{
  "id": 1,
  "message": "Produit supprimé avec succès"
}
```

## Error Handling

The API uses standard HTTP status codes to indicate the success or failure of requests:

- `200 OK`: The request was successful
- `201 Created`: A resource was successfully created
- `400 Bad Request`: The request was malformed or invalid
- `404 Not Found`: The requested resource was not found
- `500 Internal Server Error`: An unexpected error occurred on the server

Error responses follow this format:
```json
{
  "statusCode": 404,
  "message": "Commande avec l'ID 999 non trouvée",
  "error": "Not Found"
}
```

## Swagger Documentation

A complete Swagger UI documentation is available at:

`http://localhost:3001/api`

This interactive documentation allows you to:

- View all available endpoints
- See request/response schemas
- Test API calls directly from the browser