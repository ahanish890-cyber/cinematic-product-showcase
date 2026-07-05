import React from "react";
import GlowHero from "@/components/ui/hero-1";

const Demo: React.FC = () => {
  return (
    <div className="min-h-screen w-full grid place-items-center p-8 font-sans bg-black">
      <GlowHero
        label="MacBook Pro"
        glowText="Built for Apple Intelligence."
        glowTextSize="xl"
        labelSize="lg"
      />
    </div>
  );
};

export default Demo;
