import { TestsAutoescuelaFast } from "../config.js";
import Game from "../models/game.model.js";

// ******* CONTROLADOR DE ADICIÓN DE PARTIDAS (PÁGINA DE TEST CONCRETO) ******* //
export const sendGames = async(req,res) => {
    const { time, misses, successes, pass, user } = req.body;
    const test = req.params.id;
    try {
        const newGame = new Game ({
            time,
            misses,
            successes,
            pass,
            test,
            user,
        }) 

        const gameSaved = await newGame.save();

        res.json({
            id: gameSaved._id,
            time: gameSaved.time,
            misses: gameSaved.misses,
            successes: gameSaved.successes,
            pass: gameSaved.pass,
            test: gameSaved.test,
            user: gameSaved.user,
        });
        
    } catch (error) {
        res.status(500).json({message: "Se ha producido un error al guardar la partida"});
    }
}

// ******* CONTROLADOR PARA EL DIAGRAMA DE SECTORES (APTOS Y NO APTOS DEL USUARIO) ******* //
export const gamesPie = async(req,res) => {
    try {
        const idUser = req.params.id
        const countGamesOK = await Game.countDocuments({pass: true, user: idUser});
        const countGames = await Game.countDocuments({user: idUser}); 
        const countGamesKO = countGames-countGamesOK
        res.status(200).json([
            {name: "APTOS", value: countGamesOK},
            {name: "NO APTOS", value: countGamesKO}
        ]);
    } catch (error) {
        res.status(500).json({message: "No se han podido recoger los aprobados del usuario"})
    }
}

// ******* CONTROLADOR PARA EL DIAGRAMA DE LINEAS (ÚLTIMOS TEST REALIZADOS POR EL USUARIO) ******* //
export const gamesLine = async(req,res) => {
    try{
        const idUser = req.params.id;

        const countGames = await Game.countDocuments({user: idUser})

        // ******* COMPROBAMOS SI EL USUARIO TIENE MÁS DE 10 TEST REALIZADOS QUE ES EL MÁXIMO DEL DIAGRAMA DE BARRAS ******* //
        const countLastGames = (countGames >= 10) 
        ? await Game.find({user: idUser}).select('successes').sort({createdAt: -1}).limit(10) 
        : await Game.find({user: idUser}).select('successes').sort({createdAt: -1}).limit(countGames)
        const successesList = countLastGames.map(game => ({ successes: game.successes }));
        const successesListLine = successesList.reverse()
        res.status(200).json(successesListLine);
    } catch (error) {
        res.status(500).json({message: "No se han podido recoger las últimas partidas del usuario"})
    }
}

// ******* CONTROLADOR PARA EL DIAGRAMA DE BARRAS (APTOS Y NO APTOS POR TEST) ******* //
export const gamesBar = async (req, res) => {
    try {
        const idUser = req.params.id;
        const resultsByTest = [];

        let countTest = 0;

        for (const proof of TestsAutoescuelaFast) {
            countTest++;
            const resultsTest = await Game.find({ user: idUser, test: proof });

            // Contadores para aprobados y no aprobados en un test específico
            let pass = 0;
            let dontPass = 0;

            // Verifica cada resultado del test
            resultsTest.forEach((result) => {
                if (result.pass) {
                    pass++;
                } else {
                    dontPass++;
                }
            });

            resultsByTest.push({
                name: `TEST ${countTest}`,
                Aprobados: pass,
                Suspensos: dontPass
            });
        }

        res.status(200).json(resultsByTest);
    } catch (error) {
        res.status(500).json({message: "No se han podido recoger las estadísticas por test del usuario"})
    }
}

// ******* CONTROLADOR PARA EL DIAGRAMA DE AREA (PORCENTAJE DE APROBADOS) ****** //
export const gamesArea = async (req,res) => {
    try {
        const idUser = req.params.id;
        const percentages = [];

        let countPasses = 0;

        const totalTests = await Game.countDocuments({user: idUser});
        let countTestRegressive = totalTests;

        const allTest = await Game.find({user: idUser}).sort({createdAt: 1});

        allTest.forEach((test) => {
            countTestRegressive--;
            console.log(test.pass)
            if(test.pass){
                countPasses++;
            }
            percentages.push({
                name: (totalTests-countTestRegressive),
                percentage: Number((countPasses/(totalTests-countTestRegressive)*100).toFixed(2))
            })
        })

        res.status(200).json(percentages);
    } catch (error) {
        res.status(500).json({message: "No se han podido recoger los porcentajes del usuario"})
    }
}

// ******* CONTROLADOR TIEMPO MEDIO EN HACER LOS TEST ******* //
export const timeAverage = async (req,res) => {
    try {
        const idUser = req.params.id;

        let sumTimes = 0;

        const totalTests = await Game.countDocuments({user: idUser});

        const allTest = await Game.find({user: idUser});

        allTest.forEach((userTest) => {
            sumTimes += userTest.time;
        })

        const timeAverageConst = Math.round(sumTimes/totalTests);

        if (!isNaN(timeAverageConst)){
            const minutes = Math.floor(timeAverageConst / 60);
            const seconds = timeAverageConst % 60;
            const timeAverageConstFormat = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
            res.status(200).json(timeAverageConstFormat);
        } else {
            res.status(200).json("00:00");
        }

    } catch (error) {
        res.status(500).json({message: "No se pudo recoger el tiempo correctamente"});
    }
}

// ******* CONTROLADOR DE MEJOR RESULTADO POR TEST (PÁGINA DE TODOS LOS TEST) ******* //
export const bestGame = async (req, res) => {
    try {
        const idUser = req.params.id;
        const bestGames = [];

        for (const testId of TestsAutoescuelaFast) {
            const bestGame = await Game.findOne({ user: idUser, test: testId })
                .sort({ successes: -1, time: 1 })
                .limit(1);

            if (bestGame) {
                const {misses, time, test} = bestGame;
                const minutes = Math.floor(time / 60);
                const seconds = time % 60;
                const timeFormat = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
                
                bestGames.push({
                    misses,
                    time: timeFormat,
                    test
                });
            } else {
                bestGames.push({
                    misses: "XX",
                    time: "XX:XX",
                    test: testId
                });
            }
        }

        res.status(200).json(bestGames);
    } catch (error) {
        res.status(500).json({ message: "Se ha producido un error al mostrar los resultados de los test" });
    }
};
