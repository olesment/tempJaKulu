//tuleviku tarbeks, hetkel ei kasutata.
export const ConsumptionToJSON = (data, temperatureData) => {
	const delimiter = ";"
	const skip = 1;
	// eemaldab jutumärgid
	let rows = data.replace(/"|'/g, '').split('\n');
	// jätab vahele päises oleva info
	const m = rows.slice(skip + 1)

	let currentDay = '0';
	let energyArr = [];
    console.table(temperatureData);
	m.forEach(e => {
		const elements = e.split(delimiter);
		
		const kwh = Number(elements[1]);
		const eeDate = elements[0];

		if (currentDay === '0') {
			currentDay = eeDate;
		}
		if (currentDay === eeDate) {
			energyArr.push(kwh);

		} else {
            try{
                const objIndex = temperatureData.findIndex((obj => obj.Time === currentDay));
                temperatureData[objIndex].EnergyConsumption = (energyArr.reduce((a, b) => a + b, 0) / energyArr.length).toFixed(3);

            }
            catch(error){
                console.log('Kirjet ei leitud', currentDay);
            }
			energyArr = [];
			energyArr.push(kwh);
			currentDay = eeDate;

		}

	});
	return temperatureData;

};

export const TemperatureToJSON = (data) => {
	const delimiter = ";"
	const skip = 2;
	// eemaldab jutumärgid
	let rows = data.replace(/"|'/g, '').split('\n');
	// jätab vahele päises oleva info
	const m = rows.slice(skip + 1)

	let currentDay = '0';
	let dailyTemp = [];
	let result = [];
    let hours = 0;
    let daynr = 0;
	m.forEach(e => {
		const elements = e.split(delimiter);
		const day = new Date(elements[1]);
		const temp = Number(elements[2]);
        
        if (day.getHours() <10) {
            hours = `0${day.getHours()}:00`
        } else {
            hours = `${day.getHours()}:00`
        }

        if (day.getDate() <10) {
            daynr = `0${day.getDate()}`
        } else {
            daynr = `${day.getDate()}`
        }

		const eeDate = `${daynr}.${day.getMonth() + 1}.${day.getFullYear()} ${hours}`;

		if (currentDay === '0') {
			currentDay = eeDate;
		}
		if (currentDay === eeDate) {
			//dailyHum.push(humidity);
			dailyTemp.push(temp);

		} else {
			result.push({
				"Time": currentDay,
				"Temperature": (dailyTemp.reduce((a, b) => a + b, 0) / dailyTemp.length).toFixed(1),
                "EnergyConsumption": 0,
			});
			dailyTemp = [];
			dailyTemp.push(temp);
			currentDay = eeDate;

		}

	});
	return result;

};
export default ConsumptionToJSON;