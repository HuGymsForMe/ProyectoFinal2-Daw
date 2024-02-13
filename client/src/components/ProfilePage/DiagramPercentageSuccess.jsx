import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart } from 'recharts';
import axios from 'axios';

import { API } from '../../config/config';

function DiagramPercentageSuccess() {

    const [data, setData] = useState();

    const { idUser } = useParams();

    useEffect(() => {
      axios.get(`${API}/gamearea/${idUser}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
    }, [idUser])

    if(!data) return null;

    return(
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}
      margin={{
        top: 5,
        right: 10,
        left: -40,
        bottom: 5
    }}>
        <XAxis />
        <YAxis />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="percentage" stroke="#000000" />
      </LineChart>
    </ResponsiveContainer>
    )
}

export default DiagramPercentageSuccess;