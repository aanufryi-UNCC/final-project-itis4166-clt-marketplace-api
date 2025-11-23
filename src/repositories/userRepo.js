import prisma from '../config/db.js';
console.log('userRepo Prisma client loaded'); 

export async function findById(id) {
    return await prisma.user.findUnique( {
        where: {id: Number(id)},
    } );
}
//For checking emails when creating accounts
export async function findUserByEmail(email) {
    return await prisma.user.findUnique({where: {email}});
}

export async function createUser(data) {
    return await prisma.user.create({
        data: data,
        omit: {passwordHash: true}
    });
}

export async function changeUserRole(userId, role) {
    try{
        return await prisma.user.update({
        where: { id: userId },
        data: { role },
    });
    //Prisma Error P2025 for if not founddd
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
    }
}

export async function updateUser(id, data) {
    return await prisma.user.update({
        where: {id: Number(id)},
        data,
    });
}

export async function getItemsByUser(userId) {
    return prisma.item.findMany({
        where: { userId },
        select: { 
            id: true, 
            name: true, 
            description: true, 
            sellerId: true 
        },
    });
}

export async function getOrdersByUserBuyer(buyerId) {
  return prisma.order.findMany({
    where: { buyerId },
    include: { item: true, seller: true }
  })
}

export async function getOrdersByUserSeller(sellerId) {
  return prisma.order.findMany({
    where: { sellerId },
    include: { item: true, buyer: true }
  })
}

export async function deleteUser(id) {
    return await prisma.user.delete({
        where: {id: Number(id)},
    });
}

export async function findAllUsers() {
    return prisma.user.findMany({ orderBy: { id: 'asc' } });
}

export async function getUserWithReviews(userId) {
  return prisma.user.findUnique({
    where: { id: Number(userId) },
    include: {
      reviewsWritten: {
        include: { item: { select: { id: true, name: true } } },
        orderBy: { createdAt: 'desc' },
      },
    },
  });
}

export async function getUserByUsernameWithReviews(username) {
  return prisma.user.findUnique({
    where: { username },
    include: {
      reviewsWritten: {
        include: { item: { select: { id: true, name: true } } },
        orderBy: { createdAt: 'desc' },
      },
    },
  });
}