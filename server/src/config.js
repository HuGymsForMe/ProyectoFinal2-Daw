import { config } from "dotenv";
config();

export const MONGODB_URI =  process.env.MONGODB_URL || "mongodb+srv://hugodiazcasado31:Carton1313@autoescuelafast.dwurlay.mongodb.net/";
export const PORT = process.env.PORT || 4000;

// ******* CONSTANTES TOKEN ******* //
export const TOKEN_SECRET = process.env.TOKEN_SECRET;

// ******* ID'S DE LOS TEST ******* //
export const TestsAutoescuelaFast = ["659e56222d2690f6d6cdd561", "659e56422d2690f6d6cdd562",
                                     "659e59bf44fa4228946c0b93", "659e5bab44fa4228946c0b95", 
                                     "659e5bc044fa4228946c0b96", "659e5be344fa4228946c0b97",
                                     "659e5bf244fa4228946c0b98", "659e5c0444fa4228946c0b99",
                                     "659e5c1444fa4228946c0b9a", "659e5c3b44fa4228946c0b9b",
                                     "660eb3f27a1008a5c3f59745", "660eb54b7a1008a5c3f59751",
                                     "660eb55f7a1008a5c3f59752"];  

// ******* CONSTANTES CLOUDINARY ******* //
export const CLOUD_NAME = process.env.CLOUD_NAME;
export const API_KEY = process.env.API_KEY;
export const API_SECRET = process.env.API_SECRET;