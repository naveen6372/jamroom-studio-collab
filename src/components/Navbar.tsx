
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Music } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-jamroom-dark/90 backdrop-blur-md shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Music className="h-6 w-6 text-jamroom-purple" />
          <span className="font-bold text-xl">JAMRoom</span>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-sm hover:text-jamroom-blue transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm hover:text-jamroom-blue transition-colors">How It Works</a>
          <a href="#about" className="text-sm hover:text-jamroom-blue transition-colors">About</a>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="text-sm hover:text-jamroom-purple">Log In</Button>
          <Button className="bg-jamroom-purple hover:bg-jamroom-purple/90 text-white">Sign Up</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
