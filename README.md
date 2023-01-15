# Õuetemperatuuri ja elektriandmete sidumise rakendus
Loodud rakendus võimaldab võtta Eleringi lehelt tarbimispunkti andmed (kuni 3 kuud) ning siduda need Netatmo ilmajaama mõõteandmetega. Praeguses versioonis, et pilt liiga kirjuks ei läheks on lahendus teostatud päeva põhiselt. Energiakulu liidetakse. Temperatuuri osas arvutatakse päeva keskmine. 

## App.js
Peamine rakenduse fail. 

## UtilsDaily.js
* UtilsDaily TemperatureToJSON() oskab tõlgendada Netatmo ilmajaama CSV faile. Tagastatav formaat on:
```
[{
  "Time": "01.12.2022",
  "Temperature": "-2.5",
  "EnergyConsumption": 0
},
{
  "Time": "02.12.2022",
  "Temperature": "-7.0",
  "EnergyConsumption": 0
}]
```
* UtilsDaily ConsumptionToJSON() oskab tõlgendada Eleringi lehelt saadavaid CSV faile. Tagastatav formaat on:
```
[{
  "Time": "01.12.2022",
  "Temperature": "-2.5",
  "EnergyConsumption": "36.580"
},
{
  "Time": "02.12.2022",
  "Temperature": "-7.0",
  "EnergyConsumption": "55.745"
}]
```
## Diagram
Diagram.js koostab joondiagrammi energiakulu ja temperatuuri kohta. 