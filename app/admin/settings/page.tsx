"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SeasonSettings() {
  const [loading, setLoading] = useState(false);
  const [season, setSeason] = useState({
    id: "",
    title: "",
    start_date: "",
    active: false,
    hero_bg: "",
  });

  // Fetch active season
  const fetchSeason = async () => {
    const { data, error } = await supabase
      .from("seasons")
      .select("*")
      .eq("active", true)
      .single();

    if (!error && data) {
      setSeason(data);
    }
  };

  useEffect(() => {
    fetchSeason();
  }, []);

  // Upload Image
  const uploadBanner = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const filePath = `${season.id}/${file.name}`;

    const { data, error } = await supabase.storage
      .from("season-banners")
      .upload(filePath, file, { upsert: true });

    if (!error) {
      const imageUrl =
        supabase.storage.from("season-banners").getPublicUrl(filePath).data
          .publicUrl;

      setSeason({ ...season, hero_bg: imageUrl });
    }
  };

  // Save Settings
  const saveSeason = async () => {
    setLoading(true);

    const { error } = await supabase
      .from("seasons")
      .update({
        title: season.title,
        start_date: season.start_date,
        active: season.active,
        hero_bg: season.hero_bg,
      })
      .eq("id", season.id);

    setLoading(false);
    if (!error) alert("Season updated!");
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Season Settings</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">

          {/* Season Name */}
          <div>
            <label>Season Name</label>
            <Input
              value={season.title}
              onChange={(e) =>
                setSeason({ ...season, title: e.target.value })
              }
            />
          </div>

          {/* Start Date */}
          <div>
            <label>Season Start Date</label>
            <Input
              type="date"
              value={season.start_date}
              onChange={(e) =>
                setSeason({ ...season, start_date: e.target.value })
              }
            />
          </div>

          {/* Active Toggle */}
          <div className="flex items-center gap-4">
            <Switch
              checked={season.active}
              onCheckedChange={(val) =>
                setSeason({ ...season, active: val })
              }
            />
            <span>Set this as active season</span>
          </div>

          {/* Background Image Upload */}
          <div>
            <label>Hero Background</label>
            <Input type="file" accept="image/*" onChange={uploadBanner} />
            {season.hero_bg && (
              <img
                src={season.hero_bg}
                className="mt-3 w-full rounded-lg"
                alt="Banner Preview"
              />
            )}
          </div>

          <Button onClick={saveSeason} disabled={loading}>
            {loading ? "Saving..." : "Save Settings"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
