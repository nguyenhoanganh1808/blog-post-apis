import { PrismaClient } from "@prisma/client";
import slugify from "slugify";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create users
  const user1 = await prisma.user.upsert({
    where: { email: "author1@example.com" },
    update: {},
    create: {
      name: "John Doe",
      email: "author1@example.com",
      password: "123456@Anh", // Use bcrypt in real projects
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: "author2@example.com" },
    update: {},
    create: {
      name: "Jane Smith",
      email: "author2@example.com",
      password: "hashedpassword2",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
  });

  // Create tags
  const tags = await prisma.$transaction([
    prisma.tag.upsert({
      where: { name: "JavaScript" },
      update: {},
      create: { name: "JavaScript", slug: "javascript" },
    }),
    prisma.tag.upsert({
      where: { name: "Node.js" },
      update: {},
      create: { name: "Node.js", slug: "nodejs" },
    }),
    prisma.tag.upsert({
      where: { name: "TypeScript" },
      update: {},
      create: { name: "TypeScript", slug: "typescript" },
    }),
    prisma.tag.upsert({
      where: { name: "API Development" },
      update: {},
      create: { name: "API Development", slug: "api-development" },
    }),
    prisma.tag.upsert({
      where: { name: "Databases" },
      update: {},
      create: { name: "Databases", slug: "databases" },
    }),
  ]);

  const coverImages = [
    "https://res.cloudinary.com/dz7ufzk3g/image/upload/v1740386078/blog_app/1740386076056-images%20%283%29.png.png",
    "https://res.cloudinary.com/dz7ufzk3g/image/upload/v1740386176/blog_app/1740386174197-images_1668072317065.jpg.jpg",
    "https://res.cloudinary.com/dz7ufzk3g/image/upload/v1740386300/blog_app/1740386298999-images.png",
    "https://res.cloudinary.com/dz7ufzk3g/image/upload/v1740386333/blog_app/1740386331044-maxresdefault.jpg",
    "https://res.cloudinary.com/dz7ufzk3g/image/upload/v1740386358/blog_app/1740386357192-images%20%284%29.png",
  ];

  // Create posts with longer content
  const postsData = [
    {
      title: "Intro to JavaScript",
      content: `JavaScript is the foundation of web development. It powers interactive websites and is essential for frontend and backend development.\n\n### Why Learn JavaScript?\nJavaScript enables dynamic content, real-time updates, and complex web applications. It’s the backbone of frameworks like React, Vue, and Angular.\n\n### Getting Started\nTo begin, start with variables, loops, and functions. Move on to ES6+ features like arrow functions, template literals, and async/await.\n\n### Conclusion\nMastering JavaScript will open doors to full-stack development and modern web applications.`,
      authorId: user1.id,
    },
    {
      title: "Advanced Node.js",
      content: `Node.js revolutionized backend development by allowing JavaScript to run server-side. It’s non-blocking and event-driven, making it efficient.\n\n### Key Features\n- Asynchronous I/O\n- Package management with npm\n- Built-in modules for file handling and HTTP\n\n### Best Practices\nUse middleware in Express, optimize database queries, and handle errors properly.\n\n### Conclusion\nDeep knowledge of Node.js helps build scalable applications.`,
      authorId: user2.id,
    },
    {
      title: "Why TypeScript?",
      content: `TypeScript enhances JavaScript by adding static types, improving code quality and maintainability.\n\n### Benefits of TypeScript\n- Type safety\n- Better code documentation\n- Enhanced tooling support\n\n### Getting Started\nInstall TypeScript, configure tsconfig.json, and start writing strongly typed JavaScript.\n\n### Conclusion\nUsing TypeScript results in fewer bugs and better project scalability.`,
      authorId: user1.id,
    },
    {
      title: "Building a REST API",
      content: `A REST API allows applications to communicate over HTTP using standard methods like GET, POST, PUT, and DELETE.\n\n### Key Principles\n- Statelessness\n- Resource-based URLs\n- JSON as the data format\n\n### Best Practices\nUse meaningful endpoints, implement authentication, and handle errors correctly.\n\n### Conclusion\nA well-structured REST API is essential for scalable backend development.`,
      authorId: user2.id,
    },
    {
      title: "Database Optimization",
      content: `Databases are the backbone of applications. Optimizing them ensures efficiency and performance.\n\n### Optimization Techniques\n- Indexing tables\n- Normalization\n- Caching\n\n### Best Practices\nChoose the right database (SQL vs NoSQL), write efficient queries, and monitor performance.\n\n### Conclusion\nA well-optimized database improves response time and scalability.`,
      authorId: user1.id,
    },
  ];

  await Promise.all(
    postsData.map(async (post, index) => {
      await prisma.post.create({
        data: {
          title: post.title,
          content: post.content,
          coverPhoto: coverImages[index],
          slug: slugify(post.title, { lower: true, strict: true }),
          published: Math.random() < 0.7, // Randomly set some posts unpublished
          authorId: post.authorId,
          tags: {
            connect: [
              { id: tags[0].id },
              { id: tags[1].id },
              { id: tags[2].id },
              { id: tags[3].id },
              { id: tags[4].id },
            ],
          },
        },
      });
    })
  );

  console.log("✅ Posts have been added!");
}

main()
  .catch((error) => {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
