import List from "../../../components/list";

export async function generateStaticParams() {
  return [{ slug: "restaurant" }, { slug: "cafe" }, { slug: "bar" }];
}

export default function Page({ params }: { params: { slug: string } }) {
  return <List slug={params.slug} />;
}
