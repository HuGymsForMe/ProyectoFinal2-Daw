import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PieChart, Pie, Legend, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import axios from 'axios';

import { API } from '../../../../../TFG-2-DAW/client/src/config/config';

import { secondRed, firstGreen } from '../../../../../TFG-2-DAW/client/src/config/config';

// TODO: Mejorar responsive del gráfico

function DiagramSuccess() {

    const [data, setData] = useState(null);

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

  if(!data) return null;

  const COLORS = [firstGreen, secondRed];

    return (
        <div className="flex items-center justify-center 2xl:w-[72%] xl:w-[100%] md:w-[35%] w-[10%]">
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                <Pie
                data={data}
                cx={150}
                cy={120}
                innerRadius={60}
                outerRadius={120}
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