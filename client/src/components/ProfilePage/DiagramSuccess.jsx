import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PieChart, Pie, Legend, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import axios from 'axios';

import { secondRed, firstGreen, API } from '../../config/config';

// TODO: Mejorar responsive del gráfico (intervalos de anchos)

function DiagramSuccess() {

    const [data, setData] = useState(null);
    const [chartCx, setChartCx] = useState(0);

    const { idUser } = useParams();

    useEffect(() => {
      axios.get(`${API}/gamepie/${idUser}`)
          .then((response) => {
              setData(response.data);
          })
          .catch((error) => {
              console.log("Error fetching data:", error);
          });
  }, [idUser]);

  useEffect(() => {
    const updateChartCx = () => {
        const screenWidth = window.innerWidth;
        let newCx;
        if(screenWidth >= 350 && screenWidth < 450){
            newCx = screenWidth / 3.2
        } else if(screenWidth >= 450 && screenWidth < 550){
            newCx = screenWidth / 3.1
        } else if(screenWidth >= 550 && screenWidth < 650){
            newCx = screenWidth / 2.9
        } else if(screenWidth >= 650 && screenWidth < 750){
            newCx = screenWidth / 2.8
        } else if(screenWidth >= 750 && screenWidth < 850){
            newCx = screenWidth / 2.7
        } else if(screenWidth >= 850 && screenWidth < 950){
            newCx = screenWidth / 2.65
        } else if(screenWidth >= 950 && screenWidth < 1050){
            newCx = screenWidth / 2.6
        } else if(screenWidth >= 1050 && screenWidth < 1280){
            newCx = screenWidth / 2.55
        } else if(screenWidth >= 1280 && screenWidth < 1400){
            newCx = screenWidth / 9.25
        } else {
            newCx = screenWidth / 8.5
        }
        setChartCx(newCx);
    };

    updateChartCx();
    window.addEventListener('resize', updateChartCx);
    return () => window.removeEventListener('resize', updateChartCx);
}, []);

  if(!data) return null;

  const COLORS = [firstGreen, secondRed];

    return (
        <div className="flex items-center justify-center w-[100%]">
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                <Pie
                data={data}
                cx={chartCx}
                cy={120}
                innerRadius={40}
                outerRadius={100}
                dataKey="value"
            >
                {data.map((result, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default DiagramSuccess;