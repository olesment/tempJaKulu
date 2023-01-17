import React, { useEffect, useState } from "react";
import Diagram from './Diagram';
import { TemperatureToJSON, ConsumptionToJSON } from './UtilsDaily';


// lubatud faili laiendid
const allowedExtensions = ["csv", "vnd.ms-excel"];

const App = () => {
	const [temperaturedata, setTempratureData] = useState([]);
	const [energydata, setEnergyData] = useState([]);
	const [error, setError] = useState("");
	const [file, setFile] = useState("");

	const handleFileChange = (e) => {
		setError("");
		if (e.target.files.length) {
			const inputFile = e.target.files[0];

			// kas fail on csv laiendiga? 
			const fileExtension = inputFile?.type.split("/")[1];
			console.log(inputFile, fileExtension);
			if (!allowedExtensions.includes(fileExtension)) {
				setError("Ainult CSV laiendiga failid sobivad");
				return;
			}

			// kui jah, siis loeme
			setFile(inputFile);
		}
	};


	const handleTemperature = () => {
		// kontrollime, et fail on olemas
		if (!file) return setError("Temperatuuri fail on puudu");
		// uus fileReader
		const reader = new FileReader();
		// algväärtustame
		reader.onload = async ({ target }) => {
			const temperatureJSON = TemperatureToJSON(target.result);

			//console.log(temperatureJSON);
			setTempratureData(temperatureJSON);

		};
		// käivitame
		reader.readAsText(file);
	};

	const handleEnergy = () => {
		// kontrollime, et fail on olemas
		if (!file) return setError("Energakulu fail on puudu");
		// uus fileReader
		const reader = new FileReader();
		// algväärtustame
		reader.onload = async ({ target }) => {
			const energyJSON = ConsumptionToJSON(target.result, temperaturedata);

			console.table(energyJSON);
			setEnergyData(energyJSON);

		};
		// käivitame
		reader.readAsText(file);
	};
	useEffect(() => {
		console.log(temperaturedata);
	}, [temperaturedata]);
	
	useEffect(() => {
		console.log(energydata);
	}, [energydata]);

	function drawDiagram() {

		let names = temperaturedata.map(({ Time }) => Time)
		let temperatureValues = temperaturedata.map(({ Temperature }) => Temperature)
		let kwhValues = energydata.map(({ EnergyConsumption }) => EnergyConsumption)
		
		return <Diagram names={names} tempValues={temperatureValues} kwhValues={ kwhValues}/>



	}

	return (
		<div>

			<div>
				Tekkinud vead:
				<div style={{color: "red" }}>{error}</div>
			</div>
			<div>
				<label htmlFor="tempcsv" style={{ display: "block" }}>
					Lae üles temperatuuride fail CSV formaadis.
				</label>
				<input
					onChange={handleFileChange}
					id="tempcsv"
					name="file"
					type="File"
				/>
				<div>
					<button onClick={handleTemperature}>Loe</button>
				</div>
			</div>

			<div>
				<label htmlFor="energycsv" style={{ display: "block" }}>
					Lae üles temperatuuride fail CSV formaadis.
				</label>
				<input
					onChange={handleFileChange}
					id="energycsv"
					name="file"
					type="File"
				/>
				<div>
					<button onClick={handleEnergy}>Loe</button>
				</div>
			</div>

			<div>{drawDiagram()}</div><br />
		</div>
	);
};

export default App;
