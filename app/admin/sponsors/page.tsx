"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function SponsorsPage() {
  const [sponsors, setSponsors] = useState([]);

  const fetchSponsors = async () => {
    const { data } = await supabase
      .from("sponsors")
      .select("*")
      .order("created_at", { ascending: false });

    setSponsors(data || []);
  };

  useEffect(() => {
    fetchSponsors();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Sponsors</h1>

        <Button asChild>
          <a href="/admin/sponsors/add">Add Sponsor</a>
        </Button>
      </div>

      <div className="space-y-4">
        {sponsors.map((s: any) => (
          <Card key={s.id}>
            <CardContent className="flex justify-between p-4">
              <div>
                <p className="font-semibold">{s.name}</p>
                <p className="text-sm text-gray-600">{s.category}</p>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src={s.logo}
                  className="w-16 h-16 object-contain border rounded"
                />

                <Button asChild variant="outline">
                  <a href={`/admin/sponsors/${s.id}/edit`}>Edit</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
