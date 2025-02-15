import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const ProjectView = () => {
  const [project, setProject] = useState(null);
  const { id } = useParams();
  // const navigate = useNavigate();

  useEffect(() => {
    const getProject = async () => {
      try {
        const { data } = await axios.get(
          `https://portfolio-backend-gw7d.onrender.com/api/v1/project/get/${id}`,
          { withCredentials: true }
        );
        setProject(data.project);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch project");
      }
    };
    getProject();
  }, [id]);

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">Loading project details...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen px-5 md:px-0 relative bg-gray-100 dark:bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* 🔥 Hero Section */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-[100px] opacity-30"
        style={{
          backgroundImage: `url(${
            project.projectBanner?.url || "/avatarHolder.jpg"
          })`,
        }}
      />

      {/* Project Card */}
      <motion.div
        className="max-w-3xl w-full bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 backdrop-blur-lg bg-opacity-80 dark:bg-opacity-80"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          {project.title}
        </h1>

        {/* Banner */}
        <motion.img
          src={project.projectBanner?.url || "/avatarHolder.jpg"}
          alt={project.title}
          className="w-full h-64 object-cover rounded-lg mt-4 shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        />

        {/* Description */}
        <motion.div className="mt-6 text-gray-700 dark:text-gray-300">
          <p className="text-xl font-semibold">📖 Description:</p>
          <ul className="list-disc pl-6 space-y-1">
            {project.description.split(". ").map((sentence, index) => (
              <li key={index}>{sentence}</li>
            ))}
          </ul>
        </motion.div>

        {/* Technologies */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <p className="text-xl font-semibold mb-2">🛠 Technologies:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {project.technologies.split(", ").map((tech, index) => (
              <span
                key={index}
                className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-lg text-sm font-medium text-center shadow-md"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Stack */}
        <motion.p
          className="mt-6 text-lg text-gray-800 dark:text-gray-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <strong>📌 Stack:</strong> {project.stack}
        </motion.p>

        {/* Deployment Info */}
        <motion.p
          className="mt-3 text-lg text-gray-800 dark:text-gray-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <strong>🚀 Deployed:</strong> {project.deployed}
        </motion.p>

        {/* Links */}
        <motion.div
          className="mt-6 flex flex-col gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <p className="text-xl font-semibold">🔗 Links:</p>
          <Link
            to={project.gitRepoLink}
            target="_blank"
            className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-800 transition-all"
          >
            GitHub Repository
          </Link>
          <Link
            to={project.projectLink}
            target="_blank"
            className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-800 transition-all"
          >
            Live Project
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectView;
