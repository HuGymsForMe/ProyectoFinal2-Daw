import {FormControl, RadioGroup, Radio, FormControlLabel} from "@mui/material";

import { imagesQuestions, firstRed, secondRed, firstGreen, secondGreen } from "../../config/config";

import "../../styles/QuestionTest.css";

const controlProps = (id) => ({
    id,
    name: 'radio-group',
    inputProps: { 'aria-label': id },
});

// ******* COMPONENTE DE LAS PREGUNTAS DE LOS TEST ******* //
function QuestionTest({number_question, index_question, question, first_answer, second_answer, third_answer, correct_answer, checked, setSelectedAnswer}){

    const selectedAnswer = (event) => {
        setSelectedAnswer((prevAnswers) => ({
          ...prevAnswers,
          [index_question]: event.target.value,
        }));
    };

    return(
    <article className="flex flex-col border-2 w-[90%] gap-y-6 border-b-black sm:px-16 sm:py-8 px-4 py-2 my-4 gap-x-4">
        <div>
            <h3 className="text-center text-2xl">PREGUNTA {number_question}</h3>
        </div>
        <div className="flex md:flex-row flex-col gap-y-4 gap-x-6">
            <div className="flex items-center justify-center md:w-[30%]">
                <img src={imagesQuestions[index_question-1]} alt={`FOTO ${index_question}`} className="imagen drop-shadow-2xl" />
            </div>
            <div className="flex flex-col gap-4 justify-center md:w-[70%]">
                <label>{question}</label>
                <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        className="flex flex-col md:gap-y-2 gap-y-4"
                    >
                        <FormControlLabel value={first_answer} control={<Radio {...controlProps('a')} sx={{color: firstRed,'&.Mui-checked': {color: checked && correct_answer == first_answer ? firstGreen : secondRed}, '&:hover' : {backgroundColor: 'rgba(255, 64, 129, 0.08)'}}} />} label={first_answer} onChange={selectedAnswer} sx={{color: `${(checked && correct_answer == first_answer) ? secondGreen : '#000000'}`, pointerEvents: checked ? 'none' : 'auto' }} />
                        <FormControlLabel value={second_answer} control={<Radio {...controlProps('b')} sx={{color: firstRed,'&.Mui-checked': {color: checked && correct_answer == second_answer ? firstGreen : secondRed}, '&:hover' : {backgroundColor: 'rgba(255, 64, 129, 0.08)'}}} />} label={second_answer} onChange={selectedAnswer} sx={{color: `${(checked && correct_answer == second_answer) ? secondGreen : '#000000'}`, pointerEvents: checked ? 'none' : 'auto' }} />
                        <FormControlLabel value={third_answer} control={<Radio {...controlProps('c')} sx={{color: firstRed,'&.Mui-checked': {color: checked && correct_answer == third_answer ? firstGreen : secondRed}, '&:hover' : {backgroundColor: 'rgba(255, 64, 129, 0.08)'}}} />} label={third_answer} onChange={selectedAnswer} sx={{color: `${(checked && correct_answer == third_answer) ? secondGreen : '#000000'}`, pointerEvents: checked ? 'none' : 'auto' }} />
                    </RadioGroup>
                </FormControl>
            </div>
        </div>
    </article>
    )
}

export default QuestionTest;