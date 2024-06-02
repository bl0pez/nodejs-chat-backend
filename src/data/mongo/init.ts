import mongoose from "mongoose";

interface ConnectionOptions {
    mongoURI: string;
    dbName: string;
}

export class MongoDB {
    public static async connect(options: ConnectionOptions) {
        const { mongoURI, dbName } = options;

        try {
            await mongoose.connect(mongoURI, {
                dbName: dbName,
            });

            console.log('Connected to MongoDB');

        } catch (error) {
            console.log('Error connecting to MongoDB');
            throw error;
        }

    }
}