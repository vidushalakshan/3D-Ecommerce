"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import {
  Bar,
  BarChart,
  YAxis,
  CartesianGrid,
  XAxis,
  Area,
  AreaChart,
  Tooltip,
} from "recharts";
import { 
  HiCpuChip, 
  HiBolt, 
  HiSparkles, 
  HiShieldCheck, 
  HiArrowTrendingUp, 
  HiGlobeAlt, 
  HiCurrencyDollar, 
  HiShoppingCart,
  HiUsers
} from "react-icons/hi2";

// --- SIMULATED DATA ---
const barData = [
  { month: "Jan", revenue: 18600, orders: 80 },
  { month: "Feb", revenue: 30500, orders: 200 },
  { month: "Mar", revenue: 23700, orders: 120 },
  { month: "Apr", revenue: 47300, orders: 190 },
  { month: "May", revenue: 20900, orders: 130 },
  { month: "Jun", revenue: 51400, orders: 240 },
];

const LOG_TEMPLATES = [
  "🔒 [CLERK] Decrypted operator session token: Admin (Vidusha)",
  "📦 [MONGO] Helmsman Neo Inventory count updated: 24 units",
  "💳 [STRIPE] Generated payout token payload: $14,840.00",
  "🔋 [QUANTUM] Core synchronized with 3D web render canvas",
  "🛡️ [SECURITY] Firewall validated SSL handshake client request",
  "🛍️ [ORDER] New checkout completed: Helios Neo Gaming Laptop",
  "🌐 [SYSTEM] Connected database shard node-us-east successfully",
  "💖 [WISHLIST] Global sync payload broadcast to active sessions",
];

// --- 3D INTERACTIVE CORE (R3F) ---
function QuantumCore() {
  const meshRef = useRef();
  const innerRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.x += delta * 0.25;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.6;
    }
  });

  return (
    <group>
      {/* Outer wireframe sphere */}
      <mesh ref={meshRef}>
        <dodecahedronGeometry args={[2.2, 1]} />
        <meshBasicMaterial 
          color="#3b82f6" 
          wireframe 
          transparent 
          opacity={0.3} 
        />
      </mesh>

      {/* Inner pulsing core */}
      <Sphere ref={innerRef} args={[0.9, 32, 32]}>
        <MeshDistortMaterial
          color="#a855f7"
          roughness={0.2}
          metalness={0.8}
          distort={0.4}
          speed={3}
        />
      </Sphere>

      {/* Pulsing glow point light */}
      <pointLight position={[0, 0, 0]} color="#a855f7" intensity={3} distance={5} />
    </group>
  );
}

// --- 3D TILTING KPI CARD ---
function TiltingKPICard({ title, value, change, icon: Icon, color, glowColor }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 15 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="h-44 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden group cursor-pointer transition-all duration-300 hover:border-white/20"
    >
      {/* Background glow orb */}
      <div 
        className="absolute -right-10 -bottom-10 w-28 h-28 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none"
        style={{ backgroundColor: glowColor }}
      />

      <div className="flex items-center justify-between" style={{ transform: "translateZ(20px)" }}>
        <div className="flex items-center gap-3">
          <div 
            className="p-3 rounded-2xl border flex items-center justify-center"
            style={{ 
              backgroundColor: `${glowColor}10`,
              borderColor: `${glowColor}30`,
              color 
            }}
          >
            <Icon size={20} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-black text-green-400 uppercase bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full">
          <HiArrowTrendingUp size={10} />
          <span>{change}</span>
        </div>
      </div>

      <div className="space-y-1" style={{ transform: "translateZ(35px)" }}>
        <h3 className="text-3xl font-black text-white tracking-tighter italic">
          {value}
        </h3>
        <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest leading-none">
          Live Telemetry Node Active
        </p>
      </div>
    </motion.div>
  );
}

// --- MAIN HOMEPAGE ---
const Homepage = () => {
  const [logs, setLogs] = useState([]);
  const [cpuLoad, setCpuLoad] = useState(24.5);
  const [coreTemp, setCoreTemp] = useState(38);

  // Initialize and update logs dynamically
  useEffect(() => {
    // Generate initial logs
    const initialLogs = Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      text: LOG_TEMPLATES[Math.floor(Math.random() * LOG_TEMPLATES.length)],
      time: new Date(Date.now() - (5 - i) * 10000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    }));
    setLogs(initialLogs);

    // Interval to append new logs and vary stats
    const interval = setInterval(() => {
      setLogs((prev) => {
        const nextId = prev.length > 0 ? prev[prev.length - 1].id + 1 : 0;
        const newLog = {
          id: nextId,
          text: LOG_TEMPLATES[Math.floor(Math.random() * LOG_TEMPLATES.length)],
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        };
        return [...prev.slice(1), newLog]; // Keep last 6 logs
      });

      // Randomize telemetry slightly
      setCpuLoad(Number((20 + Math.random() * 15).toFixed(1)));
      setCoreTemp(Number((35 + Math.random() * 5).toFixed(0)));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 text-white">
      {/* 1. Header node */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-2">
            <HiCpuChip size={12} className="animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em]">Quantum Admin Console</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none">
            3D TECH COMMAND <span className="text-blue-500">DECK</span>
          </h1>
        </div>
        <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 bg-white/5 p-3 rounded-2xl border border-white/5">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
            <span>SHARD A HEALTHY</span>
          </div>
          <span className="w-px h-3 bg-white/10" />
          <span>V2.4 CORE</span>
        </div>
      </header>

      {/* 2. Interactive KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <TiltingKPICard
          title="Total Net Revenue"
          value="$189,420.00"
          change="+18.4%"
          icon={HiCurrencyDollar}
          color="#3b82f6"
          glowColor="#3b82f6"
        />
        <TiltingKPICard
          title="Active Server Users"
          value="1,280"
          change="+5.2%"
          icon={HiUsers}
          color="#a855f7"
          glowColor="#a855f7"
        />
        <TiltingKPICard
          title="Stripe Daily Payout"
          value="$14,840.00"
          change="+8.8%"
          icon={HiShoppingCart}
          color="#10b981"
          glowColor="#10b981"
        />
        <TiltingKPICard
          title="Fulfillment Ratio"
          value="99.2%"
          change="+1.5%"
          icon={HiShieldCheck}
          color="#f59e0b"
          glowColor="#f59e0b"
        />
      </div>

      {/* 3. Main Command Center (3D Core + Logs) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* WebGL 3D Quantum Processor Sphere */}
        <div className="lg:col-span-2 bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-[3rem] p-6 h-[400px] flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-6 left-6 z-10">
            <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest block mb-1">Interactive Telemetry</span>
            <h3 className="text-xl font-black uppercase text-white italic tracking-tighter leading-none">
              QUANTUM SYSTEM CORE
            </h3>
          </div>

          {/* R3F Canvas Container */}
          <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[2, 2, 2]} intensity={1.5} />
              <QuantumCore />
              <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 2.2} />
            </Canvas>
          </div>

          {/* Real-time telemetry stats overlay */}
          <div className="absolute bottom-6 left-6 right-6 z-10 flex justify-between bg-black/40 backdrop-blur-md border border-white/5 rounded-2xl p-4 text-[10px] font-bold tracking-wider uppercase text-gray-400">
            <div className="space-y-1">
              <span className="block text-[8px] text-gray-500 font-bold">CORE LOAD</span>
              <span className="text-white text-xs font-black italic">{cpuLoad}%</span>
            </div>
            <div className="w-px h-6 bg-white/10" />
            <div className="space-y-1">
              <span className="block text-[8px] text-gray-500 font-bold">TEMP NODES</span>
              <span className="text-white text-xs font-black italic">{coreTemp}°C</span>
            </div>
            <div className="w-px h-6 bg-white/10" />
            <div className="space-y-1">
              <span className="block text-[8px] text-gray-500 font-bold">GRID SYNC</span>
              <span className="text-green-400 text-xs font-black italic">ACTIVE</span>
            </div>
          </div>
        </div>

        {/* Hacker Monospace Console Activity Logs */}
        <div className="bg-[#050505] border border-white/10 rounded-[3rem] p-6 flex flex-col justify-between h-[400px] relative overflow-hidden">
          <header className="border-b border-white/5 pb-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
              <span className="text-[9px] font-black text-green-400 uppercase tracking-widest">LIVE telemetry log STREAM</span>
            </div>
            <h3 className="text-base font-black text-white uppercase italic tracking-tighter">
              SYSTEM ENGINE LOGGER
            </h3>
          </header>

          {/* Live scrolling list */}
          <div className="flex-1 overflow-y-auto font-mono text-[10px] text-green-500/80 space-y-3 py-4 pr-1 no-scrollbar leading-relaxed">
            <AnimatePresence>
              {logs.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-green-500/5 border border-green-500/10 rounded-lg p-2.5 flex flex-col gap-1"
                >
                  <span className="text-[8px] text-green-500/40 font-bold tracking-widest">{log.time}</span>
                  <span className="text-green-400/90">{log.text}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <footer className="border-t border-white/5 pt-3 text-center text-[8px] font-black uppercase text-gray-600 tracking-[0.2em]">
            🔒 Encrypted Operator Payload Stream
          </footer>
        </div>
      </div>

      {/* 4. Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Glowing Area Chart */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 space-y-6">
          <div>
            <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest block mb-1">Revenue Telemetry</span>
            <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-none">
              FINANCIAL TRAFFIC STREAM
            </h3>
          </div>

          <div className="h-[250px] w-full">
            <AreaChart
              width={500}
              height={250}
              data={barData}
              margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
              style={{ width: '100%' }}
            >
              <defs>
                <linearGradient id="glowBlue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
              <XAxis 
                dataKey="month" 
                tickLine={false} 
                axisLine={false} 
                tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 'bold' }} 
              />
              <YAxis 
                tickLine={false} 
                axisLine={false} 
                tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 'bold' }} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.85)', 
                  borderColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  fontFamily: 'monospace',
                  fontSize: '10px'
                }} 
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#glowBlue)"
              />
            </AreaChart>
          </div>
        </div>

        {/* Glowing Bar Chart */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 space-y-6">
          <div>
            <span className="text-[9px] font-black text-purple-400 uppercase tracking-widest block mb-1">Volume Scan</span>
            <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-none">
              ORDER TRANSACTION STAGE
            </h3>
          </div>

          <div className="h-[250px] w-full">
            <BarChart
              width={500}
              height={250}
              data={barData}
              margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
              style={{ width: '100%' }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
              <XAxis 
                dataKey="month" 
                tickLine={false} 
                axisLine={false} 
                tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 'bold' }} 
              />
              <YAxis 
                tickLine={false} 
                axisLine={false} 
                tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 'bold' }} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.85)', 
                  borderColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  fontFamily: 'monospace',
                  fontSize: '10px'
                }} 
              />
              <Bar 
                dataKey="orders" 
                fill="#a855f7" 
                radius={[8, 8, 0, 0]} 
                maxBarSize={45} 
              />
            </BarChart>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Homepage;
