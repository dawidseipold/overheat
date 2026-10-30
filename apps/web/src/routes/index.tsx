import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <main>
      <h1 className="text-2xl font-semibold">Overheat</h1>
    </main>
  );
}