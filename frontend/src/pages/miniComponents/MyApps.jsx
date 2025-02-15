import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MyApps = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const getMyApps = async () => {
      try {
        const { data } = await axios.get(
          "https://portfolio-backend-gw7d.onrender.com/api/v1/softwareapplication/getall",
          { withCredentials: true }
        );
        setApps(data.softwareApplications);
      } catch (error) {
        console.error("Error fetching apps:", error);
      }
    };
    getMyApps();
  }, []);

  return (
    <div className="w-full flex flex-col gap-8 sm:gap-12">
      {/* Title */}
      <motion.h1
        className="text-tubeLight-effect text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] 
        tracking-[15px] dancing_text mx-auto w-fit"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        MY APPS
      </motion.h1>

      {/* Grid Container */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.15, ease: "easeOut" },
          },
        }}
      >
        {apps.map((app) => (
          <motion.div
            key={app._id}
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <Card
              className="h-fit p-7 flex flex-col justify-center items-center gap-3 
              bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-xl 
              hover:shadow-xl transition-all duration-300 dark:bg-gray-800/50"
            >
              {/* Image */}
              <motion.img
                src={app.svg?.url || "/placeholder.svg"}
                alt={app.name}
                className="h-16 sm:h-24 w-auto object-contain drop-shadow-lg"
                loading="lazy"
                whileHover={{ rotate: [0, -2, 2, 0] }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />

              {/* Name */}
              <p className="text-muted-foreground text-center text-lg font-semibold tracking-wide">
                {app.name}
              </p>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default MyApps;
