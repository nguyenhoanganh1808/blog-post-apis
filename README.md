# Blog API Backend

The **Blog API Backend** is a Node.js-based backend service for managing blog posts, comments, users, and authentication.

## 🚀 Features

- **User Authentication** (JWT-based)
- **Post Management** (Create, update, delete, list)
- **Comment System** (Add, delete, moderate)
- **Tagging System** (Categorize posts)
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
git clone https://github.com/yourusername/blog-api.git
cd blog-api
npm install
```

## ⚙️ Configuration

Create a `.env` file:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/blogdb
JWT_SECRET=your_secret_key
REDIS_URL=redis://localhost:6379
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

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| POST   | `/api/auth/login`  | User login        |
| POST   | `/api/auth/signup` | User signup       |
| GET    | `/api/posts`       | Fetch all posts   |
| POST   | `/api/posts`       | Create a new post |
| GET    | `/api/posts/:id`   | Get post details  |

📖 Full API Docs: [API Documentation](./docs/api.md)

## 🐳 Docker Deployment

```sh
docker build -t blog-api .
docker run -p 4000:4000 --env-file .env blog-api
```
