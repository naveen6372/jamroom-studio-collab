
import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  Share,
  Export 
} from "lucide-react";

interface RoomData {
  id: string;
  title: string;
  bpm: number;
  key_signature: string;
  is_public: boolean;
  created_at: string;
}

interface Track {
  id: string;
  name: string;
  audioUrl: string;
  createdBy: string;
  createdAt: string;
}

const Room = () => {
  const { id } = useParams<{ id: string }>();
  const [room, setRoom] = useState<RoomData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Audio recording states
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [trackName, setTrackName] = useState("");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const recordingInterval = useRef<number | null>(null);
  
  // Playback states
  const [isPlaying, setIsPlaying] = useState(false);
  const audioElements = useRef<{[key: string]: HTMLAudioElement}>({});
  const [trackVolumes, setTrackVolumes] = useState<{[key: string]: number}>({});
  const [trackMuted, setTrackMuted] = useState<{[key: string]: boolean}>({});

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
        
        // Mock tracks data - in a real app, these would come from the database
        const mockTracks: Track[] = [
          {
            id: "track1",
            name: "Bass Line",
            audioUrl: "https://example.com/bass.mp3",
            createdBy: "User 1",
            createdAt: new Date().toISOString(),
          },
          {
            id: "track2",
            name: "Drums",
            audioUrl: "https://example.com/drums.mp3",
            createdBy: "User 2",
            createdAt: new Date().toISOString(),
          }
        ];
        
        setTracks(mockTracks);
        
        // Initialize track volumes and muted states
        const volumes: {[key: string]: number} = {};
        const muted: {[key: string]: boolean} = {};
        
        mockTracks.forEach(track => {
          volumes[track.id] = 80;
          muted[track.id] = false;
        });
        
        setTrackVolumes(volumes);
        setTrackMuted(muted);
        
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
    
    // Initialize audio context
    const context = new (window.AudioContext || (window as any).webkitAudioContext)();
    setAudioContext(context);
    
    return () => {
      // Clean up recording interval if exists
      if (recordingInterval.current) {
        window.clearInterval(recordingInterval.current);
      }
      
      // Clean up audio elements
      Object.values(audioElements.current).forEach(audio => {
        audio.pause();
        audio.src = "";
      });
      
      // Close audio context
      if (audioContext) {
        audioContext.close();
      }
    };
  }, [id]);

  const startRecording = async () => {
    if (!trackName) {
      toast.error("Please enter a track name before recording");
      return;
    }
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      
      setMediaRecorder(recorder);
      setIsRecording(true);
      setRecordingTime(0);
      audioChunks.current = [];
      
      recorder.addEventListener("dataavailable", (event) => {
        audioChunks.current.push(event.data);
      });
      
      recorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // In a real app, you would upload this to your backend/storage
        const newTrack: Track = {
          id: `track-${Date.now()}`,
          name: trackName,
          audioUrl: audioUrl,
          createdBy: "Current User", // Would come from auth in a real app
          createdAt: new Date().toISOString()
        };
        
        setTracks([...tracks, newTrack]);
        setTrackVolumes({...trackVolumes, [newTrack.id]: 80});
        setTrackMuted({...trackMuted, [newTrack.id]: false});
        setTrackName("");
        
        toast.success("Track recorded successfully");
      });
      
      recorder.start();
      
      // Set up a timer to track recording duration and stop at 30 seconds
      recordingInterval.current = window.setInterval(() => {
        setRecordingTime(prevTime => {
          const newTime = prevTime + 1;
          if (newTime >= 30) {
            stopRecording();
            return 30;
          }
          return newTime;
        });
      }, 1000);
      
    } catch (err) {
      console.error("Error accessing microphone:", err);
      toast.error("Could not access microphone");
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      
      if (recordingInterval.current) {
        window.clearInterval(recordingInterval.current);
        recordingInterval.current = null;
      }
      
      // Stop all tracks on the stream
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
  };
  
  const togglePlay = () => {
    if (isPlaying) {
      // Stop all tracks
      Object.values(audioElements.current).forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
    } else {
      // Play all tracks
      tracks.forEach(track => {
        if (audioElements.current[track.id]) {
          audioElements.current[track.id].play();
        }
      });
    }
    
    setIsPlaying(!isPlaying);
  };
  
  const toggleMute = (trackId: string) => {
    setTrackMuted({
      ...trackMuted,
      [trackId]: !trackMuted[trackId]
    });
    
    if (audioElements.current[trackId]) {
      audioElements.current[trackId].muted = !trackMuted[trackId];
    }
  };
  
  const handleVolumeChange = (trackId: string, value: number[]) => {
    const newVolume = value[0];
    setTrackVolumes({
      ...trackVolumes,
      [trackId]: newVolume
    });
    
    if (audioElements.current[trackId]) {
      audioElements.current[trackId].volume = newVolume / 100;
    }
  };
  
  const exportMix = () => {
    // In a real app, this would mix the audio tracks together
    // For now, we'll just show a success message
    toast.success("Mix exported successfully!");
  };
  
  const shareRoom = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success("Room link copied to clipboard!");
  };

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
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold">{room.title}</h1>
          <div className="flex gap-4 mt-2 text-muted-foreground">
            <div>BPM: {room.bpm}</div>
            <div>Key: {room.key_signature}</div>
            <div>{room.is_public ? "Public" : "Private"}</div>
          </div>
        </div>
        
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" onClick={shareRoom}>
            <Share className="mr-2 h-4 w-4" /> Share
          </Button>
          <Button variant="outline" onClick={exportMix}>
            <Export className="mr-2 h-4 w-4" /> Export Mix
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
          <h2 className="text-xl font-bold mb-4">Record New Track</h2>
          
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input 
                placeholder="Track name" 
                value={trackName} 
                onChange={(e) => setTrackName(e.target.value)} 
                disabled={isRecording}
                className="flex-1"
              />
              
              {isRecording ? (
                <Button 
                  variant="destructive" 
                  onClick={stopRecording}
                >
                  <MicOff className="mr-2 h-4 w-4" />
                  Stop ({30 - recordingTime}s)
                </Button>
              ) : (
                <Button 
                  onClick={startRecording}
                  disabled={!trackName}
                >
                  <Mic className="mr-2 h-4 w-4" />
                  Record
                </Button>
              )}
            </div>
            
            <p className="text-sm text-muted-foreground">
              Record up to 30 seconds of audio to contribute to this jam session.
            </p>
          </div>
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Mixer</h2>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={togglePlay}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isPlaying ? " Stop" : " Play All"}
            </Button>
          </div>
          
          {tracks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No tracks recorded yet. Be the first to contribute!
            </div>
          ) : (
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {tracks.map(track => (
                <div 
                  key={track.id} 
                  className="flex flex-col p-3 border border-border rounded-md"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <div className="font-medium">{track.name}</div>
                      <div className="text-xs text-muted-foreground">by {track.createdBy}</div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => toggleMute(track.id)}
                    >
                      {trackMuted[track.id] ? (
                        <VolumeX className="h-4 w-4" />
                      ) : (
                        <Volume2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Slider 
                      defaultValue={[80]} 
                      value={[trackVolumes[track.id] || 80]}
                      onValueChange={(value) => handleVolumeChange(track.id, value)} 
                      max={100} 
                      step={1} 
                      disabled={trackMuted[track.id]}
                    />
                    <span className="w-8 text-xs text-center">
                      {trackVolumes[track.id] || 80}%
                    </span>
                  </div>
                  
                  <audio 
                    src={track.audioUrl} 
                    ref={(audio) => {
                      if (audio) {
                        audioElements.current[track.id] = audio;
                        audio.volume = (trackVolumes[track.id] || 80) / 100;
                        audio.muted = trackMuted[track.id] || false;
                      }
                    }} 
                    loop
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Room;
