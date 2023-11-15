const { Client } = require("@googlemaps/google-maps-services-js");
const async = require("async");

require("dotenv").config();

const MINT_API = process.env.NEXT_PUBLIC_MINT_API;

async function extract() {
  const client = new Client({});

  const params = {
    location: [32.52062245295867, -117.11616925652653],
    radius: 5_000,
    type: "restaurant",
    key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  };

  return client.placesNearby({ params }).then(async (response) => {
    console.log(response.status);
    if (!response.status === 200) {
      console.log(`maps return invalid code: ${response.status}`);
      console.log(response);
      return;
    }

    return response.data.results;
  });
}

function transform(items) {
  const places = items.reduce((accu, place) => {
    if (place.permanently_closed) {
      return accu;
    }

    accu.push({
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
    });

    return accu;
  }, []);

  return places;
}

async function load(places) {
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
      console.log(`place saved: ${place.name}`);
    }
  });
}

async function main() {
  const response = await extract().catch((error) => {
    console.log(error);
  });

  if (!response) {
    return;
  }

  const places = transform(response);

  await load(places);
}

main().then(() => {
  console.log("end");
});
