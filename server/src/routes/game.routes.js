import { Router } from "express";
import { bestGame, bestGamePremium, deleteGame, gamesArea, gamesBar, gamesLine, gamesPie, gamesPremium, getGame, getGames, sendGames, timeAverage, updateGame } from "../controllers/game.controller.js";

const router = Router();

router.get("/game", getGames);
router.post("/game/:id", sendGames);
router.get("/game/:id", getGame);
router.delete("/game/:id", deleteGame);
router.put("/game/:id", updateGame);
router.get("/gamepie/:id", gamesPie);
router.get("/gameline/:id", gamesLine);
router.get("/gamebar/:id", gamesBar);
router.get("/gamearea/:id", gamesArea);
router.get("/gamepremium/:id", gamesPremium);
router.get("/gametime/:id", timeAverage);
router.get("/gametests/:id", bestGame);
router.get("/gametestspremium/:id", bestGamePremium);

export default router;