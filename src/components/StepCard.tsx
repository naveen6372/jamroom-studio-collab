
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

const StepCard: React.FC<StepCardProps> = ({ 
  number, 
  title, 
  description, 
  icon: Icon 
}) => {
  return (
    <div className="flex items-start gap-4 group">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-jamroom-purple to-jamroom-blue 
                     flex items-center justify-center text-white font-medium
                     group-hover:shadow-lg group-hover:shadow-jamroom-purple/30 transition-all">
        {number}
      </div>
      
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Icon className="h-5 w-5 text-jamroom-blue" />
          <h3 className="font-bold">{title}</h3>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default StepCard;
