
import React from 'react';
import { Button } from "@/components/ui/button";
import { Music, Mic, Users, Settings, Play, ArrowRight, Edit, Share, Headphones } from "lucide-react";
import Navbar from "@/components/Navbar";
import WaveAnimation from "@/components/WaveAnimation";
import FeatureCard from "@/components/FeatureCard";
import StepCard from "@/components/StepCard";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-jamroom-dark bg-music-pattern">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-down">
            Collaborate on Music in <span className="text-gradient">Real-Time</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-down" style={{ animationDelay: '0.1s' }}>
            Record, mix, and collaborate with musicians anywhere in the world. 
            JAMRoom makes remote music production seamless and creative.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-down" style={{ animationDelay: '0.2s' }}>
            <Button 
              className="bg-jamroom-purple hover:bg-jamroom-purple/90 text-white px-6 py-6 h-auto"
              size="lg"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              className="border-jamroom-blue text-jamroom-blue hover:bg-jamroom-blue/10 px-6 py-6 h-auto"
              size="lg"
            >
              <Play className="mr-2 h-5 w-5" /> Watch Demo
            </Button>
          </div>
          
          <div className="bg-jamroom-dark/50 backdrop-blur-md rounded-xl border border-white/10 p-6 max-w-4xl mx-auto shadow-xl animate-slide-up">
            <WaveAnimation />
            <div className="flex justify-between items-center px-4 py-3 bg-card rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-jamroom-pink animate-pulse"></div>
                <span className="text-sm">Recording in Room: "Late Night Jazz Jam"</span>
              </div>
              <div className="flex gap-3">
                <Button variant="ghost" size="sm">
                  <Users className="h-4 w-4 text-jamroom-blue" />
                  <span className="ml-1 text-xs">5</span>
                </Button>
                <Button variant="ghost" size="sm" className="text-jamroom-orange">
                  <Mic className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to <span className="text-gradient">Create Together</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              JAMRoom provides powerful tools that make remote music collaboration
              simple, fun, and productive.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Music}
              title="Create Jam Rooms"
              description="Set up custom rooms with BPM and key signature settings tailored to your project needs."
              delay={0}
            />
            <FeatureCard
              icon={Mic}
              title="Record Loops & Tracks"
              description="Capture high-quality audio directly in your browser with our Web Audio API integration."
              delay={1}
            />
            <FeatureCard
              icon={Users}
              title="Real-time Collaboration"
              description="Work with musicians around the world as if you were in the same studio together."
              delay={2}
            />
            <FeatureCard
              icon={Edit}
              title="Interactive Mixer"
              description="Adjust volume, pan, and effects for each track to create the perfect mix."
              delay={3}
            />
            <FeatureCard
              icon={Headphones}
              title="Export Mixdowns"
              description="Download your finished tracks and mixes in high-quality audio formats."
              delay={4}
            />
            <FeatureCard
              icon={Share}
              title="Private Invites"
              description="Share private room links with collaborators for exclusive access to your projects."
              delay={5}
            />
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-gradient-to-b from-transparent to-jamroom-dark/40">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How <span className="text-gradient">JAMRoom</span> Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A simple process designed to get you jamming quickly with minimal setup.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 gap-10">
              <StepCard
                number={1}
                icon={Music}
                title="Create or Join a Jam Room"
                description="Start your own room with custom settings or join an existing session using a room code or invite link."
              />
              <StepCard
                number={2}
                icon={Settings}
                title="Set Up Your Sound"
                description="Configure your audio input, select instruments, and adjust levels for optimal recording quality."
              />
              <StepCard
                number={3}
                icon={Mic}
                title="Record Your Parts"
                description="Capture audio directly in your browser. Record loops up to 30 seconds, with perfect timing and synchronization."
              />
              <StepCard
                number={4}
                icon={Users}
                title="Collaborate in Real-Time"
                description="See tracks appear as others record them. Adjust the mix together and provide instant feedback."
              />
              <StepCard
                number={5}
                icon={Headphones}
                title="Export Your Final Mix"
                description="Once you're satisfied with the collaboration, download the final mixed track in high quality."
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2 animate-slide-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why We Built <span className="text-gradient">JAMRoom</span>
              </h2>
              
              <p className="text-muted-foreground mb-6">
                We believe music creation should be accessible and collaborative, regardless of physical location. JAMRoom emerged from our own challenges trying to make music with friends across different cities.
              </p>
              
              <p className="text-muted-foreground mb-6">
                Our platform bridges the gap between professional studio sessions and casual jam sessions, offering a space where musicians of all levels can connect, create, and share.
              </p>
              
              <div className="flex gap-4">
                <div className="bg-card p-4 rounded-lg">
                  <div className="text-2xl font-bold text-jamroom-blue mb-1">1000+</div>
                  <div className="text-xs text-muted-foreground">Active Musicians</div>
                </div>
                <div className="bg-card p-4 rounded-lg">
                  <div className="text-2xl font-bold text-jamroom-pink mb-1">5000+</div>
                  <div className="text-xs text-muted-foreground">Tracks Created</div>
                </div>
                <div className="bg-card p-4 rounded-lg">
                  <div className="text-2xl font-bold text-jamroom-orange mb-1">200+</div>
                  <div className="text-xs text-muted-foreground">Daily Jam Rooms</div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 animate-slide-in-right">
              <div className="bg-card rounded-2xl p-6 shadow-xl border border-white/10 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-jamroom-purple/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-jamroom-blue/20 rounded-full blur-3xl"></div>
                
                <div className="relative bg-jamroom-dark rounded-lg p-4 mb-6 shadow-inner">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">JAMRoom Studio</h4>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <div className="text-xs">Live</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <div 
                        key={i} 
                        className="h-12 rounded bg-gradient-to-r from-jamroom-purple/30 to-jamroom-blue/30 flex items-end overflow-hidden"
                      >
                        <div 
                          className="w-full bg-jamroom-blue/30" 
                          style={{ 
                            height: `${30 + Math.sin(i * 0.9) * 20 + Math.random() * 20}%`,
                            animation: `wave ${1 + Math.random() * 2}s ease-in-out infinite`
                          }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-card/50 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">Room</div>
                    <div className="text-sm font-medium">Funk Fusion Jam</div>
                  </div>
                  <div className="bg-card/50 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">BPM</div>
                    <div className="text-sm font-medium">120</div>
                  </div>
                  <div className="bg-card/50 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">Key</div>
                    <div className="text-sm font-medium">A Minor</div>
                  </div>
                  <div className="bg-card/50 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">Musicians</div>
                    <div className="text-sm font-medium">4 online</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <CallToAction />
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
