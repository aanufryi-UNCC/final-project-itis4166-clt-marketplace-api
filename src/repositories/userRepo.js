import prisma from '../config/db.js'

export async function findById(id) {
    return await prisma.find.user.findUnique( {
        where: {id: Number(id)},
    } );
}

export async function createUser(data) {
    return await prisma.user.create({data}); 
}

export async function updateUser(id, data) {
    return await prisma.user.update({
        where: {id: Number(id)},
        data,
    });
}

export async function deleteUser(id) {
    return await prisma.user.delete({
        where: {id: Number(id)},
    });
}