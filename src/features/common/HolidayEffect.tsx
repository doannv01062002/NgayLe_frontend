"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import api from "@/lib/api";

type EffectType =
  | "NONE"
  | "SNOW"
  | "CHRISTMAS"
  | "TET_BLOSSOMS"
  | "MID_AUTUMN"
  | "VU_LAN";

export const HolidayEffect = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [effectType, setEffectType] = useState<EffectType>("NONE");

  useEffect(() => {
    setMounted(true);
    const fetchEffect = async () => {
      try {
        const res = await api.get("/holidays/active-effect");
        if (res.data?.effectType) {
          setEffectType(res.data.effectType as EffectType);
        }
      } catch (error) {
        console.error("Failed to fetch holiday effect:", error);
      }
    };

    // Small delay to ensure client hydration
    const timer = setTimeout(() => {
      fetchEffect();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Apply Cursor Effect via Body Class
  useEffect(() => {
    if (!mounted || pathname?.startsWith("/admin")) return;

    // Reset cursors
    document.body.classList.remove(
      "cursor-lixi",
      "cursor-lantern",
      "cursor-lotus",
      "cursor-santa"
    );

    switch (effectType) {
      case "TET_BLOSSOMS":
        document.body.classList.add("cursor-lixi");
        break;
      case "MID_AUTUMN":
        document.body.classList.add("cursor-lantern");
        break;
      case "VU_LAN":
        document.body.classList.add("cursor-lotus");
        break;
      case "CHRISTMAS":
      case "SNOW":
        document.body.classList.add("cursor-santa");
        break;
      default:
        break;
    }

    return () => {
      document.body.classList.remove(
        "cursor-lixi",
        "cursor-lantern",
        "cursor-lotus",
        "cursor-santa"
      );
    };
  }, [effectType, mounted, pathname]);

  // Click Effect Logic
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>(
    []
  );

  useEffect(() => {
    if (!mounted || pathname?.startsWith("/admin") || effectType === "NONE")
      return;

    const handleClick = (e: MouseEvent) => {
      const id = Date.now();
      setClicks((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
      // Auto cleanup after animation duration (1s)
      setTimeout(() => {
        setClicks((prev) => prev.filter((c) => c.id !== id));
      }, 1000);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [effectType, mounted, pathname]);

  if (!mounted) return null;
  if (pathname?.startsWith("/admin")) return null;
  if (effectType === "NONE") return null;

  // Particle Counts
  const particleCount = effectType === "VU_LAN" ? 15 : 30;
  const particles = Array.from({ length: particleCount });

  return (
    <>
      {/* Background Layer: Tet Holiday Special (Trees & Petals) */}
      {effectType === "TET_BLOSSOMS" && (
        <div
          className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden"
          aria-hidden="true"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5 }}
            className="fixed bottom-[10vh] left-[-8vw] w-[200px] md:w-[300px] lg:w-[400px] mix-blend-darken"
          >
            <img
              src="/assets/images/peach_blossom.png"
              alt="Peach Blossom"
              className="w-full h-auto object-contain animate-sway-slow"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5 }}
            className="fixed bottom-[10vh] right-[-8vw] w-[200px] md:w-[300px] lg:w-[400px] mix-blend-darken"
          >
            <img
              src="/assets/images/apricot_blossom.png"
              alt="Apricot Blossom"
              className="w-full h-auto object-contain animate-sway-slow"
            />
          </motion.div>

          {/* Falling Petals from Trees (Background) */}
          {Array.from({ length: 20 }).map((_, i) => (
            <TreeParticle
              key={`left-${i}`}
              side="left"
              index={i}
              type="TET_BLOSSOMS"
            />
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <TreeParticle
              key={`right-${i}`}
              side="right"
              index={i}
              type="TET_BLOSSOMS"
            />
          ))}
        </div>
      )}

      {/* Background Layer: Mid-Autumn Special (Lantern & Banyan Trees) */}
      {effectType === "MID_AUTUMN" && (
        <div
          className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden"
          aria-hidden="true"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5 }}
            className="fixed bottom-[10vh] left-[-5vw] w-[200px] md:w-[300px] lg:w-[400px]"
          >
            <img
              src="/assets/images/mid_autumn_banyan.png"
              alt="Banyan Tree"
              className="w-full h-auto object-contain animate-sway-slow"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5 }}
            className="fixed bottom-[10vh] right-[-5vw] w-[200px] md:w-[300px] lg:w-[400px]"
          >
            <img
              src="/assets/images/mid_autumn_lantern.png"
              alt="Lantern Tree"
              className="w-full h-auto object-contain animate-sway-slow"
            />
          </motion.div>

          {/* Falling Leaves from Banyan (Left) */}
          {Array.from({ length: 15 }).map((_, i) => (
            <TreeParticle
              key={`left-${i}`}
              side="left"
              index={i}
              type="MID_AUTUMN"
            />
          ))}
          {/* Falling Lanterns from Lantern Tree (Right) */}
          {Array.from({ length: 15 }).map((_, i) => (
            <TreeParticle
              key={`right-${i}`}
              side="right"
              index={i}
              type="MID_AUTUMN"
            />
          ))}
        </div>
      )}

      {/* Overlay Layer: Other Particles & Interactions */}
      <div
        className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden"
        aria-hidden="true"
      >
        {/* Falling Background Particles (Exclude Tet & Mid-Autumn from global rain) */}
        {effectType !== "TET_BLOSSOMS" &&
          effectType !== "MID_AUTUMN" &&
          particles.map((_, i) => (
            <Particle key={i} type={effectType} index={i} />
          ))}

        {/* Click Burst Effects */}
        {clicks.map((click) => (
          <ClickBurst
            key={click.id}
            x={click.x}
            y={click.y}
            type={effectType}
          />
        ))}
      </div>
    </>
  );
};

// --- Sub Components ---

const Particle = ({ type, index }: { type: EffectType; index: number }) => {
  const randomDuration = 15 + Math.random() * 15;
  const randomDelay = Math.random() * 20;
  const startX = Math.random() * 100;
  const drift = (Math.random() - 0.5) * 20;
  const size = 10 + Math.random() * 15;
  const rotateStart = Math.random() * 360;

  let rotateEnd = rotateStart + 360;
  let animateY = "110vh";
  let opacitySeq: number[] | any = [0, 1, 1, 0];
  let initialY = "-10vh";

  // VU LAN: Lotus floats UP from bottom
  if (type === "VU_LAN") {
    initialY = "110vh";
    animateY = "-10vh";
    opacitySeq = [0, 0.8, 0];
  }

  const getStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      position: "absolute",
      top: 0,
      left: 0,
    };

    switch (type) {
      // Tet & Mid-Autumn handled by TreeParticle now
      case "VU_LAN": // Lotus
        return {
          ...baseStyle,
          width: `${size * 2}px`,
          height: `${size * 1.5}px`,
          background: "radial-gradient(circle at 50% 0%, #fbcfe8, #ec4899)",
          borderRadius: "50% 50% 10% 10%",
          opacity: 0.6,
          filter: "blur(0.5px)",
        };

      case "SNOW":
      case "CHRISTMAS":
        return {
          ...baseStyle,
          width: `${size * 0.35}px`,
          height: `${size * 0.35}px`,
          backgroundColor: "#ffffff",
          borderRadius: "50%",
          boxShadow: "0 0 3px 0.5px rgba(255, 255, 255, 0.5)",
          opacity: 0.8,
        };

      default:
        return {};
    }
  };

  return (
    <motion.div
      initial={{
        y: initialY,
        x: `${startX}vw`,
        rotate: rotateStart,
        opacity: 0,
        scale: 0,
      }}
      animate={{
        y: animateY,
        x: `${startX + drift}vw`,
        rotate: rotateEnd,
        opacity: opacitySeq,
        scale: [0.5, 1, 1, 0.5],
      }}
      transition={{
        duration: randomDuration,
        delay: randomDelay,
        repeat: Infinity,
        ease: "linear",
      }}
      style={getStyle()}
    />
  );
};

const ClickBurst = ({
  x,
  y,
  type,
}: {
  x: number;
  y: number;
  type: EffectType;
}) => {
  const particleCount = 12; // Particles per click
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
        width: 0,
        height: 0,
      }}
    >
      {Array.from({ length: particleCount }).map((_, i) => (
        <BurstParticle key={i} type={type} index={i} total={particleCount} />
      ))}
    </div>
  );
};

const BurstParticle = ({
  type,
  index,
  total,
}: {
  type: EffectType;
  index: number;
  total: number;
}) => {
  const angle = (index / total) * 360 + Math.random() * 30;
  const velocity = 50 + Math.random() * 50;
  const size = 6 + Math.random() * 8;

  let color = "#ffffff";
  switch (type) {
    case "TET_BLOSSOMS":
      color = Math.random() > 0.5 ? "#f472b6" : "#facc15";
      break;
    case "MID_AUTUMN":
      color = Math.random() > 0.5 ? "#fcd34d" : "#ef4444";
      break;
    case "VU_LAN":
      color = Math.random() > 0.5 ? "#ec4899" : "#fbcfe8";
      break;
    case "CHRISTMAS":
    case "SNOW":
      color = Math.random() > 0.5 ? "#ffffff" : "#16a34a";
      break;
  }

  return (
    <motion.div
      initial={{ x: 0, y: 0, scale: 0.5, opacity: 1 }}
      animate={{
        x: Math.cos((angle * Math.PI) / 180) * velocity,
        y: Math.sin((angle * Math.PI) / 180) * velocity,
        scale: 0,
        opacity: 0,
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: "absolute",
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius:
          type === "TET_BLOSSOMS" || type === "VU_LAN" ? "50% 0 50%" : "50%",
        boxShadow: `0 0 4px ${color}`,
      }}
    />
  );
};

const TreeParticle = ({
  side,
  index,
  type = "TET_BLOSSOMS",
}: {
  side: "left" | "right";
  index: number;
  type?: EffectType;
}) => {
  const randomDuration = 5 + Math.random() * 5;
  const randomDelay = Math.random() * 5;

  // Constrain to corners:
  const startX = side === "left" ? Math.random() * 15 : 85 + Math.random() * 15;
  const drift = (Math.random() - 0.5) * 5;
  const startBottom = 20 + Math.random() * 20;

  const size = 6 + Math.random() * 6;

  let backgroundColor = side === "left" ? "#f472b6" : "#facc15";
  let boxShadow = `0 0 4px ${side === "left" ? "#fce7f3" : "#fef08a"}`;
  let borderRadius = "50% 0 50% 50%";

  if (type === "MID_AUTUMN") {
    if (side === "left") {
      // Banyan: Falling Leaves (Golden/Brown)
      backgroundColor = Math.random() > 0.5 ? "#eab308" : "#ca8a04";
      boxShadow = "none";
      borderRadius = "0 50% 0 50%"; // Leaf shape
    } else {
      // Lantern Tree: Falling Lanterns (Red/Orange glowing dots)
      backgroundColor = Math.random() > 0.5 ? "#ef4444" : "#f97316";
      boxShadow = "0 0 6px #fdba74";
      borderRadius = "4px"; // Boxy lantern shape
    }
  }

  return (
    <motion.div
      initial={{
        bottom: `${startBottom}vh`,
        left: `${startX}vw`,
        opacity: 0,
        scale: 0,
        rotate: 0,
      }}
      animate={{
        bottom: "-5vh",
        left: `${startX + drift}vw`,
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0.5],
        rotate: 360,
      }}
      transition={{
        duration: randomDuration,
        delay: randomDelay,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        position: "fixed",
        width: size,
        height: size,
        backgroundColor,
        borderRadius,
        boxShadow,
        pointerEvents: "none",
      }}
    />
  );
};
