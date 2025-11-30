"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

export default function LatestResults() {
  const [results, setResults] = useState<any[]>([]);
  const [fixtures, setFixtures] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const { data: teamData } = await supabase.from("teams").select("*");
    const { data: fixtureData } = await supabase.from("fixtures").select("*");
    const { data: resultData } = await supabase
      .from("results")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(3);

    setTeams(teamData || []);
    setFixtures(fixtureData || []);
    setResults(resultData || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getFixture = (id: string) => fixtures.find((f) => f.id === id);
  const getTeam = (id: string) => teams.find((t) => t.id === id);

  return (
    <section className="max-w-7xl mx-auto px-4 mt-24">
      <h2 className="text-3xl font-extrabold text-white text-center mb-10">
        Latest Results
      </h2>

      {loading && (
        <p className="text-center text-gray-400">Loading results…</p>
      )}

      {!loading && results.length === 0 && (
        <p className="text-center text-gray-400">No completed matches yet.</p>
      )}

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-8">
        {results.map((result) => {
          const fixture = getFixture(result.match_id);
          if (!fixture) return null;

          const teamA = getTeam(fixture.team_a);
          const teamB = getTeam(fixture.team_b);
          const winner = getTeam(result.winner);

          return (
            <div
              key={result.id}
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
              <div className="flex items-center justify-between px-2 mb-4">
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

              {/* Score Summary */}
              <p className="text-center text-sm text-gray-600 italic">
                {result.score_summary}
              </p>

              {/* Winner */}
              <p className="text-center mt-3 text-gray-900 font-semibold">
                Winner:{" "}
                <span className="text-green-600 font-bold">
                  {winner?.name}
                </span>
              </p>

              {/* Button */}
              <div className="flex justify-center mt-6">
                <Button
                  asChild
                  className="bg-green-500 hover:bg-green-400 text-white rounded-full px-5"
                >
                  <a href={`/fixtures/${fixture.id}`}>View Scorecard</a>
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
