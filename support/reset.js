const fs = require("fs");

const { getPlaces } = require("./mint");
const async = require("async");

async function resetPlaces({ type, query }) {
  const response = await getPlaces(query);
  const data = await response.json();

  fs.writeFileSync(
    `./public/${type}.json`,
    JSON.stringify(data.results, null, 2)
  );

  console.log(`${type} reset`);
}

async function main() {
  console.log("resetting...");

  const types = [
    {
      type: "places",
      query: "image_empty=false",
    },
    {
      type: "restaurant",
      query: "image_empty=false&search=restaurant",
    },
    {
      type: "cafe",
      query: "image_empty=false&search=cafe",
    },
    {
      type: "bar",
      query: "image_empty=false&search=bar",
    },
  ];

  await async.eachSeries(types, async (type) => {
    await resetPlaces(type);
  });
}

main().then(() => console.log("end"));
