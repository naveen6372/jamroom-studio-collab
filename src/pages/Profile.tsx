
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ChartContainer,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
}

interface UserStats {
  roomsHosted: number;
  loopsRecorded: number;
  mixdownsExported: number;
  averageLoopsPerRoom: number;
}

const CHART_CONFIG = {
  rooms: { 
    label: "Jam Rooms",
    color: "#6366f1" // Indigo
  },
  loops: {
    label: "Loops",
    color: "#8b5cf6" // Violet
  },
  exports: {
    label: "Exports",
    color: "#ec4899" // Pink
  },
  average: {
    label: "Avg Loops/Room",
    color: "#14b8a6" // Teal
  }
};

// Custom tooltip component for the chart
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-3 border border-border rounded-md shadow-md">
        <p className="font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex items-center gap-2 text-sm">
            <div 
              className="h-3 w-3 rounded-full" 
              style={{ backgroundColor: entry.fill }}
            />
            <span>{entry.name}: {entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // In a real app, you would fetch the current user's profile
        // For now, we'll use mock data
        
        // Mock profile data
        const mockProfile: UserProfile = {
          id: "user-1",
          name: "Alex Johnson",
          email: "alex@example.com",
          avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
        };
        
        // Mock user stats
        const mockStats: UserStats = {
          roomsHosted: 12,
          loopsRecorded: 47,
          mixdownsExported: 8,
          averageLoopsPerRoom: 3.9
        };
        
        setProfile(mockProfile);
        setStats(mockStats);
        
        // Create chart data
        setChartData([
          {
            name: "Last Week",
            rooms: 3,
            loops: 8,
            exports: 1,
            average: 2.7
          },
          {
            name: "This Week",
            rooms: 4,
            loops: 15,
            exports: 2,
            average: 3.8
          },
          {
            name: "All Time",
            rooms: mockStats.roomsHosted,
            loops: mockStats.loopsRecorded,
            exports: mockStats.mixdownsExported,
            average: mockStats.averageLoopsPerRoom
          }
        ]);
        
      } catch (err) {
        console.error("Error fetching profile:", err);
        toast.error("Could not load profile data");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfileData();
  }, []);

  if (loading) {
    return (
      <div className="container py-16 text-center">
        <div className="animate-pulse">
          <h2 className="text-2xl font-bold">Loading profile...</h2>
        </div>
      </div>
    );
  }
  
  if (!profile || !stats) {
    return (
      <div className="container py-16 text-center">
        <h2 className="text-2xl font-bold text-destructive">Profile Not Found</h2>
        <p className="mt-4">Could not load profile information</p>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
        <Avatar className="h-24 w-24">
          <AvatarImage src={profile.avatar_url} alt={profile.name} />
          <AvatarFallback>{profile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        
        <div>
          <h1 className="text-3xl font-bold">{profile.name}</h1>
          <p className="text-muted-foreground">{profile.email}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
          <div className="text-muted-foreground mb-1">Jam Rooms Hosted</div>
          <div className="text-3xl font-bold">{stats.roomsHosted}</div>
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
          <div className="text-muted-foreground mb-1">Loops Recorded</div>
          <div className="text-3xl font-bold">{stats.loopsRecorded}</div>
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
          <div className="text-muted-foreground mb-1">Mixdowns Exported</div>
          <div className="text-3xl font-bold">{stats.mixdownsExported}</div>
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
          <div className="text-muted-foreground mb-1">Avg Loops/Session</div>
          <div className="text-3xl font-bold">{stats.averageLoopsPerRoom}</div>
        </div>
      </div>
      
      <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
        <h2 className="text-xl font-bold mb-6">Activity Overview</h2>
        
        <ChartContainer config={CHART_CONFIG} className="h-[350px]">
          <ResponsiveContainer>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 30 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="rooms" fill={CHART_CONFIG.rooms.color} />
              <Bar dataKey="loops" fill={CHART_CONFIG.loops.color} />
              <Bar dataKey="exports" fill={CHART_CONFIG.exports.color} />
              <Bar dataKey="average" fill={CHART_CONFIG.average.color} />
            </BarChart>
          </ResponsiveContainer>
          
          <ChartLegend
            verticalAlign="bottom"
            content={<ChartLegendContent />}
          />
        </ChartContainer>
      </div>
    </div>
  );
};

export default Profile;
