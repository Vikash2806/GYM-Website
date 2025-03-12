import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { keyframes } from "@emotion/react";

// Wave animation for a dynamic effect
const waveAnimation = keyframes`
  0% { transform: translateY(0px); opacity: 0.8; }
  50% { transform: translateY(20px); opacity: 1; }
  100% { transform: translateY(0px); opacity: 0.8; }
`;

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ["#FFFFFF", "#7DD3FC", "#A78BFA"]; // White, Light Blue, Soft Purple

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 4 + 2,
        dx: Math.random() * 1.2 - 0.6,
        dy: Math.random() * 1.2 - 0.6,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Mouse position
    const mouse = { x: null, y: null };

    // Update mouse position on move
    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    // Add event listener for mouse movement
    window.addEventListener("mousemove", handleMouseMove);

    // Particle animation
    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Calculate distance between particle and mouse
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 100; // Repulsion radius

        if (distance < maxDistance) {
          const angle = Math.atan2(dy, dx);
          const force = (maxDistance - distance) / maxDistance; // Strength of repulsion
          p.x += Math.cos(angle) * force * 10;
          p.y += Math.sin(angle) * force * 10;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Move particles
        p.x += p.dx;
        p.y += p.dy;

        // Keep particles within bounds
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });

      requestAnimationFrame(animateParticles);
    };

    animateParticles();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        background: "linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)",
        zIndex: -1,
        overflow: "hidden",
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "180px",
          background: "rgba(255, 255, 255, 0.25)",
          clipPath: "ellipse(140% 100% at bottom center)",
          animation: `${waveAnimation} 6s infinite ease-in-out`,
        },
      }}
    >
      {/* Floating Particles with Mouse Repulsion */}
      <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0 }} />
    </Box>
  );
};

export default AnimatedBackground;
