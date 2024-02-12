import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import userRoutes from "./routes/user.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import faQsRoutes from "./routes/faq.routes.js";
import testsRoutes from "./routes/test.routes.js";
import questionTestRoutes from "./routes/questiontest.routes.js";
import gamesRoutes from "./routes/game.routes.js";
import newsRoutes from "./routes/news.routes.js";
import workRoutes from "./routes/work.routes.js";


const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://autoescuela-fast.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

// app.use(cors({
//     origin: "https://autoescuela-fast-api.onrender.com/",
//     credentials: true,
// }));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// ******* RUTAS DE LA API REST ******* //
app.use("/api", userRoutes);
app.use("/api", contactRoutes);
app.use("/api", faQsRoutes);
app.use("/api", testsRoutes);
app.use("/api", questionTestRoutes);
app.use("/api", gamesRoutes);
app.use("/api", newsRoutes);
app.use("/api", workRoutes);

export default app;
