import {Line} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function Diagram(props){
			return <Line data={{
      datasets: [
        {
          label: "Temperatuur:",
          data: props.tempValues,
          backgroundColor: "rgba(15, 10, 150, 1)",
        },        {
          label: "Energiakulu:",
          data: props.kwhValues,
          backgroundColor: "rgba(150, 10, 150, 1)",
        },
      ],
      labels:props.names,
    }}  />
}

export default Diagram;
