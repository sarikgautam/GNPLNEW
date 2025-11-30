"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

export default function TeamsSection() {
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTeams = async () => {
    const { data } = await supabase.from("teams").select("*").order("name", { ascending: true });
    if (data) setTeams(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-400">Loading teams…</p>
      </section>
    );
  }

  if (!teams.length) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Teams</h2>
        <p className="text-gray-400">No teams available.</p>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 mt-24">
      <h2 className="text-3xl font-extrabold text-white text-center mb-10">
        Teams
      </h2>

      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-8">
        {teams.map((team) => (
          <div
            key={team.id}
            className="
              bg-white 
              rounded-xl 
              shadow-md 
              p-6 
              border border-gray-200 
              hover:shadow-lg 
              transition
            "
          >
            {/* Logo */}
            <div className="flex justify-center mb-4">
              <img
                src={team.logo}
                alt={team.name}
                className="w-24 h-24 rounded-full object-cover border border-gray-300"
              />
            </div>

            {/* Team Name */}
            <h3 className="text-xl font-semibold text-center text-gray-900 mb-4">
              {team.name}
            </h3>

            {/* Info */}
            <div className="space-y-1 text-sm text-gray-700 text-center">
              <p>
                <span className="font-semibold text-gray-900">Captain:</span>{" "}
                {team.captain}
              </p>
              <p>
                <span className="font-semibold text-gray-900">Owner:</span>{" "}
                {team.owner}
              </p>
              <p>
                <span className="font-semibold text-gray-900">Rank:</span>{" "}
                {team.last_season_rank}
              </p>
            </div>

            {/* Button */}
            <div className="flex justify-center mt-6">
              <Button
                asChild
                className="
                  bg-cyan-500 
                  hover:bg-cyan-400 
                  text-white 
                  font-semibold 
                  rounded-full 
                  px-6
                "
              >
                <a href={`/teams/${team.id}`}>View Squad</a>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
