"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface LuxuryHeroProps {
  title?: string;
  description?: string;
  primaryAction?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  backgroundImage?: string;
}

export function LuxuryHero({
  title,
  description,
  primaryAction,
  secondaryAction,
  backgroundImage = "/imgs/hero.jpg",
}: LuxuryHeroProps) {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        {backgroundImage && (
          <Image
            src={backgroundImage}
            alt="Luxury timepieces"
            fill
            className="object-cover opacity-60"
            priority
            quality={100}
          />
        )}
        {/* Dark gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* Animated Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Small accent line */}
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-8" />

            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-8 tracking-tight leading-tight">
              {title}
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl text-white/90 font-light max-w-3xl mx-auto mb-12 leading-relaxed">
              {description}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {primaryAction && (
                <Link
                  href={primaryAction.href}
                  className="group relative px-10 py-4 bg-white text-black font-light text-sm tracking-widest uppercase overflow-hidden transition-all duration-300 hover:bg-amber-50"
                >
                  <span className="relative z-10">{primaryAction.label}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/20 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              )}

              {secondaryAction && (
                <Link
                  href={secondaryAction.href}
                  className="px-10 py-4 border border-white/30 text-white font-light text-sm tracking-widest uppercase hover:border-white/60 hover:bg-white/5 transition-all duration-300"
                >
                  {secondaryAction.label}
                </Link>
              )}
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <div className="flex flex-col items-center gap-2 text-white/60">
              <span className="text-xs tracking-widest uppercase font-light">Scroll</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle gold accent at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
    </section>
  );
}
