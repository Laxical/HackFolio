import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { pointsInner, pointsOuter } from "./utils";
import { Typewriter } from "react-simple-typewriter";

const ParticleRing = () => {
  const handleWheel = (event) => {
    if (!event.ctrlKey) {
      // Propagate the scroll event to the page
      window.scrollBy(0, event.deltaY);
      event.preventDefault();
    }
    // If Ctrl is pressed, allow OrbitControls to handle zoom
  };

  return (
    <div
      className="relative"
      style={{
        height: "50vh", // Makes the page scrollable
        position: "relative",
      }}
    >
      {/* Sticky particle zoom component */}
      <div
        className="sticky top-0"
        style={{
          height: "35vh", // Keeps the canvas visible during scrolling
          overflow: "hidden", // Prevents scrollbars
        }}
      >
        <Canvas
          camera={{
            position: [10, -7.5, -5],
          }}
          style={{ height: "60vh", pointerEvents: "auto" }}
          className="bg-slate-900"
          onWheel={handleWheel} // Attach custom scroll handler
        >
          <OrbitControls enablePan={false} enableZoom={true} maxDistance={20} minDistance={10} />
          <directionalLight />
          <pointLight position={[-30, 0, -30]} power={10.0} />
          <PointCircle />
        </Canvas>

        {/* Centered text */}
        <h1 className="absolute top-[38%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-slate-200 font-medium text-2xl md:text-5xl pointer-events-none">
          Welcome to{" "}
          <span className="text-primary">
            <Typewriter
              words={["HackQuest!!"]}
              loop={0}
              typeSpeed={200}
              deleteSpeed={200}
              delaySpeed={2000}
            />
          </span>
        </h1>
      </div>
    </div>
  );
};

const PointCircle = () => {
  const ref = useRef(null);

  useFrame(({ clock }) => {
    if (ref.current?.rotation) {
      ref.current.rotation.z = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={ref}>
      {pointsInner.map((point) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
      {pointsOuter.map((point) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
    </group>
  );
};

const Point = ({ position, color }) => {
  return (
    <Sphere position={position} args={[0.1, 10, 10]}>
      <meshStandardMaterial
        emissive={color}
        emissiveIntensity={0.5}
        roughness={0.5}
        color={color}
      />
    </Sphere>
  );
};

export default ParticleRing;
