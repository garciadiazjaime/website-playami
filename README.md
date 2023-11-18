# Playami

[Restaurantes en Playas de Tijuana](http://www.playami.com/)

## Installation

- Install [nvm](https://formulae.brew.sh/formula/nvm)

```bash
brew install nvm
```

- Activate node version

```bash
nvm use
```

- Install packages

```bash
npm i
```

## Run

```bash
npm run dev
```

## ETLs

**Note**: Add expected environment variables `.env`.

**Note**: [MINT API](https://github.com/garciadiazjaime/django-models) needs to be running.

- Places

Gets places from google maps based on `lat,lng` and `radius`.

```bash
npm run places
```

- Image

Get image from google api for a specific place.

```bash
npm run image
```

- Reset

Hits API and resets public json for places.

```bash
npm run reset
```

## Powered by

### Garita Center

[Reporte de Garitas Tijuana](https://www.garitacenter.com/)

### Feedmetj

[Restaurantes en Tijuana?](https://www.feedmetj.com/)

### El Valle de Guadalupe

[La Ruta del Vino Ensenada](https://www.larutadelvinoensenada.com/)

### Mint IT Media

[Desarrollo Web en Tijuana](https://www.mintitmedia.com/)

### Volkswagen Chicago

[Volkswagen Chicago](https://volkswagen-chicago.mintitmedia.com/)

### Coupons and Promo Codes for Papa Johns

[Coupons and Promo Codes for Papa Johns](https://coupons.garitacenter.com/)

### Chicago Food

[Chicago Food](https://chicago-food.mintitmedia.com/)

### Chicago Live Music Events

[Chicago Live Music Events](https://livemusic.mintitmedia.com/)
