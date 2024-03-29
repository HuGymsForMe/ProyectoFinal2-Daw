import mongoose from "mongoose";
import app from "./src/app.js";
import { MONGODB_URI, PORT } from "./src/config.js";

// ******* CONEXIÓN A LA DB DE MONGO ******* //
export const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        app.listen(PORT, () => {
            console.log(`App is Listening on PORT ${PORT}`);
        });
        console.log("DB is connected");
    } catch (error) {
        console.error(error);
    }
}

connectDB();