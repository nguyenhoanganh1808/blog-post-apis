# Blog API Backend

The **Blog API Backend** is a Node.js-based backend service for managing blog posts, comments, users, and authentication.

## 🚀 Features

- **User Authentication** (JWT-based)
- **Post Management** (Create, update, delete, list)
- **Comment System** (Add, delete, moderate, list)
- **Tagging System** (Categorize posts, Create, update, delete)
- **Pagination & Query Optimization**
- **Admin Role & Permissions**
- **Redis Caching & Docker Support**

## 🛠 Tech Stack

- **Node.js** & **Express.js**
- **PostgreSQL** & **Prisma ORM**
- **Redis** (Caching)
- **Docker & AWS** (Deployment)
- **JWT Authentication**

## 📦 Installation

```sh
git clone https://github.com/nguyenhoanganh1808/blog-post-apis.git
cd blog-post-apis
npm install
```

## ⚙️ Configuration

Create a `.env` file:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/blog_db
JWT_SECRET=your_secret_key
PORT=your_port
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
REDIS_HOST=localhost
REDIS_PORT=6379
```

## 🔄 Database Migration

```sh
npx prisma migrate dev
```

## ▶️ Running the Server

```sh
npm run dev
```

## 📡 API Endpoints

### Base URL

/api/v1

## Authentication

| Method | Endpoint         | Description         | Authentication |
| ------ | ---------------- | ------------------- | -------------- |
| POST   | `/auth/register` | Register a new user | ❌             |
| POST   | `/auth/login`    | Login user          | ❌             |

## Users

| Method | Endpoint         | Description            | Authentication |
| ------ | ---------------- | ---------------------- | -------------- |
| GET    | `/session`       | Get current login user | ✅             |
| PUT    | `/users/avatar`  | Update user avatar     | ✅             |
| PUT    | `/users/profile` | Update user profile    | ✅             |

## Posts

| Method | Endpoint             | Description              | Authentication |
| ------ | -------------------- | ------------------------ | -------------- |
| GET    | `/posts`             | Get all posts            | ❌             |
| GET    | `/posts/recent`      | Get recent posts         | ❌             |
| GET    | `/posts/:id`         | Get post by ID           | ❌             |
| GET    | `/posts/slug/:slug`  | Get post by slug         | ❌             |
| POST   | `/posts`             | Create a new post        | ✅             |
| PUT    | `/posts/:id`         | Update a post            | ✅             |
| PATCH  | `/posts/:id/publish` | Publish/unpublish a post | ✅             |
| DELETE | `/posts/:id`         | Delete a post            | ✅             |

## Comments

| Method | Endpoint                  | Description                    | Authentication |
| ------ | ------------------------- | ------------------------------ | -------------- |
| GET    | `/comments/:postSlug`     | Get comments for a post (slug) | ❌             |
| GET    | `/comments`               | Get all comments               | ❌             |
| POST   | `/comments`               | Create a comment               | ❌             |
| PUT    | `/comments/:id`           | Update a comment               | ✅             |
| DELETE | `/comments/:id`           | Delete a comment               | ✅             |
| GET    | `/posts/:postId/comments` | Get comments by post ID        | ❌             |
| POST   | `/posts/:postId/comments` | Create a comment for a post    | ❌             |

## Tags

| Method | Endpoint    | Description      | Authentication |
| ------ | ----------- | ---------------- | -------------- |
| GET    | `/tags`     | Get all tags     | ❌             |
| GET    | `/tags/:id` | Get tag by ID    | ❌             |
| POST   | `/tags`     | Create a new tag | ✅             |
| PUT    | `/tags/:id` | Update a tag     | ✅             |
| DELETE | `/tags/:id` | Delete a tag     | ✅             |

## Uploads

| Method | Endpoint  | Description     | Authentication |
| ------ | --------- | --------------- | -------------- |
| POST   | `/upload` | Upload an image | ❌             |

---

## 🐳 Docker Deployment

### Build and Run only the server with Docker

```sh
docker build -t blog-api .
docker run -p 3000:3000 --env-file .env blog-api
```

### Running with docker compose (server, redis, postgreSQL)

```sh
docker compose up --build -d
```
