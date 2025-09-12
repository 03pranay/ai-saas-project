import React from "react";
import { useState } from "react";
import { Image, Sparkles } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
const GenerateImage = () => {
  const imagestyle = [
    "realistic",
    "ghibli style",
    "anime style",
    "cartoon style",
    "fantasy style",
    "realistic style",
    "3D style",
    "portrait style",
  ];
  const [selectedstyle, setSelectedStyle] = useState("realistic");
  const [input, setInput] = useState("");
  const [publish, setpublish] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const { getToken } = useAuth();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Generate a ${selectedstyle} image of ${input}`;
      const { data } = await axios.post(
        "/api/ai/generate-image",
        { prompt, publish },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );
      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };
  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      <form
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
        onSubmit={submitHandler}
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 text-[#1E40AF]" />
          <h1 className="text-xl font-semibold">AI Image Generator</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Describe Your Image</p>
        <textarea
          onChange={(e) => setInput(e.target.value)}
          value={input}
          rows={4}
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          placeholder="Describe what you want to see in image..."
          required
        />
        <p className="mt-4 text-sm font-medium">Style</p>
        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
          {imagestyle.map((item) => (
            <span
              onClick={() => setSelectedStyle(item)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                selectedstyle === item
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black"
              }`}
              key={item}
            >
              {item}
            </span>
          ))}
        </div>
        <div className="my-6 flex items-center gap-2">
          <label className="relative cursor-pointer">
            <input
              type="checkbox"
              onChange={(e) => setpublish(e.target.checked)}
              checked={publish}
              className="sr-only peer"
            />

            <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-500 transition"></div>
            <span className="absolute left-1 top-1 w-3  h-3 bg-white rounded-full transition peer-checked:translate-x-4"></span>
            <p className="text-sm">Make this image public</p>
          </label>
        </div>
        <br />
        <button
          disabled={Loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] text-white py-2 px-4 mt-6 text-sm rounded-lg cursor-pointer"
        >
          {Loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
            <Image className="w-5" />
          )}
          Generate Image
        </button>
      </form>
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]">
        <div className="flex items-center gap-3">
          <Image className="w-5 h-5 text-[#1E40AF]" />
          <h1 className="text-lg font-semibold">Generated Images</h1>
        </div>
        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Image className="w-9 h-9" />
              <p>
                Enter a topic to and click "generate image" to see the result.
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-3 h-full">
            <img src={content} className="w-full h-full object-contain" />
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateImage;
