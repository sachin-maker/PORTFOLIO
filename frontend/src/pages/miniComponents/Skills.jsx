import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

const Skills = () => {
  const [skills, setSkills] = useState([]);

  const getMySkills = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "https://portfolio-backend-gw7d.onrender.com/api/v1/skill/getall",
        { withCredentials: true }
      );
      setSkills(data.skills);
    } catch (error) {
      console.error("Failed to fetch skills:", error);
    }
  }, []);

  useEffect(() => {
    getMySkills();
  }, [getMySkills]);

  return (
    <div className="w-full flex flex-col gap-8 sm:gap-12">
      {/* Title */}
      <motion.h1
        className="text-tubeLight-effect text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
        lg:text-[3.8rem] tracking-[15px] dancing_text mx-auto w-fit"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        SKILLS
      </motion.h1>

      {/* Skills Grid */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
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
        {skills.map((skill, index) => (
          <motion.div
            key={skill._id}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Card
              className="h-fit p-7 flex flex-col justify-center items-center gap-3 
              hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 
              relative overflow-hidden group 
              bg-white border border-gray-300 shadow-md dark:bg-gradient-to-br 
              dark:from-gray-800 dark:to-gray-900 dark:hover:from-gray-700 
              dark:hover:to-gray-800 dark:border-none"
            >
              {/* Glow Effect (Only in Dark Mode) */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 
                dark:bg-[radial-gradient(circle,rgba(255,255,255,0.15)_0%,rgba(0,0,0,0)_70%)]"
              ></motion.div>

              {/* SVG with Hover Animation */}
              <motion.img
                src={skill.svg?.url || "/fallback.svg"}
                alt={skill.title}
                className="h-12 sm:h-24 w-auto transition-transform duration-300 
                group-hover:scale-110 group-hover:rotate-3"
              />

              {/* Skill Title */}
              <motion.p
                className="text-center font-medium transition-colors 
                text-gray-800 dark:text-muted-foreground"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {skill.title}
              </motion.p>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Skills;
