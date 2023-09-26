import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { ICompetenceShort } from '../models/ICompetenceShort';

interface ChartPieProps {
  chartData: ICompetenceShort[];
}



//Det här behövs bara om vi vill ändra texten som displayar när man hovrar över en pie-slice
// const chartOptions = {
//   plugins: {
//     tooltip: {
//       callbacks: {
//         label: function (context ) {
//           // Display data value first and then label
//           return `${context.parsed}% av totalen`;
//         },
//       },
//     },
//   },
// };

const ChartPie = ({chartData}:ChartPieProps ) => {

  const inputData = chartData
  const totalPercentage = inputData.reduce((sum, item) => sum + item.percent_for_occupation, 0);
  
  //labels är listan med texten som syns högst upp
  const labels = inputData.map(
  //Valfritt att ändra koden till vad vi vill, det är bara för representation, ej logik, Gör iaf att kompetenserna tsm blir 100%
    item => item.term[0].toUpperCase() + item.term.slice(1, 20) + ' ' + ((item.percent_for_occupation / totalPercentage) * 100).toFixed(2) + '%'
  );
  
  //Data är själva pajbiten.
  const dataValues = inputData.map(item => parseFloat((item.percent_for_occupation / totalPercentage * 100).toFixed(2)));
  
  ChartJS.register(ArcElement, Tooltip, Legend);
  
  const data = {
    labels: labels, // Labels from inputData.term
    datasets: [
      {
        label: '% av totalen',
        data: dataValues, // Data värden som är formaterade med mindre decimaler
        backgroundColor: [
          '#003f5c', 
          '#2f4b7c',
          '#665191', 
          '#a05195', 
          '#d45087', 
          '#f95d6a', 
          '#ff7c43', 
          '#ffa600', 
          '#eb2d14', 
          '#ff0800', 
        ],
        //Det går bra att använda en array av färger här också om vi vill att alla har olika border
        borderColor: ['#fff'], 
        borderWidth: 1,
      },
    ],
  };


  return (
    <Pie data={data}/> //skriv options={chartOptions} om vi vill använda oss av det
  )
}

export default ChartPie