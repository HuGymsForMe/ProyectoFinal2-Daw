import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { API, secondGreen } from '../../config/config';

function DiagramLastTest() {

  const [data, setData] = useState();

  const { idUser } = useParams();

  useEffect(() => {
    axios.get(`${API}/gameline/${idUser}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, [idUser]);

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}
      margin={{
        top: 5,
        right: 10,
        left: -40,
        bottom: 5
    }}>
        <XAxis />
        <YAxis domain={[0, 30]} />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="successes" stroke={secondGreen} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default DiagramLastTest;
