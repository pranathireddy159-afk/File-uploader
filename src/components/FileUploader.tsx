import { useState, useEffect } from "react";

type UploadState = "idle" | "fileSelected" | "uploading" | "completed" | "error";

function FileUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const TOTAL_CHUNKS = 5;
  const [currentChunk, setCurrentChunk] = useState(1);
  const [hasFailed, setHasFailed] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setUploadState("fileSelected");
      setMessage("");
    }
  };

  const handleUpload = () => {
    if (!file) {
      setMessage("Please select a file first");
      return;
    }
     
    setUploadState("uploading");
    setCurrentChunk(1);
    setMessage("Uploading chunk 1 of ${TOTAL_CHUNKS}");

  };

  useEffect(() => {
    if (uploadState !== "uploading") return;
  
    if (currentChunk > TOTAL_CHUNKS) {
      setUploadState("completed");
      setMessage("Upload completed successfully ✅");
      return;
    }
  
    const timer = setTimeout(() => {
      if (currentChunk === 3 && !hasFailed) {
        setHasFailed(true);
        setUploadState("error");
        setMessage("Failed to upload chunk 3 ❌");
        return;
      }
  
      setMessage(`Uploading chunk ${currentChunk} of ${TOTAL_CHUNKS}`);
      setCurrentChunk((prev) => prev + 1);
    }, 1000);
  
    return () => clearTimeout(timer);
  }, [uploadState, currentChunk, hasFailed, TOTAL_CHUNKS]);

  return (
    <div className="p-6 space-y-4">
      <input 
        type="file" 
        onChange={handleChange} 
        disabled={uploadState === "uploading"}/>
      <br /><br />
      <button 
        onClick={handleUpload}
        disabled={uploadState === "uploading"}
        className={`px-4 py-2 rounded text-white ${
            uploadState === "uploading"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600"
          }`}
        >
          {uploadState === "uploading" ? "Uploading..." : "Upload"}
        
        </button>

      {message && (
        <p className="text-sm text-gray-700">{message}</p>
    )}

{uploadState === "error" && (
  <button
    onClick={() => {
      setHasFailed(false);
      setCurrentChunk(1);
      setMessage(`Uploading chunk 1 of ${TOTAL_CHUNKS}`);
      setUploadState("uploading");
    }}
    className="mt-2 px-3 py-1 text-sm bg-red-500 text-white rounded"
  >
    Retry Upload
  </button>
)}
    <p className="text-xs text-gray-500">
      Current state: {uploadState}
    </p>

    {uploadState === "completed" && (
      <p className="text-green-600 text-sm">
        ✅ File uploaded
        </p>)}

        {uploadState === "completed" && (
  <button
    onClick={() => {
      setFile(null);
      setUploadState("idle");
      setMessage("");
    }}
    className="px-3 py-1 text-sm bg-gray-200 rounded"
  >
    Upload another file
  </button>
)}
    </div>
  );
}

export default FileUploader;