import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;
        connection.on("connected", () => {
            console.log("Connected");
            
        });
        connection.on("error", () => {
            console.log("Error");
            process.exit();
        })
    } catch (error) {
        console.log("somthing wrong")
    }
}