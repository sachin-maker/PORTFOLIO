import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Portfolio = () => {
  const [viewAll, setViewAll] = useState(false);
  const [projects, setProjects] = useState([]);

  const getMyProjects = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/project/getall",
        { withCredentials: true }
      );
      setProjects(data.projects);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  }, []);

  useEffect(() => {
    getMyProjects();
  }, [getMyProjects]);

  return (
    <div className="w-full flex flex-col gap-8 sm:gap-12">
      {/* Title with Typewriter Effect */}
      <motion.h1
        className="text-tubeLight-effect text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
        lg:text-[3.8rem] tracking-[15px] mx-auto w-fit"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        PORTFOLIO
      </motion.h1>

      {/* Projects Grid with Staggered Reveal */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
        }}
      >
        {projects &&
          (viewAll ? projects : projects.slice(0, 9)).map((project) => (
            <motion.div
              key={project._id}
              className="relative overflow-hidden rounded-lg group"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Link to={`/project/${project._id}`}>
                <motion.div
                  className="relative group hover:scale-[1.05] transition-transform duration-300"
                  whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5 }}
                >
                  {/* Image with Smooth Transition */}
                  <motion.img
                    src={project.projectBanner?.url || "/fallback.png"}
                    alt={project.title}
                    className="w-full h-60 object-cover rounded-lg transition-all duration-500 
                    group-hover:opacity-80"
                  />

                  {/* Overlay with Project Description */}
                  <motion.div
                    className="absolute inset-0 bg-black bg-opacity-50 opacity-0 
                    group-hover:opacity-100 transition-opacity duration-500 flex 
                    flex-col justify-center items-center text-white p-4"
                  >
                    <p className="text-sm text-gray-200">{project.description}</p>
                  </motion.div>
                </motion.div>
              </Link>

              {/* Always Visible Project Title */}
              <h2 className="text-lg font-semibold text-center mt-2 text-gray-800 dark:text-gray-200">
                {project.title}
              </h2>
            </motion.div>
          ))}
      </motion.div>

      {/* Show More Button with Expanding Effect */}
      {projects.length > 9 && (
        <motion.div
          className="w-full text-center my-9"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Button
            className="w-52 hover:shadow-md transition-all duration-300"
            onClick={() => setViewAll(!viewAll)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {viewAll ? "Show Less" : "Show More"}
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default Portfolio;
