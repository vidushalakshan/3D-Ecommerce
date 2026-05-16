"use client";
import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  OrbitControls, 
  Stage, 
  useGLTF, 
  Environment,
  ContactShadows,
  Html,
  useProgress
} from "@react-three/drei";
import { motion } from "framer-motion";
import { 
  HiOutlineArrowsPointingOut, 
  HiOutlineArrowPath, 
  HiOutlineCube
} from "react-icons/hi2";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-4 min-w-[200px]">
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-blue-500 shadow-[0_0_10px_rgba(37,99,235,0.5)]"
          />
        </div>
        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">
          Loading Model {Math.round(progress)}%
        </span>
      </div>
    </Html>
  );
}

function Model({ url, autoRotate }) {
  const { scene } = useGLTF(url);
  const modelRef = useRef();

  useFrame((state, delta) => {
    if (autoRotate && modelRef.current) {
      modelRef.current.rotation.y += delta * 0.5;
    }
  });

  return <primitive ref={modelRef} object={scene} scale={5.0} />;
}

const Product3DViewer = ({ modelUrl }) => {
  const [autoRotate, setAutoRotate] = useState(false);
  const orbitRef = useRef();
  
  const finalModelUrl = modelUrl || "/models/scene.glb";

  return (
    <div className="relative w-full h-full min-h-[500px] bg-[#080808] rounded-[3rem] border border-white/10 overflow-hidden group">
      <Canvas 
        dpr={[1, 2]} 
        shadows 
        camera={{ position: [5, 2, 5], fov: 35 }}
        gl={{ antialias: true, preserveDrawingBuffer: true }}
      >
        <Suspense fallback={<Loader />}>
          <Stage 
            environment="studio" 
            intensity={0.5} 
            contactShadow={{ blur: 2, opacity: 0.5 }} 
            adjustCamera={true}
          >
            <Model url={finalModelUrl} autoRotate={autoRotate} />
          </Stage>
          <OrbitControls 
            ref={orbitRef}
            enablePan={false} 
            enableZoom={true} 
            minDistance={2}
            maxDistance={10}
            makeDefault 
          />
          <Environment preset="studio" blur={0.8} />
        </Suspense>
      </Canvas>

      {/* 3D UI Overlay */}
      <div className="absolute top-8 right-8 flex flex-col gap-3">
        <button 
          onClick={() => setAutoRotate(!autoRotate)}
          className={`p-3 rounded-2xl border backdrop-blur-xl transition-all ${
            autoRotate ? "bg-blue-600 border-blue-400 text-white shadow-lg" : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
          }`}
        >
          <HiOutlineArrowPath className={autoRotate ? "animate-spin-slow" : ""} size={20} />
        </button>
      </div>

      {/* Floating Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-6 px-6 py-2.5 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl items-center">
        <div className="flex items-center gap-2">
           <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
           <span className="text-[9px] font-black text-white/60 tracking-widest uppercase">360° Inspection</span>
        </div>
        <div className="w-px h-3 bg-white/10" />
        <span className="text-[8px] font-bold text-gray-500 tracking-widest uppercase">Drag to Rotate</span>
      </div>

      {/* Label */}
      <div className="absolute bottom-8 left-8 flex items-center gap-2 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity">
        <HiOutlineCube className="text-blue-400" size={16} />
        <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white">
          Product Stage
        </span>
      </div>
    </div>
  );
};

export default Product3DViewer;
