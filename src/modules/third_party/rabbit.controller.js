const { PrismaClient } = require('@prisma/client');
const amqp = require("amqplib");
const { accountLogging } = require('../logging/account');

const prisma = new PrismaClient();

exports.saveLog = async () => {
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();

        process.once("SIGINT", async () => {
            await channel.close();
            await connection.close();
        });

        await channel.assertQueue('update_account', { durable: false });
        await channel.consume('update_account', async (message) => {
                if (message) {
                    const data = JSON.parse(message?.content);

                    await accountLogging({
                        method: data?.method,
                        oldData: data?.oldData,
                        newData: data?.newData,
                        sender: data?.sender
                    });

                    console.log("Data received!")
                }
            },
            { 
                noAck: true 
            }
        );
    } catch (error) {
        console.log(error)
    }
}