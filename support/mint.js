require("dotenv").config();

const MINT_API = process.env.NEXT_PUBLIC_MINT_API;

async function getPlacesWithImage() {
  return fetch(`${MINT_API}/places/?image_empty=false`);
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
  getPlacesWithImage,
};
