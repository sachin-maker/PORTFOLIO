import React from "react";
// import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { 
  ExternalLink, 
  Facebook, 
  Github, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Youtube 
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="p-6 mt-10 w-full max-w-[1050px] mx-auto text-center sm:text-left">
      <hr className="border-gray-300 dark:border-gray-700" />
      
      <h1 className="text-tubeLight-effect text-2xl sm:text-3xl mt-5 tracking-widest">
        Thanks For Scrolling
      </h1>
      
      <div className="flex justify-center sm:justify-start gap-4 mt-4">
        <a href="https://github.com/sachin-maker" target="_blank" rel="noopener noreferrer">
          <Github className="text-xl hover:text-gray-600 dark:hover:text-gray-400 transition" />
        </a>
        <a href="https://www.linkedin.com/in/sachin-deshpande-345295174/" target="_blank" rel="noopener noreferrer">
          <Linkedin className="text-xl hover:text-blue-600 dark:hover:text-blue-400 transition" />
        </a>
       
      </div>

      <p className="text-gray-500 dark:text-gray-400 text-sm mt-4">
        © {new Date().getFullYear()} Sachin Deshpande. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
