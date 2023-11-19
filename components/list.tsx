import Image from "next/image";
import Link from "next/link";

import restaurants from "../public/restaurant.json";
import cafe from "../public/cafe.json";
import bar from "../public/bar.json";

function getData(slug: string) {
  if (slug === "cafe") {
    return { title: "Cafecito", places: cafe };
  }

  if (slug === "bar") {
    return { title: "Drinks", places: bar };
  }

  return {
    title: "Comida",
    places: restaurants,
  };
}

export default function List(props: { slug: string }) {
  const { slug } = props;

  const styles = {
    container: { maxWidth: 800, margin: "0 auto", padding: "0 12px" },
    color: {
      primary: "#f67570",
      secondary: "#2d5d2a",
      gray: "#d1d1d1",
    },
    menu: {
      fontSize: 20,
      padding: 12,
      flex: 1,
      color: "black",
      textDecoration: "none",
      display: "flex",
      justifyContent: "center",
    },
    menuActive: {
      borderBottom: "1px solid black",
    },
  };

  const { places, title } = getData(slug);

  return (
    <>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px 0",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          background: "white",
        }}
      >
        <Link
          href="/comida/restaurant/"
          style={{
            ...styles.menu,
            ...(slug === "restaurant" || !slug ? styles.menuActive : {}),
          }}
        >
          Restaurantes
        </Link>
        <Link
          href="/comida/cafe/"
          style={{
            ...styles.menu,
            ...(slug === "cafe" ? styles.menuActive : {}),
          }}
        >
          Cafés
        </Link>
        <Link
          href="/comida/bar/"
          style={{
            ...styles.menu,
            ...(slug === "bar" ? styles.menuActive : {}),
          }}
        >
          Bares
        </Link>
      </nav>

      <h1 style={{ ...styles.container, marginTop: 100, fontSize: 28 }}>
        <span style={{ color: styles.color.primary }}>{title}</span> en Playas
        Tijuana
      </h1>

      <main>
        {places.map((place, index) => (
          <article
            key={place.place_id}
            style={{ borderBottom: "2px solid #CCC", margin: "24px 0" }}
          >
            <Image
              priority={index === 0}
              src={place.image}
              width={400}
              height={400}
              alt={place.name}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
              }}
            />
            <div style={styles.container}>
              <h2>{place.name}</h2>
              <p>{place.vicinity}</p>
            </div>
          </article>
        ))}
      </main>

      <footer>
        <h3 style={{ color: styles.color.secondary }}>
          La mejor comida de Tijuana se cocina en Playas de Tijuana.
        </h3>
      </footer>
    </>
  );
}
