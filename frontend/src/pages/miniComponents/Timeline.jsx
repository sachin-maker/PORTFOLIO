import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Timeline = () => {
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    const getMyTimeline = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/timeline/getall",
          { withCredentials: true }
        );
        setTimeline(data.timelines.reverse());
      } catch (error) {
        console.error("Error fetching timeline data:", error);
      }
    };
    getMyTimeline();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Title Animation */}
      <motion.h1
        className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] font-extrabold text-center tracking-wide mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Timeline
      </motion.h1>

      <motion.ol
        className="relative border-s-2 border-gray-300 dark:border-gray-700 pl-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 },
          },
        }}
      >
        {timeline.length > 0 ? (
          timeline.map((element, index) => (
            <motion.li
              key={element._id}
              className="mb-12 ms-6 group"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              {/* Timeline Marker - FIXED HOVER ISSUE */}
              <motion.span
                className="absolute flex items-center justify-center w-8 h-8 
                bg-blue-500 text-white font-bold rounded-full -start-4 ring-4 
                ring-white dark:ring-gray-900 transition-all duration-300 shadow-lg"
                whileHover={{
                  scale: 1.05, // Subtle scale increase to prevent jitter
                  transition: { duration: 0.3, ease: "easeInOut" },
                }}
                style={{ willChange: "transform" }} // Optimize rendering
              >
                {index + 1}
              </motion.span>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                {element.title}
              </h3>

              {/* Date Range */}
              <time className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                {element.timeline.from} - {element.timeline.to || "Present"}
              </time>

              {/* Description */}
              <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                {element.description}
              </p>
            </motion.li>
          ))
        ) : (
          <p className="text-center text-lg font-medium text-gray-500 dark:text-gray-400">
            No timelines available
          </p>
        )}
      </motion.ol>
    </div>
  );
};

export default Timeline;
