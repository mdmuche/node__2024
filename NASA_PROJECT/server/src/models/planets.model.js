const fs = require("fs");
const path = require("path");

const { parse } = require("csv-parse");

const planets = require("../models/planets.mongo");

function isHabitable(planet) {
  return (planet["koi_disposition"] =
    "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6);
}

/*
const promise = new Promise((resolve, reject) => {
  resolve(42)
})
promise.then((result) => {

})
const result = await promise;
console.log(result)
*/

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          Comment: "#",
          columns: true,
        })
      ) // destination of stream, gotten from the csv source
      .on("data", async (data) => {
        if (isHabitable(data)) {
          savePlanet(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", async () => {
        const countPlanetsFound = (await getAllPlanets()).length;
        console.log(`${countPlanetsFound.length} habitable planets found`);
        resolve();
      });
  });
}

async function getAllPlanets() {
  return await planets.find({});
}

async function savePlanet(planet) {
  try {
    await planets.updateOne(
      {
        keplerName: planet.kepler_name,
      },
      {
        keplerName: planet.kepler_name,
      },
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.error(`couldn't save planet: ${err}`);
  }
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
