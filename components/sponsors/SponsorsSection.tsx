"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function SponsorsSection() {
  const [sponsors, setSponsors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSponsors = async () => {
    const { data } = await supabase
      .from("sponsors")
      .select("*")
      .order("priority", { ascending: true }); // optional

    if (data) setSponsors(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSponsors();
  }, []);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-400">Loading sponsors…</p>
      </section>
    );
  }

  if (!sponsors.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 mt-24 mb-10">
      <h2 className="text-3xl font-extrabold text-white text-center mb-10">
        Sponsors
      </h2>

      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-8">
        {sponsors.map((sp) => (
          <a
            key={sp.id}
            href={sp.url || "#"}
            target="_blank"
            className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col items-center hover:shadow-lg transition"
          >
            <img
              src={sp.logo}
              alt={sp.name}
              className="w-28 h-28 object-contain mb-4"
            />
            <p className="text-gray-900 font-semibold text-center">{sp.name}</p>
            <p className="text-gray-500 text-sm text-center">{sp.category}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
