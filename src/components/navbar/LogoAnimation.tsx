
import { useState, useEffect } from "react";

export function LogoAnimation() {
  const [displayText, setDisplayText] = useState('');
  const [showOverlay, setShowOverlay] = useState(() => {
    // Only show overlay if this is a fresh page load
    return !sessionStorage.getItem('hasLoaded');
  });
  const fullText = 'Cryst0';

  useEffect(() => {
    // Mark that the page has been loaded
    if (!sessionStorage.getItem('hasLoaded')) {
      sessionStorage.setItem('hasLoaded', 'true');
    }

    let currentIndex = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const initialDelay = setTimeout(() => {
      setShowOverlay(false);
    }, 2000);

    const animateText = () => {
      if (isDeleting) {
        setDisplayText(fullText.substring(0, currentIndex - 1));
        currentIndex--;
        if (currentIndex <= 0) {
          isDeleting = false;
          timeoutId = setTimeout(animateText, 500);
          return;
        }
      } else {
        setDisplayText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
        if (currentIndex === fullText.length) {
          isDeleting = true;
          timeoutId = setTimeout(animateText, 1000);
          return;
        }
      }

      timeoutId = setTimeout(animateText, isDeleting ? 100 : 150);
    };

    timeoutId = setTimeout(animateText, 100);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(initialDelay);
    };
  }, []);

  return (
    <>
      {showOverlay && (
        <div className="fixed inset-0 bg-background z-50 flex items-center justify-center transition-opacity duration-1000">
          <div className="text-6xl md:text-8xl font-bold text-center">
            <span className="text-primary">
              {displayText}
              <span className="animate-pulse inline-block ml-[2px] -translate-y-[2px]">|</span>
            </span>
          </div>
        </div>
      )}
      <div className="w-full bg-background pt-4 pb-2">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-primary">
            {displayText}
            <span className="animate-pulse inline-block ml-[2px] -translate-y-[2px]">|</span>
          </span>
        </h1>
      </div>
    </>
  );
}
