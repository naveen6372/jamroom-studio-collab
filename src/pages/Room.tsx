
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface RoomData {
  id: string;
  title: string;
  bpm: number;
  key_signature: string;
  is_public: boolean;
  created_at: string;
}

const Room = () => {
  const { id } = useParams<{ id: string }>();
  const [room, setRoom] = useState<RoomData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const { data, error } = await supabase
          .from("jam_rooms")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          throw new Error(error.message);
        }

        setRoom(data as RoomData);
      } catch (err: any) {
        console.error("Error fetching room:", err);
        setError("Could not load the jam room. It might not exist or you don't have access.");
        toast.error("Failed to load jam room");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRoomData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container py-16 text-center">
        <div className="animate-pulse">
          <h2 className="text-2xl font-bold">Loading jam room...</h2>
        </div>
      </div>
    );
  }

  if (error || !room) {
    return (
      <div className="container py-16 text-center">
        <h2 className="text-2xl font-bold text-destructive">Room Not Found</h2>
        <p className="mt-4">{error || "This jam room doesn't exist or you don't have permission to view it."}</p>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold">{room.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
          <h2 className="text-xl font-bold mb-4">Room Details</h2>
          <div className="space-y-2">
            <p><span className="font-medium">BPM:</span> {room.bpm}</p>
            <p><span className="font-medium">Key:</span> {room.key_signature}</p>
            <p><span className="font-medium">Visibility:</span> {room.is_public ? "Public" : "Private"}</p>
            <p><span className="font-medium">Created:</span> {new Date(room.created_at).toLocaleString()}</p>
          </div>
        </div>
        <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
          <h2 className="text-xl font-bold mb-4">Audio Controls</h2>
          <p>Audio recording and mixing features will be implemented here.</p>
        </div>
      </div>
    </div>
  );
};

export default Room;
