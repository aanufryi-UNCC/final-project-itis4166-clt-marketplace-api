import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seed...");

  
  const userPassword = await bcrypt.hash("user1234", 10);
  const modPassword = await bcrypt.hash("mod1234", 10);

  
  const normalUser = await prisma.user.create({
    data: {
      username: "normal_user",
      email: "normal@example.com",
      passwordHash: userPassword,
      role: "USER"
    }
  });

  
  const moderator = await prisma.user.create({
    data: {
      username: "moderator_user",
      email: "moderator@example.com",
      passwordHash: modPassword,
      role: "MODERATOR"
    }
  });

  
  const category = await prisma.category.create({
    data: {
      name: "Electronics"
    }
  });

  
  const item = await prisma.item.create({
    data: {
      name: "Wireless Headphones",
      description: "Noise-cancelling with 20-hour battery life.",
      price: 20000,   
      categoryId: category.id,
      sellerId: normalUser.id
    }
  });

  
  const review = await prisma.review.create({
    data: {
      comment: "Great quality",
      rating: "FIVE",   
      reviewerId: moderator.id,
      itemId: item.id
    }
  });

  console.log("Seed complete");
  console.log({
    normalUser,
    moderator,
    category,
    item,
    review
  });
}

main()
  .catch((e) => {
    console.error("Error seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });