const fs = require("fs");

const { getPlacesWithImage } = require("./mint");

async function resetPlaces() {
  const response = await getPlacesWithImage();
  const data = await response.json();

  fs.writeFileSync(
    "./public/places.json",
    JSON.stringify(data.results, null, 2)
  );

  console.log("places reset");
}

async function main() {
  console.log("resetting places...");

  await resetPlaces();
}

main().then(() => console.log("end"));
