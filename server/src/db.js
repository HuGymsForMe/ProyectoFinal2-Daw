import mongoose from "mongoose";
//import { user, password, database } from "./config.js";

// ******* CONEXIÓN A LA DB DE MONGO ******* //
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        const PORT = process.env.PORT || 8000;
        app.listen(PORT, () => {
            console.log(`App is Listening on PORT ${PORT}`);
        });
        console.log("DB is connected");
    } catch (error) {
        console.error(error);
    }
}
