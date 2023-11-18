import Image from "next/image";

import places from "../public/places.json";

export default function Home() {
  const styles = {
    container: { maxWidth: 800, margin: "0 auto", padding: 12 },
    color: {
      primary: "#ff0000",
      secondary: "#2d5d2a",
      gray: "#d1d1d1",
    },
  };

  return (
    <div>
      <header
        style={{
          borderBottom: `1px solid ${styles.color.gray}`,
          padding: "20px 0",
        }}
      >
        <h1 style={styles.container}>
          Restaurantes, Cafés y Bares en{" "}
          <span style={{ color: styles.color.primary }}>Playas Tijuana</span>
        </h1>
      </header>

      <main style={styles.container}>
        <h2 style={{ color: styles.color.secondary }}>
          La mejor comida de Tijuana se cocina en Playas de Tijuana.
        </h2>
        <section>
          {places.map((place, index) => (
            <div key={place.place_id}>
              <Image
                priority={index === 0}
                src={place.image}
                width={400}
                height={400}
                alt={place.name}
              />
              <h2>{place.name}</h2>
              <p>{place.vicinity}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
