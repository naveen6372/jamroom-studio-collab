
import React from 'react';

const WaveAnimation = () => {
  // Create an array of 20 bars with different heights
  const bars = Array.from({ length: 20 }, (_, i) => {
    // Create a semi-random height that looks like a nice waveform
    const height = 30 + Math.sin(i * 0.5) * 15 + Math.random() * 30;
    return height;
  });

  return (
    <div className="flex items-center justify-center gap-1 h-20 my-10">
      {bars.map((height, index) => (
        <div
          key={index}
          className={`w-1.5 bg-gradient-to-t from-jamroom-purple to-jamroom-blue rounded-full 
                      transform origin-bottom transition-transform
                      ${index % 4 === 0 ? 'animate-wave' :
                        index % 4 === 1 ? 'animate-wave-delay-1' :
                        index % 4 === 2 ? 'animate-wave-delay-2' :
                        'animate-wave-delay-3'}`}
          style={{ height: `${height}px` }}
        ></div>
      ))}
    </div>
  );
};

export default WaveAnimation;
