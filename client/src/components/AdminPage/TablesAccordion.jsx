import { useState } from "react";

// ******* COMPONENTE DE PREGUNTAS Y RESPUESTAS DEL INICIO ******* //
const TablesAccordion = ({ title, first_option, second_option, third_option, fourth_option }) => {

  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <div className="p-4 text-[#B30519] rounded-lg">
      <button
        onClick={() => setAccordionOpen(!accordionOpen)}
        className="flex justify-between w-full"
      >
        <span className="text-start">{title}</span>
        <svg
          className="fill-indigo-500 shrink-0 ml-8"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${
              accordionOpen && "!rotate-180"
            }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              accordionOpen && "!rotate-180"
            }`}
          />
        </svg>
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out text-[#e18893] text-sm ${
          accordionOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0 h-0"
        }`}
      >
        <div className="overflow-hidden">{first_option}</div>
        <div className="overflow-hidden">{second_option}</div>
        <div className="overflow-hidden">{third_option}</div>
        <div className="overflow-hidden">{fourth_option}</div>
      </div>
    </div>
  );
};

export default TablesAccordion;