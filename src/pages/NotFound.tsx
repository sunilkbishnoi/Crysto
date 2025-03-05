
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft, Home, TrendingUp, TrendingDown, BarChart2, DollarSign, CandlestickChart, LineChart, PieChart, BarChart, Activity } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const [animateIcons, setAnimateIcons] = useState(false);
  
  const tradingIcons = [
    { icon: TrendingUp, color: "text-green-500" },
    { icon: TrendingDown, color: "text-red-500" },
    { icon: BarChart2, color: "text-blue-500" },
    { icon: DollarSign, color: "text-yellow-500" },
    { icon: CandlestickChart, color: "text-purple-500" },
    { icon: LineChart, color: "text-cyan-500" },
    { icon: PieChart, color: "text-orange-500" },
    { icon: BarChart, color: "text-indigo-500" },
    { icon: Activity, color: "text-pink-500" }
  ];

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    const timeout = setTimeout(() => {
      setAnimateIcons(true);
    }, 500);
    
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar onCurrencyChange={() => {}} />
      
      <div className="flex-1 flex items-center justify-center relative overflow-hidden py-8">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-primary/5 z-0" />
        
        {animateIcons && (
          <>
            {Array.from({ length: 20 }).map((_, i) => {
              const IconComponent = tradingIcons[i % tradingIcons.length].icon;
              const colorClass = tradingIcons[i % tradingIcons.length].color;
              
              return (
                <motion.div
                  key={i}
                  className={`absolute ${colorClass}`}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  initial={{ 
                    opacity: 0,
                    scale: 0.5
                  }}
                  animate={{ 
                    x: [
                      Math.random() * 50 - 25, 
                      Math.random() * 50 - 25,
                      Math.random() * 50 - 25
                    ],
                    y: [
                      Math.random() * 50 - 25, 
                      Math.random() * 50 - 25,
                      Math.random() * 50 - 25
                    ],
                    opacity: [0.3, 0.7, 0.3],
                    scale: [0.6, 1.1, 0.6],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: Math.random() * 40 + 45,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                    delay: i * 0.3
                  }}
                >
                  <IconComponent size={Math.random() * 25 + 20} />
                </motion.div>
              );
            })}
          </>
        )}
        
        {/* Main content container */}
        <motion.div 
          className="container max-w-lg mx-auto px-4 text-center z-10 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="neo-brutal-card p-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="mb-6 inline-block"
            >
              <div className="relative">
                <AlertTriangle size={80} className="text-primary mx-auto" />
                <motion.div 
                  className="absolute inset-0 bg-primary/20 rounded-full blur-xl"
                  animate={{ 
                    scale: [1, 1.15, 1],
                    opacity: [0.5, 0.7, 0.5]
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-6xl font-bold text-primary mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              404
            </motion.h1>
            
            <motion.h2
              className="text-2xl font-semibold mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Page Not Found
            </motion.h2>
            
            <motion.p 
              className="text-md text-muted-foreground mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              The page you're looking for doesn't exist or has been moved.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-3 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <Button asChild className="bg-primary">
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" /> 
                  Back to Home
                </Link>
              </Button>
              <Button asChild variant="outline" onClick={() => window.history.back()}>
                <button>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Go Back
                </button>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
