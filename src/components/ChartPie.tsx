import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
const inputData = [
  {
    term: 'körkort',
    percent_for_occupation: 7.536484426050969,
  },
  {
    term: 'montering',
    percent_for_occupation: 6.447397081245916,
  },
  {
    term: 'svenska',
    percent_for_occupation: 6.425615334349814,
  },
  {
    term: 'truckkort',
    percent_for_occupation: 4.588688012778626,
  },
  {
    term: 'egen bil',
    percent_for_occupation: 3.819066289116387,
  },
  {
    term: 'industri',
    percent_for_occupation: 3.550424744064474,
  },
  {
    term: 'lager',
    percent_for_occupation: 2.44681623466202,
  },
  {
    term: 'träindustrin',
    percent_for_occupation: 1.9022725622594931,
  },
  {
    term: 'ritningsläsning',
    percent_for_occupation: 1.858709068467291,
  },
  {
    term: 'arbetslivserfarenhet',
    percent_for_occupation: 1.8224061569737893,
  },
];
const labels = inputData.map(
//Valfritt att ändra koden till vad vi vill, det är bara för representation, ej logik
  item => item.term[0].toUpperCase() + item.term.slice(1, 20) + ' ' + item.percent_for_occupation.toFixed(2) + '%'
);

// Använder inputData.percent_for_occupation for data values
const dataValues = inputData.map(item => parseFloat(item.percent_for_occupation.toFixed(1)));

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

const ChartPie = () => {
  return (
    <Pie data={data}/> //skriv options={chartOptions} om vi vill använda oss av det
  )
}

export default ChartPie