import gsap from "gsap";

export const animateWithGsapTimeline = (
  timeline,
  rotationRef,
  rotationState,
  firstTarget,
  secondTarget,
  animationProps
) => {
  // Check if rotation ref exists and has current property
  if (!rotationRef.current || !rotationRef.current.rotation) {
    console.warn("Rotation ref not ready");
    return;
  }

  // Animate the 3D model rotation
  timeline.to(rotationRef.current.rotation, {
    y: rotationState,
    duration: 1,
    ease: "power2.inOut",
  });

  // Animate first view (e.g., #view1)
  timeline.to(
    firstTarget,
    {
      ...animationProps,
      ease: "power2.inOut",
    },
    "<" // Start at the same time as previous animation
  );

  // Animate second view (e.g., #view2)
  timeline.to(
    secondTarget,
    {
      ...animationProps,
      ease: "power2.inOut",
    },
    "<" // Start at the same time as previous animation
  );
};