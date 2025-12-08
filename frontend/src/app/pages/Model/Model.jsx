"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ModelView from "./ModelView";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models, sizes } from "../../../constants/index";
import { animateWithGsapTimeline } from "../../../utils/animations";

export default function ModelPage() {
  const [size, setSize] = useState("small");
  const [model, setModel] = useState({
    title: "iPhone 15 Pro in Natural Titanium",
    color: ["#8F8A81", "#FFE7B9", "#6F6C64"],
    img: "/model-textures/yellow.jpg",
  });

  const cameraControlSmall = useRef();
  const cameraControlLarge = useRef();
  
  // FIXED: Initialize as THREE.Group() like in React version
  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  // FIXED: Create timeline once, not on every render
  const tl = useRef(gsap.timeline());

  // Animation effect - runs when size changes
  useEffect(() => {
    if (size === "large") {
      animateWithGsapTimeline(
        tl.current,
        small,
        smallRotation,
        "#view1",
        "#view2",
        {
          transform: "translateX(-100%)",
          duration: 2,
        }
      );
    }

    if (size === "small") {
      animateWithGsapTimeline(
        tl.current,
        large,
        largeRotation,
        "#view2",
        "#view1",
        {
          transform: "translateX(0)",
          duration: 2,
        }
      );
    }
  }, [size]); // FIXED: Only depend on size, not rotation values

  useGSAP(() => {
    gsap.to("#heading", { y: 0, opacity: 1 });
  }, []);

  return (
    <section className="common-padding bg-black text-white min-h-screen">
      <div className="screen-max-width mx-auto max-w-7xl px-6 py-12">
        <h1
          id="heading"
          className="section-heading text-center text-5xl md:text-7xl font-semibold mb-16"
          style={{ opacity: 0, transform: "translateY(80px)" }}
        >
          Take a closer look.
        </h1>

        <div className="flex flex-col items-center mt-5">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            <ModelView
              index={1}
              groupRef={small}
              gsapType="view1"
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotation}
              item={model}
              size={size}
            />
            <ModelView
              index={2}
              groupRef={large}
              gsapType="view2"
              controlRef={cameraControlLarge}
              setRotationState={setLargeRotation}
              item={model}
              size={size}
            />

            {/* FIXED: Canvas setup for Next.js */}
            <Canvas
              className="w-full h-full"
              style={{
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: "hidden",
              }}
              eventSource={typeof document !== 'undefined' ? document.body : undefined}
              eventPrefix="client"
            >
              {/* FIXED: Must have View.Port without index prop, or separate ones */}
              <View.Port />
            </Canvas>
          </div>

          {/* Controls */}
          <div className="mx-auto w-full mt-12">
            <p className="text-sm font-light text-center mb-5 text-gray-300">
              {model.title}
            </p>

            <div className="flex-center flex flex-col md:flex-row gap-5 items-center justify-center">
              {/* Color selector */}
              <ul className="color-container flex gap-3">
                {models.map((item, i) => (
                  <li
                    key={i}
                    className="w-6 h-6 rounded-full cursor-pointer border-2 border-white/30 hover:scale-110 transition-transform"
                    style={{ backgroundColor: item.color[0] }}
                    onClick={() => setModel(item)}
                  />
                ))}
              </ul>

              {/* Size selector */}
              <div className="size-btn-container flex bg-white/10 backdrop-blur-lg rounded-full p-1">
                {sizes.map(({ label, value }) => (
                  <span
                    key={label}
                    className="size-btn px-5 py-2 rounded-full cursor-pointer transition-all text-sm"
                    style={{
                      backgroundColor: size === value ? "white" : "transparent",
                      color: size === value ? "black" : "white",
                    }}
                    onClick={() => setSize(value)}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}