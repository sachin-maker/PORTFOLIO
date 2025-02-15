import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Contact = () => {
  const [senderName, setSenderName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMessage = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "https://portfolio-backend-gw7d.onrender.com/api/v1/message/send",
        { senderName, subject, message },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(res.data.message);
      setSenderName("");
      setSubject("");
      setMessage("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <div className="overflow-x-hidden">
      {/* Section Title */}
      <div className="relative flex flex-col items-center mb-8">
        <h1 className="text-[2rem] sm:text-[2.75rem] md:text-[3rem] font-extrabold tracking-wide dark:text-white text-gray-900 relative">
          CONTACT <span className="text-blue-600 dark:text-blue-400">ME</span>
          <span className="block w-full h-[2px] bg-gray-300 dark:bg-gray-600 mt-2"></span>
        </h1>
      </div>

      {/* Contact Form */}
      <form
        onSubmit={handleMessage}
        className="flex flex-col gap-6 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-lg mx-auto"
      >
        {/* Name */}
        <div className="flex flex-col gap-2">
          <Label className="text-lg dark:text-gray-200">Your Name</Label>
          <Input
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            placeholder="Enter your name"
            className="dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        {/* Subject */}
        <div className="flex flex-col gap-2">
          <Label className="text-lg dark:text-gray-200">Subject</Label>
          <Input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter subject"
            className="dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2">
          <Label className="text-lg dark:text-gray-200">Message</Label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message..."
            className="h-28 p-3 rounded-md border dark:bg-gray-700 dark:text-white"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button
            type="submit"
            className="w-full sm:w-52 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="opacity-25"
                  ></circle>
                  <path
                    fill="currentColor"
                    d="M4 12a8 8 0 0116 0h-4l4 4 4-4h-4a8 8 0 01-16 0z"
                    className="opacity-75"
                  ></path>
                </svg>
                Sending...
              </>
            ) : (
              "SEND MESSAGE"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
