import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);
export const PieChart = ({data})=>{
    return(
        <div>
            <Chart type={'pie'} data={data} options={{responsive:true, maintainAspectRatio: false }} />
        </div>
    );
};