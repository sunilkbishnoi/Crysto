import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Github, Linkedin, Twitter, ArrowRight, Sparkles, TrendingUp, TrendingDown, BarChart2, DollarSign, CandlestickChart, LineChart, PieChart, BarChart, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMarketStore } from "@/stores/marketStore";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  }
}

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const { setCurrency } = useMarketStore();
  const [animateIcons, setAnimateIcons] = useState(false);
  
  const teamMembers: TeamMember[] = [
    {
      name: "Sunil Bishnoi",
      role: "Lead Developer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
      social: {
        github: "https://github.com/sunilbishnoi",
        linkedin: "https://linkedin.com/in/sunilbishnoi",
        twitter: "https://twitter.com/sunilbishnoi"
      }
    },
    {
      name: "Kalp Veer",
      role: "UI/UX Designer",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop",
      social: {
        github: "https://github.com/kalpveer",
        linkedin: "https://linkedin.com/in/kalpveer",
        twitter: "https://twitter.com/kalpveer"
      }
    },
    {
      name: "Priyanshu Bhati",
      role: "Backend Developer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
      social: {
        github: "https://github.com/priyanshu",
        linkedin: "https://linkedin.com/in/priyanshu",
        twitter: "https://twitter.com/priyanshu"
      }
    },
    {
      name: "Aryamaan Champaneria",
      role: "Data Analyst",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop",
      social: {
        github: "https://github.com/aryamaan",
        linkedin: "https://linkedin.com/in/aryamaan",
        twitter: "https://twitter.com/aryamaan"
      }
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    
    const timeout = setTimeout(() => {
      setAnimateIcons(true);
    }, 1500);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  const getRotation = () => {
    if (!heroRef.current) return { x: 0, y: 0 };
    const maxRotation = 5;
    const rotationFactor = 0.05;
    return {
      x: Math.min(maxRotation, scrollY * rotationFactor),
      y: Math.min(maxRotation, scrollY * rotationFactor * 0.5),
    };
  };

  const rotation = getRotation();
  
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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar onCurrencyChange={(newCurrency) => setCurrency(newCurrency)} />
      
      <div 
        ref={heroRef}
        className="relative h-[90vh] w-full overflow-hidden bg-gradient-to-br from-background via-background/90 to-primary/10"
      >
        <motion.div
          className="absolute top-0 inset-x-0 flex items-center justify-center z-30 h-[30vh]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <h1 className="text-7xl md:text-8xl font-bold text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60">
              CRYST0
            </span>
          </h1>
        </motion.div>
        
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
                      Math.random() * 70 - 35, 
                      Math.random() * 70 - 35,
                      Math.random() * 70 - 35
                    ],
                    y: [
                      Math.random() * 70 - 35, 
                      Math.random() * 70 - 35,
                      Math.random() * 70 - 35
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
        
        <div className="container relative z-10 mx-auto px-4 h-full flex flex-col justify-center">
          <motion.div
            style={{
              perspective: 1000,
              transform: `rotateX(${-rotation.x}deg) rotateY(${rotation.y}deg)`
            }}
            className="max-w-3xl mx-auto mt-12 text-center"
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-primary mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Track cryptocurrencies and stocks with real-time data
            </motion.h1>
            
            <motion.p
              className="text-lg md:text-xl text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              CRYST0 combines powerful AI algorithms with real-time market data to help you make informed trading decisions. Get access to comprehensive analytics, predictive insights, and personalized recommendations.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg">
                <Link to="/markets">
                  Explore Markets <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg">
                <Link to="/news">
                  Latest News <Sparkles className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl font-bold text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Why Choose CRYST0?
          </motion.h2>
          
          <motion.p
            className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our platform is designed by traders, for traders. We combine cutting-edge technology with intuitive design to provide you with the most comprehensive market analytics tool available.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Real-time Analytics",
                desc: "Stay updated with real-time price movements, trends, and market fluctuations for informed trading. Our platform updates data every second to ensure you never miss an opportunity.",
                icon: BarChart2,
                color: "text-blue-500"
              },
              {
                title: "AI Predictions",
                desc: "Leverage advanced AI models to predict market movements and identify potential investment opportunities. Our machine learning algorithms analyze thousands of data points to provide accurate forecasts.",
                icon: TrendingUp,
                color: "text-green-500"
              },
              {
                title: "Portfolio Management",
                desc: "Track your favorite assets, create watchlists, and monitor your portfolio performance in one place. Get personalized insights and recommendations based on your investment goals and risk tolerance.",
                icon: DollarSign,
                color: "text-yellow-500"
              }
            ].map((feature, index) => (
              <motion.div 
                key={feature.title}
                className="relative p-6 h-[350px] border border-border rounded-lg overflow-hidden bg-card/30 backdrop-blur-sm"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
              >
                <div className="absolute -right-10 -bottom-10 h-40 w-40 bg-primary/10 rounded-full blur-xl" />
                <div className="relative z-10">
                  <feature.icon className={`h-12 w-12 ${feature.color} mb-4`} />
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">
                    {feature.desc}
                  </p>
                </div>
                
                <motion.div 
                  className={`absolute bottom-4 right-4 ${feature.color}`}
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                >
                  <feature.icon size={20} />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {animateIcons && tradingIcons.map((item, i) => (
          <motion.div
            key={`feature-icon-${i}`}
            className={`absolute ${item.color} opacity-20`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ 
              x: [0, Math.random() * 40 - 20, 0],
              y: [0, Math.random() * 40 - 20, 0],
              rotate: [0, 360, 0]
            }}
            transition={{
              duration: 60,
              repeat: Infinity,
              delay: i * 0.3
            }}
          >
            <item.icon size={Math.random() * 30 + 25} />
          </motion.div>
        ))}
      </section>
      
      <section className="py-20 bg-gradient-to-br from-background to-primary/5 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.h2 
            className="text-4xl font-bold text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Comprehensive Market Coverage
          </motion.h2>
          
          <motion.p
            className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            From cryptocurrencies to traditional stocks, CRYST0 provides comprehensive coverage of global markets with detailed analytics and insights.
          </motion.p>
          
          <div className="flex flex-col md:flex-row items-center gap-8">
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Advanced Trading Platform</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Our platform combines intuitive design with powerful functionality to give you the edge in today's volatile markets.
              </p>
              <ScrollArea className="h-[200px] rounded-md border p-4 mb-8">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">Real-time Market Data</h3>
                    <p className="text-muted-foreground">Access live price feeds, order books, and market depth for thousands of assets.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Technical Analysis Tools</h3>
                    <p className="text-muted-foreground">Utilize over 100+ technical indicators and drawing tools to analyze price charts.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Sentiment Analysis</h3>
                    <p className="text-muted-foreground">Gauge market sentiment through social media monitoring and news analysis.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Multi-Exchange Support</h3>
                    <p className="text-muted-foreground">Compare prices and arbitrage opportunities across multiple exchanges.</p>
                  </div>
                </div>
              </ScrollArea>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/markets">
                  Start Trading Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
            
            <motion.div 
              className="flex-1 relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative w-full aspect-[16/9] border border-border rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1000&auto=format&fit=crop" 
                    alt="Platform Preview" 
                    className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
                
                {tradingIcons.slice(0, 5).map((item, i) => (
                  <motion.div
                    key={`platform-icon-${i}`}
                    className={`absolute ${item.color}`}
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${30 + i * 10}%`,
                    }}
                    animate={{ 
                      y: [0, -8, 0],
                      scale: [1, 1.1, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      delay: i * 1.2
                    }}
                  >
                    <item.icon size={30} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
        
        {animateIcons && tradingIcons.map((item, i) => (
          <motion.div
            key={`platform-bg-icon-${i}`}
            className={`absolute ${item.color} opacity-10`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ 
              x: [0, Math.random() * 80 - 40, 0],
              y: [0, Math.random() * 80 - 40, 0],
              rotate: [0, 360, 0]
            }}
            transition={{
              duration: 70,
              repeat: Infinity,
              delay: i * 0.9
            }}
          >
            <item.icon size={Math.random() * 40 + 35} />
          </motion.div>
        ))}
      </section>
      
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl font-bold text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Meet Our Team
          </motion.h2>
          
          <motion.p
            className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our team combines expertise in finance, data science, and software engineering to build the most powerful market analytics platform.
          </motion.p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                className="relative border border-border rounded-lg overflow-hidden bg-card/30 backdrop-blur-sm"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                </div>
                
                <div className="p-6 relative">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-muted-foreground mb-4">{member.role}</p>
                  
                  <div className="flex gap-4">
                    {member.social.github && (
                      <a 
                        href={member.social.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    )}
                    {member.social.linkedin && (
                      <a 
                        href={member.social.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    )}
                    {member.social.twitter && (
                      <a 
                        href={member.social.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Twitter className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>
                
                <motion.div 
                  className={`absolute top-2 right-2 text-primary/50`}
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                >
                  {React.createElement(tradingIcons[index % tradingIcons.length].icon, { size: 16 })}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {animateIcons && tradingIcons.map((item, i) => (
          <motion.div
            key={`team-bg-icon-${i}`}
            className={`absolute ${item.color} opacity-10`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ 
              x: [0, Math.random() * 80 - 40, 0],
              y: [0, Math.random() * 80 - 40, 0],
              rotate: [0, 360, 0]
            }}
            transition={{
              duration: 80,
              repeat: Infinity,
              delay: i * 1.2
            }}
          >
            <item.icon size={Math.random() * 35 + 20} />
          </motion.div>
        ))}
      </section>
      
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-primary/5 to-background">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              className="text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Ready to Transform Your Trading?
            </motion.h2>
            <motion.p 
              className="text-lg text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Join thousands of traders using our platform to track markets, analyze trends, and make informed decisions. CRYST0 provides the tools and insights you need to succeed in today's complex financial landscape.
            </motion.p>
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                <Link to="/markets">Get Started Now</Link>
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                No credit card required. Free plan available with premium upgrades.
              </p>
            </motion.div>
          </div>
        </div>
        
        {animateIcons && tradingIcons.map((item, i) => (
          <motion.div
            key={`cta-icon-${i}`}
            className={`absolute ${item.color} opacity-10`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ 
              x: [0, Math.random() * 80 - 40, 0],
              y: [0, Math.random() * 80 - 40, 0],
              rotate: [0, 360, 0]
            }}
            transition={{
              duration: 60,
              repeat: Infinity,
              delay: i * 0.7
            }}
          >
            <item.icon size={Math.random() * 25 + 20} />
          </motion.div>
        ))}
      </section>
      
      <Footer />
    </div>
  );
};

export default Home;
