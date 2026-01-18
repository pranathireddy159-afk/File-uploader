import { useState } from "react";

export type UploadState =
  | "idle"
  | "fileSelected"
  | "uploading"
  | "completed";

export function useFileUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [uploadState, setUploadState] = useState<UploadState>("idle");

  return {
    file,
    setFile,
    message,
    setMessage,
    uploadState,
    setUploadState,
  };
}