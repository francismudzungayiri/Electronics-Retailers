# E-Commerce Engine

A modular, production-ready backend engine for building scalable e-commerce platforms. Designed for extensibility, performance, and clean architecture.

---

## Overview

E-Commerce Engine is a RESTful backend system that powers online stores. It handles:

- Product catalog management
- Orders & checkout
- User authentication & authorization
- Inventory tracking
- Health monitoring
- Structured API responses & centralized error handling

**Built with:**

- Node.js
- Express.js
- MongoDB
- Mongoose

---

## Core Architecture

```
src/
│
├── app.js
├── server.js
│
├── config/
├── controllers/
├── routes/
├── models/
├── middlewares/
├── utils/
└── db/
```

**Design Principles:**

- Separation of concerns
- Centralized error handling
- Standardized API responses
- Graceful shutdown handling
- Health checks (liveness + database)

---

## Features

### Authentication
- JWT-based authentication
- Role-based access control (Admin / Customer)

### Products
- Create, update, delete products
- Get single product or all products (pagination ready)

### Orders
- Create order
- Get all orders / single order
- Update order status
- Delete order

### Inventory
- Stock validation before order placement
- Automatic stock deduction

### Health Monitoring
- `GET /health/live` → process liveness
- `GET /health/full` → app + DB health check

### Graceful Shutdown
Handles `SIGTERM`, `SIGINT`, MongoDB connection closure, and HTTP server termination.

---

## API Response Format

**Success:**
```json
{
  "success": true,
  "message": "Products fetched successfully",
  "data": {},
  "errors": []
}
```

**Error:**
```json
{
  "success": false,
  "message": "Validation failed",
  "data": null,
  "errors": []
}
```

---

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_secret_key
NODE_ENV=development
CORS_ORIGINS=http://localhost:5173
```

---

## Installation

```bash
git clone <repo-url>
cd ecommerce-engine
npm install
```

---

## Running the Project

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

---

## Database Setup

Ensure MongoDB is running locally:

```bash
mongod
```

Or connect via a cloud provider such as [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

---

## Health Checks

Test using Postman or curl:

```bash
GET http://localhost:5000/health/live
GET http://localhost:5000/health/full
```

---

## Error Handling Strategy

- Custom `APIErrors` class
- Async handler wrapper
- Global error middleware
- Centralized response formatting

> **Note:** Without global error middleware, unhandled async errors will crash the server.

---

## Graceful Shutdown

On process termination, the server:

1. Stops accepting new requests
2. Closes the HTTP server
3. Closes the MongoDB connection
4. Exits the process cleanly

**Test with:**
```bash
kill -15 <PID>
```

---

## Roadmap

- [ ] Payment gateway integration (Stripe / Paystack)
- [ ] Redis caching
- [ ] Advanced search (ElasticSearch)
- [ ] Microservices split
- [ ] Event-driven order processing
- [ ] Docker support
- [ ] CI/CD pipeline
- [ ] Rate limiting
- [ ] Structured logging (Winston / Pino)
- [ ] Swagger API documentation

---

## Project Goals

This engine is built to:

- Serve as a reusable commerce backend core
- Be production deployable
- Scale to high traffic
- Maintain strict API consistency
- Provide enterprise-level structure

---

## License

[MIT](LICENSE)

---

## Author
# FRANCIS MUDZUNGAYIRI

Built as a scalable commerce backend foundation.
