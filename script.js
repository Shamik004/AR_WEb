// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getStorage, ref, uploadString } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js";

// Get Firebase configuration from server
let firebaseConfig;
let app;
let storage;

async function initializeFirebase() {
  try {
    const response = await fetch('/api/firebase-config');
    firebaseConfig = await response.json();
    
    // Initialize Firebase
    app = initializeApp(firebaseConfig);
    storage = getStorage(app);
    
    console.log('Firebase initialized successfully');
  } catch (error) {
    console.error('Error initializing Firebase:', error);
  }
}

// Initialize Firebase when the script loads
await initializeFirebase();

const urlParams = new URLSearchParams(window.location.search);
const character = urlParams.get('character');

const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');

const points = [];
let drawing = false;
let saveTriggered = false;
let savePaused = false;

function onResults(results) {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

  if (results.multiHandLandmarks) {
    for (const landmarks of results.multiHandLandmarks) {
      drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, { color: '#00FF00', lineWidth: 5 });
      drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', lineWidth: 2 });

      const foreFinger = [landmarks[8].x * canvasElement.width, landmarks[8].y * canvasElement.height];
      const thumb = [landmarks[4].x * canvasElement.width, landmarks[4].y * canvasElement.height];

      const distance = Math.sqrt(
        Math.pow(thumb[0] - foreFinger[0], 2) + Math.pow(thumb[1] - foreFinger[1], 2)
      );

      const closeDistance = 100;
      console.log(distance)
      if (distance < closeDistance) {
        drawing = false; // Pause drawing
      } else {
        if (!drawing) {
          points.push([foreFinger]);
          drawing = true; // Resume drawing
        } else {
          points[points.length - 1].push(foreFinger);
        }
      }
    }
  } else {
    drawing = false;
  }

  canvasCtx.lineWidth = 4;
  canvasCtx.strokeStyle = '#000000';
  for (const stroke of points) {
    canvasCtx.beginPath();
    for (let i = 0; i < stroke.length - 1; i++) {
      canvasCtx.moveTo(stroke[i][0], stroke[i][1]);
      canvasCtx.lineTo(stroke[i + 1][0], stroke[i + 1][1]);
    }
    canvasCtx.stroke();
  }

  canvasCtx.restore();

  if (saveTriggered && !savePaused) {
    saveTriggered = false;
    saveDrawing();
  }
}

async function saveDrawing() {
  if (!storage) {
    console.error('Firebase not initialized');
    return;
  }

  // Create a temporary canvas to save the drawing
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');

  tempCanvas.width = canvasElement.width;
  tempCanvas.height = canvasElement.height;

  tempCtx.translate(tempCanvas.width, 0);
  tempCtx.scale(-1, 1);

  tempCtx.fillStyle = 'white';
  tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

  tempCtx.lineWidth = 2;
  tempCtx.strokeStyle = 'black';
  for (const stroke of points) {
    tempCtx.beginPath();
    for (let i = 0; i < stroke.length - 1; i++) {
      tempCtx.moveTo(stroke[i][0], stroke[i][1]);
      tempCtx.lineTo(stroke[i + 1][0], stroke[i + 1][1]);
    }
    tempCtx.stroke();
  }

  const timestamp = new Date().getTime();
  const image = tempCanvas.toDataURL('image/png');

  // Upload to Firebase Storage
  const storageRef = ref(storage, `drawings/${character}/drawing_${timestamp}.png`);
  try {
    await uploadString(storageRef, image, 'data_url');
    console.log('Upload successful!');
  } catch (error) {
    console.error('Upload failed:', error);
  }

  const link = document.createElement('a');
  link.href = image;
  link.download = `drawing_${timestamp}.png`;
  link.click();
}

function clearDrawing() {
  points.length = 0;
  drawing = false;
}

document.getElementById('clearButton').addEventListener('click', clearDrawing);
document.getElementById('saveButton').addEventListener('click', () => {
  saveTriggered = true;
});

const hands = new Hands({ locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}` });
hands.setOptions({
  maxNumHands: 1,
  modelComplexity: 1,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});
hands.onResults(onResults);

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({ image: videoElement });
  },
  width: 1280,
  height: 720
});
camera.start();