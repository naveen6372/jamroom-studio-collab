
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CallToAction = () => {
  return (
    <div className="bg-gradient-to-br from-jamroom-purple/20 to-jamroom-blue/20 rounded-2xl p-8 md:p-12 shadow-xl border border-white/10">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
        Ready to Start Jamming?
      </h2>
      
      <p className="text-center max-w-lg mx-auto mb-8 text-muted-foreground">
        Join thousands of musicians collaborating in real-time. Create your first Jam Room today and start making music together.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          className="bg-jamroom-purple hover:bg-jamroom-purple/90 text-white px-6 py-6 h-auto"
          size="lg"
        >
          Create Free Account
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        
        <Button 
          variant="outline" 
          className="border-jamroom-blue text-jamroom-blue hover:bg-jamroom-blue/10 px-6 py-6 h-auto"
          size="lg"
        >
          Join a Jam Room
        </Button>
      </div>
    </div>
  );
};

export default CallToAction;
