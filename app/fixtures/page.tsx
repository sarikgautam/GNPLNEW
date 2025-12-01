"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

export default function FixturesPage() {
  const [fixtures, setFixtures] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTeams = async () => {
    const { data } = await supabase.from("teams").select("*");
    if (data) setTeams(data);
  };

  const fetchFixtures = async () => {
    const { data } = await supabase
      .from("fixtures")
      .select("*")
      .order("date_time", { ascending: true });

    if (data) setFixtures(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTeams();
    fetchFixtures();
  }, []);

  const getTeam = (id: string) => teams.find((t) => t.id === id);

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-center mb-12 text-green-400">
        Fixtures
      </h1>

      {loading && (
        <p className="text-center text-gray-500">Loading fixtures…</p>
      )}

      <div className="grid md:grid-cols-2 gap-10">
        {fixtures.map((match) => {
          const A = getTeam(match.team_a);
          const B = getTeam(match.team_b);

          return (
            <div
              key={match.id}
              className="
                backdrop-blur-xl bg-black/20 border border-white/30 
                rounded-2xl shadow-xl p-8 
                transition-all hover:-translate-y-2 hover:shadow-2xl
              "
            >
              {/* Header */}
              <div className="text-center mb-6">
                <p className="text-green-300 font-bold">
                  Match #{match.match_no}
                </p>
                <p className="text-sm text-gray-300 mt-1">
                  {new Date(match.date_time).toLocaleString("en-AU")}
                </p>
                <p className="text-sm text-gray-400">{match.venue}</p>
              </div>

              {/* Teams Row */}
              <div className="flex items-center justify-between px-6">
                <div className="flex flex-col items-center">
                  <img src={A?.logo} className="w-24 h-24 object-contain" />
                  <p className="text-white font-semibold mt-2">{A?.name}</p>
                </div>

                <p className="text-green-400 font-bold text-2xl">VS</p>

                <div className="flex flex-col items-center">
                  <img src={B?.logo} className="w-24 h-24 object-contain" />
                  <p className="text-white font-semibold mt-2">{B?.name}</p>
                </div>
              </div>

              {/* CTA */}
              <div className="text-center mt-6">
                <Link href={`/fixtures/${match.id}`}>
                  <Button className="bg-green-400 text-black hover:bg-green-300">
                    View Fixture
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
