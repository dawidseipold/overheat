import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const health = useQuery({
    queryKey: ["health"],
    queryFn: async () => {
      const { data, error } = await api.api.health.get();
      if (error) throw error;
      return data;
    },
  });

  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-semibold">Starter</h1>
      <p className="text-muted-foreground">
        API: {health.isPending ? "łączenie…" : health.isError ? "brak połączenia" : health.data.status}
      </p>
      <Button onClick={() => health.refetch()}>Odśwież</Button>
    </main>
  );
}
