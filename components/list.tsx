import Image from "next/image";
import Link from "next/link";

import restaurants from "../public/restaurant.json";
import cafe from "../public/cafe.json";
import bar from "../public/bar.json";

import cssRules from "./list.module.css";

function getData(slug: string) {
  if (slug === "cafe") {
    return { places: cafe };
  }

  if (slug === "bar") {
    return { places: bar };
  }

  return {
    places: restaurants,
  };
}

export default function List(props: { slug: string }) {
  const { slug } = props;

  const color = {
    primary: "#f67570",
    secondary: "#2d5d2a",
    gray: "#d1d1d1",
  };
  const styles = {
    container: { maxWidth: 800, margin: "0 auto", padding: "0 12px" },

    menu: {
      fontSize: 20,
      padding: 12,
      flex: 1,
      color: "black",
      textDecoration: "none",
    },
    menuActive: {
      color: color.primary,
    },
  };

  const { places } = getData(slug);

  return (
    <>
      <nav
        className={cssRules.menu}
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "12px",
          position: "fixed",
          top: 0,
          left: 0,
          background: "white",
          flexDirection: "column",
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

      <main style={{ maxWidth: 700, margin: "0 auto" }}>
        {places.map((place, index) => (
          <article
            key={place.place_id}
            style={{ borderBottom: "2px solid #CCC", marginBottom: 24 }}
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
        <h3 style={{ color: color.secondary }}>
          La mejor comida de Tijuana se cocina en Playas de Tijuana.
        </h3>
      </footer>
    </>
  );
}
