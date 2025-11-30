"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

export default function UpcomingFixtures() {
  const [fixtures, setFixtures] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTeams = async () => {
    const { data } = await supabase.from("teams").select("*");
    if (data) setTeams(data);
  };

  const fetchFixtures = async () => {
    const { data, error } = await supabase
      .from("fixtures")
      .select("*")
      .eq("status", "upcoming")
      .order("date_time", { ascending: true })
      .limit(3);

    if (!error && data) setFixtures(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTeams();
    fetchFixtures();
  }, []);

  const getTeam = (id: string) => teams.find((t) => t.id === id);

  if (loading) {
    return (
      <section className="text-center py-20 text-gray-500">Loading fixtures…</section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 mt-24">
      <h2 className="text-3xl font-extrabold text-white text-center mb-10">
        Upcoming Fixtures
      </h2>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-8">
        {fixtures.map((fixture) => {
          const teamA = getTeam(fixture.team_a);
          const teamB = getTeam(fixture.team_b);

          return (
            <div
              key={fixture.id}
              className="bg-white rounded-xl border border-gray-200 shadow-md p-6"
            >
              {/* Header */}
              <div className="text-center mb-6">
                <p className="text-xs text-gray-500">Match #{fixture.match_no}</p>
                <p className="font-semibold text-gray-900 mt-1">
                  {new Date(fixture.date_time).toLocaleString("en-AU")}
                </p>
                <p className="text-xs text-gray-600">{fixture.venue}</p>
              </div>

              {/* Teams */}
              <div className="flex items-center justify-between px-2">
                {/* Team A */}
                <div className="flex flex-col items-center">
                  <img
                    src={teamA?.logo}
                    className="w-16 h-16 rounded-full object-cover border border-gray-300"
                  />
                  <p className="mt-2 text-gray-900 text-sm font-semibold">
                    {teamA?.name}
                  </p>
                </div>

                {/* VS */}
                <span className="font-bold text-gray-700 text-xl">VS</span>

                {/* Team B */}
                <div className="flex flex-col items-center">
                  <img
                    src={teamB?.logo}
                    className="w-16 h-16 rounded-full object-cover border border-gray-300"
                  />
                  <p className="mt-2 text-gray-900 text-sm font-semibold">
                    {teamB?.name}
                  </p>
                </div>
              </div>

              {/* Button */}
              <div className="flex justify-center mt-8">
                <Button
                  asChild
                  className="bg-cyan-500 hover:bg-cyan-400 text-white rounded-full px-5"
                >
                  <a href={`/fixtures/${fixture.id}`}>View Fixture</a>
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Fixtures Button */}
      <div className="text-center mt-10">
        <Button
          asChild
          variant="outline"
          className="text-cyan-400 border-cyan-400 hover:bg-cyan-400 hover:text-black rounded-full"
        >
          <a href="/fixtures">Full Fixtures</a>
        </Button>
      </div>
    </section>
  );
}
