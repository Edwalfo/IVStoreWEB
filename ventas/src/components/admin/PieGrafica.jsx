import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);




var options = {
    responsive: true,   
    maintainAspectRatio: false,
};



function PieGrafica({ datosPorSede }) {
    const data = {
        labels: datosPorSede.map((dato) => dato.sedeNombre),
        datasets: [
            {
                data: datosPorSede.map((dato) => dato.porcentaje),
                backgroundColor: datosPorSede.map((dato) => dato.color),
                hoverBackgroundColor: datosPorSede.map((dato) => dato.color),
            },
        ],
    };

    

    return <Pie data={data} options={options} />;
}

export default PieGrafica;