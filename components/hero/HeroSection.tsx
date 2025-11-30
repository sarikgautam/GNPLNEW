"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { getCountdown } from "@/lib/countdown";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

type CountdownState = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  started: boolean;
};

export default function HeroSection() {
  const [season, setSeason] = useState<any>(null);
  const [countdown, setCountdown] = useState<CountdownState | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSeason = async () => {
    const { data, error } = await supabase
      .from("seasons")
      .select("*")
      .eq("active", true)
      .single();

    if (!error && data) {
      setSeason(data);
      setCountdown(getCountdown(data.start_date));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSeason();
  }, []);

  useEffect(() => {
    if (!season?.start_date) return;

    const interval = setInterval(() => {
      setCountdown(getCountdown(season.start_date));
    }, 1000);

    return () => clearInterval(interval);
  }, [season?.start_date]);

  const bgImage = season?.hero_bg || "/gnpl-default-hero.jpg";

  // CLEAN, MINIMAL loading screen
  if (loading) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center bg-black">
        <p className="text-gray-400">Loading...</p>
      </section>
    );
  }

  return (
    <section
      className="relative min-h-[80vh] flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Clean dark overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />

      <div className="relative z-10 max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* League Tag */}
          <div className="inline-block mb-4 px-4 py-1 rounded-full bg-white/10 border border-white/20 text-xs uppercase tracking-widest text-gray-200">
            Gold Coast Nepalese Premier League
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow">
            GNPL <span className="text-cyan-300">Season 2</span>
          </h1>

          {/* Sub Heading */}
          <p className="mt-4 text-gray-200 text-sm md:text-base max-w-xl mx-auto">
            The biggest Nepalese cricket league on the Gold Coast — high energy,
            massive hits, fierce competition. One champion.
          </p>

          {/* COUNTDOWN */}
          {!countdown?.started ? (
            <div className="mt-10">
              <p className="text-gray-300 text-xs uppercase tracking-widest mb-3">
                Season starts in
                          </p>

                          <div className="flex justify-center gap-4">
                              {countdown && [
                                  { label: "Days", value: countdown.days },
                                  { label: "Hours", value: countdown.hours },
                                  { label: "Minutes", value: countdown.minutes },
                                  { label: "Seconds", value: countdown.seconds },
                              ].map((item) => (
                                  <div
                                      key={item.label}
                                      className="w-16 md:w-20 h-16 md:h-20 bg-white/10 border border-white/20 rounded-xl flex flex-col items-center justify-center"
                                  >
                                      <span className="text-white text-xl md:text-2xl font-bold">
                                          {item.value.toString().padStart(2, "0")}
                                      </span>
                                      <span className="text-gray-300 text-[10px] uppercase mt-1">
                                          {item.label}
                                      </span>
                                  </div>
                              ))}
                          </div>

                      </div>
                  ) : (
            <div className="mt-8 px-4 py-2 rounded-full bg-green-500/20 border border-green-400/30 text-green-300 font-semibold inline-block">
              Season is Live!
            </div>
          )}

          {/* CTA BUTTON */}
          <div className="mt-10">
            <Button
              asChild
              className="px-8 py-5 text-base md:text-lg font-semibold bg-cyan-400 hover:bg-cyan-300 text-black rounded-full shadow-md"
            >
              <a href="/fixtures">View Fixtures</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
