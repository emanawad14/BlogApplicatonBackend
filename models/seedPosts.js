const mongoose = require("mongoose");
const Post = require("./Posts.model");
const User = require("./Users.model");

// 🟢 الاتصال بقاعدة البيانات
mongoose
  .connect(
    "mongodb+srv://emanawadali148_db_user:db958vOTZNCJCZYi@backenddb.w27uvpy.mongodb.net/Node-Api?retryWrites=true&w=majority&appName=BackEndDb"
  )
  .then(() => {
    console.log("✅ Connected to Database for Seeding");

    // 🟢 البيانات اللي هتتزرع (Seed Data)
    return Post.insertMany([
      {
        title: "Mastering React in 2025",
        description: "A complete guide to mastering React.js with hooks, context API, and advanced patterns.",
        image: "https://picsum.photos/600/400?random=1",
        author: "Eman Awad",
      },
      {
        title: "Node.js Best Practices",
        description: "Explore Node.js design patterns, error handling, and performance optimization tips.",
        image: "https://picsum.photos/600/400?random=2",
        author: "Admin",
      },
      {
        title: "MongoDB for Beginners",
        description: "Learn how to design schemas, use indexes, and optimize MongoDB queries for performance.",
        image: "https://picsum.photos/600/400?random=3",
        author: "John Doe",
      },
      {
        title: "UI/UX Design Trends 2025",
        description: "Discover the latest UI/UX design principles, including dark mode and neumorphism.",
        image: "https://picsum.photos/600/400?random=4",
        author: "Design Guru",
      },
      {
        title: "Deploying Apps with Docker",
        description: "Step-by-step guide to containerizing applications and deploying with Docker & Kubernetes.",
        image: "https://picsum.photos/600/400?random=5",
        author: "DevOps Expert",
      },
      {
        title: "Artificial Intelligence in Web Development",
        description: "How AI is shaping modern web apps with automation, personalization, and analytics.",
        image: "https://picsum.photos/600/400?random=6",
        author: "Tech Writer",
      },
      {
        title: "Mastering TypeScript",
        description: "Understand generics, decorators, and advanced TypeScript features for enterprise apps.",
        image: "https://picsum.photos/600/400?random=7",
        author: "Code Master",
      },
      {
        title: "Cybersecurity Basics",
        description: "Essential security practices for developers: JWT, OAuth, and password hashing.",
        image: "https://picsum.photos/600/400?random=8",
        author: "Security Analyst",
      },
      {
        title: "Next.js for Full-Stack Development",
        description: "Build SEO-friendly apps with Next.js, API routes, and server-side rendering.",
        image: "https://picsum.photos/600/400?random=9",
        author: "Full-Stack Dev",
      },
      {
        title: "Building REST APIs with Express",
        description: "Learn to create scalable REST APIs with Express.js and MongoDB.",
        image: "https://picsum.photos/600/400?random=10",
        author: "API Engineer",
      },
    ]);
  })
  .then(() => {
    console.log("✅ Data Seeded Successfully 🎉");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("❌ Error seeding data:", err.message);
  });
