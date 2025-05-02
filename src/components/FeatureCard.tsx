
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon: Icon,
  delay = 0 
}) => {
  return (
    <div 
      className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 
                hover:translate-y-[-5px] border border-white/10 overflow-hidden relative animate-slide-up"
      style={{ animationDelay: `${delay * 0.1}s` }}
    >
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-jamroom-purple/20 to-transparent rounded-bl-full"></div>
      
      <div className="bg-jamroom-purple/10 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
        <Icon className="text-jamroom-purple h-6 w-6" />
      </div>
      
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default FeatureCard;
