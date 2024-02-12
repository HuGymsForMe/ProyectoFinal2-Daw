import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { firstRed, firstGreen, API } from '../../config/config'

function DiagramResultsByTest() {

    const [data, setData] = useState(null);

    const { idUser } = useParams();

    useEffect(() => {
        axios.get(`${API}/gamebar/${idUser}`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log("Error fetching data:", error);
            });
    }, [idUser]);

    if (!data) return null;

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="4 1 2" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Aprobados" fill={firstGreen} />
                <Bar dataKey="Suspensos" fill={firstRed} />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default DiagramResultsByTest;