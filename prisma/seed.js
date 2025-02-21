import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace spaces and special characters with hyphens
    .replace(/^-+|-+$/g, ""); // Trim leading/trailing hyphens
};

async function main() {
  console.log("Seeding database...");

  // Create users
  const user1 = await prisma.user.upsert({
    where: { email: "author1@example.com" },
    update: {},
    create: {
      name: "John Doe",
      email: "author1@example.com",
      password: "hashedpassword1", // Use bcrypt in real projects
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
  const tagJS = await prisma.tag.upsert({
    where: { name: "JavaScript" },
    update: {},
    create: { name: "JavaScript", slug: generateSlug("JavaScript") },
  });

  const tagNode = await prisma.tag.upsert({
    where: { name: "Node.js" },
    update: {},
    create: { name: "Node.js", slug: generateSlug("Node.js") },
  });

  const tagTS = await prisma.tag.upsert({
    where: { name: "TypeScript" },
    update: {},
    create: { name: "TypeScript", slug: generateSlug("TypeScript") },
  });

  const tagAPI = await prisma.tag.upsert({
    where: { name: "API Development" },
    update: {},
    create: { name: "API Development", slug: generateSlug("API Development") },
  });

  const tagDB = await prisma.tag.upsert({
    where: { name: "Databases" },
    update: {},
    create: { name: "Databases", slug: generateSlug("Databases") },
  });

  const coverImages = [
    "https://source.unsplash.com/600x400/?technology",
    "https://source.unsplash.com/600x400/?typescript",
    "https://source.unsplash.com/600x400/?database",
    "https://source.unsplash.com/600x400/?javascript",
    "https://source.unsplash.com/600x400/?programming",
    "https://source.unsplash.com/600x400/?coding",
    "https://source.unsplash.com/600x400/?developer",
    "https://source.unsplash.com/600x400/?framework",
    "https://source.unsplash.com/600x400/?nodejs",
    "https://source.unsplash.com/600x400/?software",
    "https://source.unsplash.com/600x400/?backend",
    "https://source.unsplash.com/600x400/?frontend",
    "https://source.unsplash.com/600x400/?typescript,code",
    "https://source.unsplash.com/600x400/?cloud",
    "https://source.unsplash.com/600x400/?server",
  ];

  // Create posts
  const postsData = [
    {
      title: "Intro to JavaScript",
      content: "Learn JS from basics",
      authorId: user1.id,
    },
    {
      title: "Advanced Node.js",
      content: "Deep dive into Node.js",
      authorId: user2.id,
    },
    {
      title: "Why TypeScript?",
      content: "Benefits of TypeScript",
      authorId: user1.id,
    },
    {
      title: "Building a REST API",
      content: "Best practices for APIs",
      authorId: user2.id,
    },
    {
      title: "Database Optimization",
      content: "How to optimize queries",
      authorId: user1.id,
    },
    {
      title: "GraphQL vs REST",
      content: "Which one should you use?",
      authorId: user2.id,
    },
    {
      title: "Full Stack Development",
      content: "Guide to full stack dev",
      authorId: user1.id,
    },
    {
      title: "Security in Web Apps",
      content: "How to secure your API",
      authorId: user2.id,
    },
    {
      title: "Modern JavaScript Features",
      content: "ES6+ features explained",
      authorId: user1.id,
    },
    {
      title: "Cloud Computing for Developers",
      content: "Intro to cloud platforms",
      authorId: user2.id,
    },
    {
      title: "Authentication with JWT",
      content: "How to implement authentication",
      authorId: user1.id,
    },
    {
      title: "Best Practices in Backend Development",
      content: "Writing clean backend code",
      authorId: user2.id,
    },
    {
      title: "Debugging in Node.js",
      content: "Techniques for debugging",
      authorId: user1.id,
    },
    {
      title: "How to Use Prisma with Express",
      content: "Database management with Prisma",
      authorId: user2.id,
    },
    {
      title: "Deploying a Node.js App",
      content: "Step-by-step deployment guide",
      authorId: user1.id,
    },
  ];

  await Promise.all(
    postsData.map(async (post, index) => {
      const baseSlug = generateSlug(post.title);
      let slug = baseSlug;
      let count = 1;

      // Ensure unique slugs
      while (await prisma.post.findUnique({ where: { slug } })) {
        slug = `${baseSlug}-${count}`;
        count++;
      }

      await prisma.post.create({
        data: {
          title: post.title,
          slug, // Add slug here
          content: post.content,
          published: Math.random() < 0.7, // Randomly set some posts unpublished
          authorId: post.authorId,
          coverPhoto: coverImages[index],
          tags: {
            connect: [
              { id: tagJS.id },
              { id: tagNode.id },
              { id: tagTS.id },
              { id: tagAPI.id },
              { id: tagDB.id },
            ],
          },
        },
      });
    })
  );

  console.log("✅ 15 posts have been added!");
}

main()
  .catch((error) => {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
