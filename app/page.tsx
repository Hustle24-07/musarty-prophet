import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Musarty - Trend Predictions 2026",
  description:
    "Predict what will trend in 2026. Get scored in real-time. Win the leaderboard.",
};

const Home = () => (
  <main className="flex min-h-screen items-center justify-center bg-background">
    <Link
      className="rounded-xl bg-purple-600 px-8 py-4 font-bold text-2xl text-white shadow-lg transition hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
      href="/dashboard"
    >
      PREDICT NOW
    </Link>
  </main>
);

export default Home;
