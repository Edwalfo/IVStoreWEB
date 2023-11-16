
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);




function HistogramaGrafica({datos}) {

    console.log(datos);
    const data = {
        labels: datos.map(dato => dato.nombre),
        datasets: [
            {
                label: 'Cantidad de ventas',
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                hoverBorderColor: 'rgba(75,192,192,1)',
                data:datos.map(dato => dato.cantidad_ventas),
                barPercentage: 1.0, // Esto elimina la separación visual entre las barras
                categoryPercentage: 1.0,
    
            },
        ],
    };
    
    const options = {
        x: {
            type: 'category',
            title: {
                display: true,
                text: 'Meses',
            },
        },
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: 'Ventas',
            },
        },
        responsive : true,
        maintainAspectRatio: false,
    };

    return <Bar data={data} options={options} />
}



export default HistogramaGrafica;