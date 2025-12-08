// // components/Promote.jsx
// "use client";

// import { useRef, useState, useEffect } from "react";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { hightlightsSlides } from "@/constants";
// import { pauseImg, playImg, replayImg } from "@/constants";

// gsap.registerPlugin(ScrollTrigger);

// const Promote = () => {
//   const videoRef = useRef([]);
//   const videoSpanRef = useRef([]);
//   const videoDivRef = useRef([]);

//   const [video, setVideo] = useState({
//     isEnd: false,
//     startPlay: false,
//     videoId: 0,
//     isLastVideo: false,
//     isPlaying: false,
//   });

//   const [loadedData, setLoadedData] = useState([]);
//   const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

//   useGSAP(() => {
//     gsap.to("#slider", {
//       transform: `translateX(${-100 * videoId}%)`,
//       duration: 2,
//       ease: "power2.inOut",
//     });

//     gsap.to("#video", {
//       scrollTrigger: {
//         trigger: "#video",
//         toggleActions: "play none none reverse",
//       },
//       onComplete: () => {
//         setVideo((prev) => ({
//           ...prev,
//           startPlay: true,
//           isPlaying: true,
//         }));
//       },
//     });
//   }, [videoId, isEnd]);

//   // Play / pause
//   useEffect(() => {
//     if (loadedData.length > 3) {
//       const cur = videoRef.current[videoId];
//       if (!isPlaying) cur?.pause();
//       else if (startPlay) cur?.play();
//     }
//   }, [startPlay, videoId, isPlaying, loadedData]);

//   // Progress bar
//   useEffect(() => {
//     let curProg = 0;
//     const span = videoSpanRef.current;

//     if (span[videoId]) {
//       const anim = gsap.to(span[videoId], {
//         onUpdate: () => {
//           const prog = Math.ceil(anim.progress() * 100);
//           if (prog !== curProg) {
//             curProg = prog;
//             gsap.to(videoDivRef.current[videoId], {
//               width:
//                 window.innerWidth < 760
//                   ? "10vw"
//                   : window.innerWidth < 1200
//                   ? "10vw"
//                   : "4vw",
//             });
//             gsap.to(span[videoId], {
//               width: `${curProg}%`,
//               backgroundColor: "white",
//             });
//           }
//         },
//         onComplete: () => {
//           if (isPlaying) {
//             gsap.to(videoDivRef.current[videoId], { width: "12px" });
//             gsap.to(span[videoId], { backgroundColor: "#afafaf" });
//           }
//         },
//       });

//       if (videoId === 0) anim.restart();

//       const tick = () => {
//         if (videoRef.current[videoId]) {
//           anim.progress(
//             videoRef.current[videoId].currentTime /
//               hightlightsSlides[videoId].videoDuration
//           );
//         }
//       };

//       if (isPlaying) gsap.ticker.add(tick);
//       else gsap.ticker.remove(tick);
//     }
//   }, [videoId, startPlay, isPlaying]);

//   const handleProcess = (type, i) => {
//     switch (type) {
//       case "video-end":
//         setVideo((p) => ({ ...p, isEnd: true, videoId: i + 1 }));
//         break;
//       case "video-last":
//         setVideo((p) => ({ ...p, isLastVideo: true }));
//         break;
//       case "video-reset":
//         setVideo((p) => ({ ...p, isLastVideo: false, videoId: 0, isEnd: false }));
//         break;
//       case "play":
//         setVideo((p) => ({ ...p, isPlaying: true }));
//         break;
//       case "pause":
//         setVideo((p) => ({ ...p, isPlaying: false }));
//         break;
//       default:
//         return video;
//     }
//   };

//   const handleLoadedMetadata = (i, e) => setLoadedData((p) => [...p, e]);

//   return (
//     <>
//       <div className="flex items-center overflow-hidden">
//         {hightlightsSlides.map((list, i) => (
//           <div key={list.id} id="slider" className="sm:pr-20 pr-10">
//             <div className="video-carousel_container">
//               <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
//                 <video
//                   id={i === 0 ? "video" : undefined}
//                   playsInline
//                   preload="auto"
//                   muted
//                   className={`pointer-events-none ${list.id === 2 && "translate-x-44"}`}
//                   ref={(el) => (videoRef.current[i] = el)}
//                   onPlay={() => setVideo((p) => ({ ...p, isPlaying: true }))}
//                   onEnded={() =>
//                     i !== 3
//                       ? handleProcess("video-end", i)
//                       : handleProcess("video-last")
//                   }
//                   onLoadedMetadata={(e) => handleLoadedMetadata(i, e)}
//                 >
//                   <source src={list.video} type="video/mp4" />
//                 </video>
//               </div>

//               <div className="absolute top-12 left-[5%] z-10">
//                 {list.textLists.map((txt, idx) => (
//                   <p
//                     key={idx}
//                     className="md:text-2xl text-xl font-medium text-white"
//                   >
//                     {txt}
//                   </p>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="relative flex-center mt-10">
//         <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
//           {hightlightsSlides.map((_, i) => (
//             <span
//               key={i}
//               ref={(el) => (videoDivRef.current[i] = el)}
//               className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
//             >
//               <span
//                 className="absolute h-full w-0 rounded-full"
//                 ref={(el) => (videoSpanRef.current[i] = el)}
//               />
//             </span>
//           ))}
//         </div>

//         <button className="control-btn">
//           <img
//             src={isLastVideo ? replayImg : isPlaying ? pauseImg : playImg}
//             alt={isLastVideo ? "replay" : isPlaying ? "pause" : "play"}
//             onClick={
//               isLastVideo
//                 ? () => handleProcess("video-reset")
//                 : isPlaying
//                 ? () => handleProcess("pause")
//                 : () => handleProcess("play")
//             }
//           />
//         </button>
//       </div>
//     </>
//   );
// };

// export default Promote;