const { Client } = require("@googlemaps/google-maps-services-js");
const async = require("async");

const { sleep } = require("./misc");

require("dotenv").config();

const MINT_API = process.env.NEXT_PUBLIC_MINT_API;

async function extract(type, pagetoken) {
  const client = new Client({});

  const params = {
    location: [32.52062245295867, -117.11616925652653],
    radius: 5_000,
    type,
    key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    pagetoken,
  };

  return client.placesNearby({ params }).then(async (response) => {
    if (response.status !== 200) {
      console.log(`maps return invalid code: ${response.status}`);
      console.log(response);
      return;
    }

    return response.data;
  });
}

function transform(items) {
  const places = items.map((place) => ({
    lat: place.geometry?.location?.lat,
    lng: place.geometry?.location?.lng,
    name: place.name,
    photo_reference: place.photos?.[0]?.photo_reference,
    place_id: place.place_id,
    price_level: place.price_level,
    rating: place.rating,
    types: place.types.join("|"),
    user_ratings_total: place.user_ratings_total,
    vicinity: place.vicinity,
    permanently_closed: place.permanently_closed,
  }));

  return places;
}

async function load(places, type) {
  await async.eachSeries(places, async (place) => {
    const response = await fetch(`${MINT_API}/places/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(place),
    });

    const data = await response.json();
    if (response.status !== 201) {
      console.log("Error saving event");
      console.log(place);
      console.log(data);
    } else {
      console.log(`${type} saved: ${place.name}`);
    }
  });
}

const MAX_ITERATIONS = 3;

async function placesETL(type, iteration = 0, token = "") {
  if ((iteration > 0 && !token) || iteration > MAX_ITERATIONS) {
    console.log(
      `break: type: ${type}, iteration: ${iteration}, is-there-more: ${!!token}`
    );
    return;
  }

  await sleep();
  console.log(`iteration[${type}]: ${iteration}`);

  const response = await extract(type, token).catch((error) => {
    console.log(error);
  });

  if (!response) {
    return;
  }

  const places = transform(response.results);

  await load(places, type);

  if (response.next_page_token) {
    return placesETL(type, iteration + 1, response.next_page_token);
  }
}

async function main() {
  console.log("starting...");
  const types = ["restaurant", "cafe", "bar"];

  await async.eachSeries(types, async (type) => {
    await placesETL(type);
  });
}

main().then(() => {
  console.log("end");
});
