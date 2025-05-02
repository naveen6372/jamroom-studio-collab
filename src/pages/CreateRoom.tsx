
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Music, CheckCircle } from "lucide-react";

// Form schema validation
const formSchema = z.object({
  title: z.string().min(3, { message: "Room title must be at least 3 characters" }),
  bpm: z.number().min(40, { message: "BPM must be at least 40" }).max(300, { message: "BPM must be at most 300" }),
  key_signature: z.string().min(1, { message: "Please select a key signature" }),
  is_public: z.boolean().default(true),
});

// Define types based on schema
type FormValues = z.infer<typeof formSchema>;

// Key signatures list
const keySignatures = [
  "C Major", "G Major", "D Major", "A Major", "E Major", "B Major", "F# Major", "C# Major",
  "F Major", "Bb Major", "Eb Major", "Ab Major", "Db Major", "Gb Major", "Cb Major",
  "A Minor", "E Minor", "B Minor", "F# Minor", "C# Minor", "G# Minor", "D# Minor", "A# Minor",
  "D Minor", "G Minor", "C Minor", "F Minor", "Bb Minor", "Eb Minor", "Ab Minor"
];

const CreateRoom = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      bpm: 120,
      key_signature: "C Major",
      is_public: true,
    },
  });

  // Submit handler
  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      
      // Check if user is authenticated
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        toast.error("You must be logged in to create a jam room");
        navigate("/login");
        return;
      }
      
      // Insert the new jam room
      const { data: room, error } = await supabase
        .from('jam_rooms')
        .insert({
          title: data.title,
          bpm: data.bpm,
          key_signature: data.key_signature,
          is_public: data.is_public,
          user_id: sessionData.session.user.id,
        })
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      // Show success message
      toast.success("Jam room created successfully!");
      
      // Redirect to the newly created room
      navigate(`/room/${room.id}`);
    } catch (error) {
      console.error("Error creating room:", error);
      toast.error("Failed to create jam room. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container max-w-2xl mx-auto py-12 px-4">
      <div className="mb-8 text-center">
        <div className="bg-gradient-to-br from-jamroom-purple to-jamroom-blue inline-block p-3 rounded-full mb-4">
          <Music className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold">Create a Jam Room</h1>
        <p className="text-muted-foreground mt-2">
          Set up your virtual jam space with the perfect musical settings
        </p>
      </div>

      <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Title</FormLabel>
                  <FormControl>
                    <Input placeholder="My Awesome Jam Session" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bpm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Beats Per Minute (BPM)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="120"
                      min={40}
                      max={300}
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="key_signature"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key Signature</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a key signature" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[300px]">
                      {keySignatures.map((key) => (
                        <SelectItem key={key} value={key}>
                          {key}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="is_public"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Room Visibility</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      {field.value ? "Anyone can find and join this room" : "Only people with direct link can join"}
                    </p>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
              size="lg"
            >
              {isSubmitting ? "Creating Room..." : "Create Jam Room"}
              {!isSubmitting && <CheckCircle className="ml-2 h-4 w-4" />}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateRoom;
