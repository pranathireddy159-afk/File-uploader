# File Uploader (Chunk-based Simulation)

This project demonstrates a **simulated chunk-based file upload** using **React + TypeScript**.

## Features
- Simulates chunked upload using `setTimeout`
- Upload progresses chunk by chunk
- Intentional failure at a specific chunk to demonstrate error handling
- Retry upload functionality
- Simple upload state machine:
  - idle
  - fileSelected
  - uploading
  - error
  - completed

## Tech Stack
- React
- TypeScript
- Vite
- Tailwind CSS

## How it works
- User selects a file
- Upload starts and progresses chunk by chunk
- Upload fails at chunk 3 (simulated)
- User can retry and complete upload

## Run locally
```bash
npm install
npm run dev

## Author
Pranathi Reddy M