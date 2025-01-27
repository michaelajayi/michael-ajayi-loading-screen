"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

interface LoadingScreenProps {
  children: React.ReactNode;
}

const LoadingScreen = ({ children }: LoadingScreenProps) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let animationFrameId: number;

    const checkAssets = async () => {
      try {
        setProgress(10);

        // Log font details
        document.fonts.ready.then(() => {
          const loadedFonts = Array.from(document.fonts);
          console.log("Loaded Fonts:", {
            total: loadedFonts.length,
            details: loadedFonts.map((font) => ({
              family: font.family,
              weight: font.weight,
              style: font.style,
            })),
          });
        });

        await document.fonts.ready;
        setProgress(40);

      const waitForImages = async () => {
        return new Promise<void>((resolve) => {
          const checkImages = () => {
            const allImages = Array.from(document.images);
            const imagePromises = allImages.map((img) => {
              if (img.complete) return Promise.resolve();
              return new Promise((resolve) => {
                img.onload = resolve;
                img.onerror = resolve;
              });
            });

            console.log("Images detected:", {
              total: allImages.length,
              sources: allImages.map((img) => ({
                src: img.src,
                complete: img.complete,
              })),
            });

            Promise.all(imagePromises).then(() => resolve());
          };

          // Allow time for Next.js hydration
          setTimeout(checkImages, 500);
        });
      };
        await waitForImages();

        // Log image details
        const allImages = Array.from(document.images);
        const priorityImages = allImages.filter((img) =>
          img.hasAttribute("data-priority")
        );

        console.log("Images Loading:", {
          total: allImages.length,
          priority: priorityImages.length,
          sources: allImages.map((img) => ({
            src: img.src,
            isPriority: img.hasAttribute("data-priority"),
            size: `${img.width}x${img.height}`,
            loading: img.loading,
            status: img.complete ? "loaded" : "loading",
          })),
        });

        const imagePromises = allImages.map((img) => {
          if (img.complete && img.naturalWidth !== 0) return Promise.resolve();
          return new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
          });
        });

        await Promise.all(imagePromises);
        setProgress(70);

        // Progress animation
        const startTime = Date.now();
        const duration = 2000;

        const animateProgress = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          setDisplayProgress(Math.floor(progress * 100));

          if (progress < 1) {
            animationFrameId = requestAnimationFrame(animateProgress);
          } else {
            setProgress(100);
            timeoutId = setTimeout(() => setLoading(false), 500);
          }
        };

        animateProgress();
      } catch (error) {
        console.error("Loading error:", error);
        setLoading(false);
      }
    };

    checkAssets();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <AnimatePresence mode='wait'>
      {loading ? (
        <motion.div
          key='loading'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 z-50 flex flex-col items-center justify-center bg-black'
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='font-cormorant-unicase font-bold tracking-widest text-white text-[24px] leading-normal mb-2'
          >
            Crafting your Experience
          </motion.div>

          <div className='w-64 h-1 bg-gray-700 rounded-full overflow-hidden'>
            <motion.div
              className='h-full bg-white'
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='font-cormorant-unicase font-bold tracking-widest text-white text-[16px] leading-normal mt-5'
          >
            {displayProgress}%
          </motion.p>
        </motion.div>
      ) : (
        <motion.div
          key='content'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;