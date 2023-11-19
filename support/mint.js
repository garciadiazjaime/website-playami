require("dotenv").config();

const MINT_API = process.env.NEXT_PUBLIC_MINT_API;

async function getPlaces(query) {
  return fetch(`${MINT_API}/places/?${query}`);
}

async function getRestaurantsWithImage() {
  return fetch(`${MINT_API}/places/?image_empty=false&search=restaurant`);
}

async function uploadPlaceImage(pk, image) {
  return fetch(`${MINT_API}/places/${pk}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ image }),
  });
}

module.exports = {
  uploadPlaceImage,
  getPlaces,
};
