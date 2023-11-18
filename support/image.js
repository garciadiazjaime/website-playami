const { Client } = require("@googlemaps/google-maps-services-js");
const async = require("async");

const { uploadImage } = require("./cloudinary");
const { uploadPlaceImage } = require("./mint");
const { sleep } = require("./misc");

require("dotenv").config();

const MINT_API_URL = process.env.NEXT_PUBLIC_MINT_API;

async function extract() {
  const response = await fetch(
    `${MINT_API_URL}/places/?image_empty=true&gmaps_tries_lower=3&limit=5`
  );
  const data = await response.json();

  return data.results;
}

async function transform(places) {
  const client = new Client({});

  await async.eachSeries(places, async (place) => {
    await sleep();

    console.log(`processing image [${place.pk}]: ${place.name}`);

    const params = {
      photoreference: place.photo_reference,
      maxwidth: 1600,
      key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    };

    const googleResponse = await client
      .placePhoto({ params })
      .catch((error) => console.log(error));

    if (googleResponse?.status !== 200) {
      console.log(`google image not found: ${place.name}`);
      await uploadPlaceImage(place.pk);
      return;
    }

    console.log(`google image found: ${place.name} [${googleResponse.status}]`);

    const cloudinaryResponse = await uploadImage(googleResponse.data).catch(
      (error) => console.log(error)
    );

    if (!cloudinaryResponse) {
      console.log(`cloudinary error: ${place.name}`);
      await uploadPlaceImage(place.pk);
      return;
    }
    console.log(`cloudinary saved: ${place.name}`);

    const mintResponse = await uploadPlaceImage(
      place.pk,
      cloudinaryResponse.secure_url
    ).catch((error) => console.log(error));

    if (!mintResponse) {
      console.log(`mint error: ${place.name}`);
      await uploadPlaceImage(place.pk);
      return;
    }

    console.log(`image saved: ${place.name} [${mintResponse.status}]`);
  });
}

async function main() {
  console.log("starting...");

  const places = await extract();

  await transform(places);
}

main().then(() => {
  console.log("end");
});
