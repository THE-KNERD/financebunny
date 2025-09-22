import { useState, useEffect } from "react";
import bunnyMascot from "@/assets/finance-bunny-mascot.png";
import { Card, CardContent } from "@/components/ui/card";

interface BunnyGuideProps {
  message?: string;
  mood?: "happy" | "concerned" | "encouraging" | "celebrating";
  onInteraction?: () => void;
}

const BunnyGuide = ({ 
  message = "Hi there! I'm FinanceBunny, your personal finance guide. Let's make your money work smarter!", 
  mood = "happy",
  onInteraction 
}: BunnyGuideProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const moodMessages = {
    happy: "Looking good! Your financial health is on track! 🌟",
    concerned: "Hmm, let's review your spending and find some savings opportunities.",
    encouraging: "You're making great progress! Keep up the excellent work!",
    celebrating: "Amazing job! You've reached a financial milestone! 🎉"
  };

  const handleClick = () => {
    setIsAnimating(true);
    onInteraction?.();
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="gradient-surface shadow-card border-primary/20">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div 
            className={`relative cursor-pointer transition-smooth ${
              isAnimating ? "bunny-wiggle" : "bunny-bounce"
            }`}
            onClick={handleClick}
          >
            <img 
              src={bunnyMascot} 
              alt="FinanceBunny Mascot" 
              className="w-16 h-16 object-contain"
            />
            {mood === "celebrating" && (
              <div className="absolute -top-2 -right-2 text-primary animate-bounce">
                ✨
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="font-bold text-primary">FinanceBunny</h3>
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {message || moodMessages[mood]}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BunnyGuide;