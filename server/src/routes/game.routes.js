import { Router } from "express";
import { bestGame, gamesArea, gamesBar, gamesLine, gamesPie, sendGames, timeAverage } from "../controllers/game.controller.js";

const router = Router();

router.post("/game/:id", sendGames);
router.get("/gamepie/:id", gamesPie);
router.get("/gameline/:id", gamesLine);
router.get("/gamebar/:id", gamesBar);
router.get("/gamearea/:id", gamesArea);
router.get("/gametime/:id", timeAverage);
router.get("/gametests/:id", bestGame);

export default router;