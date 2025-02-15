import {
  ExternalLink,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { motion } from "framer-motion";

const Hero = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getMyProfile = async () => {
      try {
        const { data } = await axios.get(
          "https://portfolio-backend-gw7d.onrender.com/api/v1/user/portfolio/me",
          { withCredentials: true }
        );
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getMyProfile();
  }, []);

  const handleResumeClick = () => {
    window.open("/sachin_deshpande_resume.pdf", "_blank");
  };

  return (
    <motion.div
      className="w-full text-center md:text-left"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Online Status */}
      <motion.div
        className="flex items-center gap-2 mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="bg-green-400 animate-pulse rounded-full h-2 w-2 shadow-md"></span>
        <p>Online</p>
      </motion.div>

      {/* Heading */}
      <h1 className="text-[1.8rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[3rem] tracking-wide mb-3">
        Hey, I'm{" "}
        <motion.span
          className="font-bold text-indigo-500 relative"
          initial={{ textShadow: "0px 0px 0px rgba(0, 0, 255, 0)" }}
          animate={{
            textShadow: [
              "0px 0px 10px rgba(75, 0, 130, 0.7)",
              "0px 0px 2px rgba(75, 0, 130, 0.4)",
            ],
            transition: {
              repeat: Infinity,
              repeatType: "reverse",
              duration: 1.5,
            },
          }}
        >
          Sachin
        </motion.span>
      </h1>

      {/* Typewriter Animation */}
      <h1 className="text-tubeLight-effect text-[1.5rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[3rem] tracking-[12px]">
        <Typewriter
          words={["Frontend Developer", "MERN Stack Developer"]}
          loop={true}
          cursor
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1200}
        />
      </h1>

      {/* Social Links */}
      <motion.div
        className="flex justify-center md:justify-start gap-5 mt-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        {[
          // { link: user.instagramURL, Icon: Instagram, color: "text-pink-500" },
          // { link: user.facebookURL, Icon: Facebook, color: "text-blue-800" },
          // { link: user.twitterURL, Icon: Twitter, color: "text-blue-500" },
          { link: user.linkedInURL, Icon: Linkedin, color: "text-sky-500" },
          // { link: "", Icon: Youtube, color: "text-red-500" }
        ].map(({ link, Icon, color }, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="relative transition-transform"
          >
            <Link to={link} target="_blank" className={`w-7 h-7 ${color}`}>
              <Icon className="w-7 h-7 hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]" />
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Call-to-Action Buttons */}
      <motion.div
        className="mt-6 flex flex-wrap justify-center md:justify-start gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <Link to={user.githubURL} target="_blank">
          <Button className="rounded-full flex items-center gap-2 px-6 py-2 bg-gray-900 text-white hover:bg-gray-700 transition-all relative overflow-hidden">
            <Github />
            Github
            <motion.span
              className="absolute inset-0 bg-gray-700 opacity-0"
              whileHover={{ opacity: 0.2 }}
            />
          </Button>
        </Link>
        <Button
          onClick={handleResumeClick}
          className="rounded-full flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-indigo-500 hover:to-blue-600 transition-all relative overflow-hidden"
        >
          <ExternalLink />
          Resume
          <motion.span
            className="absolute inset-0 bg-white opacity-10"
            whileHover={{ scale: 1.1, opacity: 0.2 }}
            transition={{ duration: 0.5 }}
          />
        </Button>
      </motion.div>

      {/* About Me Section */}
      <motion.p
        className="mt-8 text-lg tracking-wide text-gray-700 dark:text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        {user.aboutMe}
      </motion.p>

      <hr className="my-8 border-gray-300 dark:border-gray-700" />
    </motion.div>
  );
};

export default Hero;
