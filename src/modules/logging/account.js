const { PrismaClient } = require('@prisma/client');
const { generateUUID } = require('../../utilities/uuid');

const prisma = new PrismaClient();

exports.accountLogging = async ({
    method,
    oldData,
    newData,
    sender,
}) => {
    try {
        await prisma.log.create({
            data: {
                id: generateUUID(),
                method: method,
                newData:  JSON.stringify(newData),
                oldData: JSON.stringify(oldData),
                createdBy: JSON.stringify(sender),
            }
        });
    } catch (error) {
        console.log(error);
    }
}