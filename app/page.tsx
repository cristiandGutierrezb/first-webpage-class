"use client";

import { useState } from "react";

const COLORES = ["#ff00d4", "#00fff0", "#7b2cff", "#ff6b00", "#00ff85"];

type Explosion = { id: number; x: number; y: number; color: string };

export default function Home() {
  const [explosiones, setExplosiones] = useState<Explosion[]>([]);
  const [clicks, setClicks] = useState(0);

  function alHacerClick(e: React.MouseEvent) {
    const id = Date.now() + Math.random();
    const color = COLORES[Math.floor(Math.random() * COLORES.length)];
    setExplosiones((prev) => [...prev, { id, x: e.clientX, y: e.clientY, color }]);
    setClicks((n) => n + 1);
    // ponytail: limpieza por timeout en vez de onAnimationEnd por chispa
    setTimeout(() => setExplosiones((prev) => prev.filter((x) => x.id !== id)), 900);
  }

  return (
    <main
      onClick={alHacerClick}
      className="fondo-neon relative flex h-screen w-screen cursor-pointer select-none flex-col items-center justify-center gap-6 overflow-hidden"
    >
      <h1
        key={clicks}
        className="brillo sacudir px-6 text-center text-4xl font-black tracking-tight sm:text-6xl md:text-7xl"
        style={{
          background: "linear-gradient(90deg,#ff00d4,#7b2cff,#00fff0,#00ff85)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Bienvenidos a mi primer pagina web
      </h1>

      <p className="flotar text-sm text-white/50 sm:text-base">
        Haz click en cualquier parte {clicks > 0 && `· ${clicks} clicks`}
      </p>

      {explosiones.map((ex) => (
        <span key={ex.id} className="pointer-events-none absolute" style={{ left: ex.x, top: ex.y }}>
          <span
            className="onda absolute block h-5 w-5 rounded-full border-2"
            style={{ borderColor: ex.color }}
          />
          {Array.from({ length: 12 }).map((_, i) => {
            const ang = (i / 12) * Math.PI * 2;
            return (
              <span
                key={i}
                className="chispa absolute block h-2.5 w-2.5 rounded-full"
                style={{
                  background: ex.color,
                  boxShadow: `0 0 14px ${ex.color}`,
                  ["--dx" as string]: `${Math.cos(ang) * 160}px`,
                  ["--dy" as string]: `${Math.sin(ang) * 160}px`,
                }}
              />
            );
          })}
        </span>
      ))}
    </main>
  );
}
