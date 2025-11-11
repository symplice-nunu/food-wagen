import Head from "next/head";

import { FoodDashboard } from "@/components/food/FoodDashboard";

export default function Home() {
  return (
    <>
      <Head>
        <title>Food Wagen</title>
        <meta
          name="description"
          content="Discover, add, and manage delicious food options near you."
        />
      </Head>
      <FoodDashboard />
    </>
  );
}
