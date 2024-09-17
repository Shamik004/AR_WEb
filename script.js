const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');

const points = [];
let drawing = false;
let saveTriggered = false;
let savePaused = false;

// Define button areas
const buttonAreas = {
  clear: { x1: 1100, y1: 40, x2: 1300, y2: 90 },
  save: { x1: 200, y1: 1, x2: 300, y2: 65 },
  play: { x1: 360, y1: 1, x2: 460, y2: 65 },
  pause: { x1: 520, y1: 1, x2: 620, y2: 65 }
};

function drawButtons() {
  canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  canvasCtx.strokeStyle = 'white';
  canvasCtx.lineWidth = 2;

  // Draw Clear Button
  canvasCtx.fillRect(buttonAreas.clear.x1, buttonAreas.clear.y1, buttonAreas.clear.x2 - buttonAreas.clear.x1, buttonAreas.clear.y2 - buttonAreas.clear.y1);
  canvasCtx.strokeRect(buttonAreas.clear.x1, buttonAreas.clear.y1, buttonAreas.clear.x2 - buttonAreas.clear.x1, buttonAreas.clear.y2 - buttonAreas.clear.y1);
  canvasCtx.fillStyle = 'white';
  canvasCtx.fillText('CLEAR', buttonAreas.clear.x1 + 10, buttonAreas.clear.y1 + 35);

  // Draw Save Button
  canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  canvasCtx.fillRect(buttonAreas.save.x1, buttonAreas.save.y1, buttonAreas.save.x2 - buttonAreas.save.x1, buttonAreas.save.y2 - buttonAreas.save.y1);
  canvasCtx.strokeRect(buttonAreas.save.x1, buttonAreas.save.y1, buttonAreas.save.x2 - buttonAreas.save.x1, buttonAreas.save.y2 - buttonAreas.save.y1);
  canvasCtx.fillStyle = 'white';
  canvasCtx.fillText('SAVE', buttonAreas.save.x1 + 10, buttonAreas.save.y1 + 35);

  // Draw Play Button
  canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  canvasCtx.fillRect(buttonAreas.play.x1, buttonAreas.play.y1, buttonAreas.play.x2 - buttonAreas.play.x1, buttonAreas.play.y2 - buttonAreas.play.y1);
  canvasCtx.strokeRect(buttonAreas.play.x1, buttonAreas.play.y1, buttonAreas.play.x2 - buttonAreas.play.x1, buttonAreas.play.y2 - buttonAreas.play.y1);
  canvasCtx.fillStyle = 'white';
  canvasCtx.fillText('PLAY', buttonAreas.play.x1 + 10, buttonAreas.play.y1 + 35);

  // Draw Pause Button
  canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  canvasCtx.fillRect(buttonAreas.pause.x1, buttonAreas.pause.y1, buttonAreas.pause.x2 - buttonAreas.pause.x1, buttonAreas.pause.y2 - buttonAreas.pause.y1);
  canvasCtx.strokeRect(buttonAreas.pause.x1, buttonAreas.pause.y1, buttonAreas.pause.x2 - buttonAreas.pause.x1, buttonAreas.pause.y2 - buttonAreas.pause.y1);
  canvasCtx.fillStyle = 'white';
  canvasCtx.fillText('PAUSE', buttonAreas.pause.x1 + 10, buttonAreas.pause.y1 + 35);
}


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

      // Calculate the distance between forefinger and thumb
      const distance = Math.sqrt(
        Math.pow(thumb[0] - foreFinger[0], 2) + Math.pow(thumb[1] - foreFinger[1], 2)
      );

      // Adjust this value based on your preference for what constitutes "close together"
        const closeDistance = 80;

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

        console.log(foreFinger)
        
      // Handle button presses (Clear, Save, Play, Pause)
      if (foreFinger[1] <= 65) {
        if (foreFinger[0] >= 1100 && foreFinger[0] <= 1300) { // Clear Button
          points.length = 0; // Clear all strokes   
        } else if (foreFinger[0] >= 200 && foreFinger[0] <= 300) { // Save Button
          saveTriggered = true;
        } else if (foreFinger[0] >= 800 && foreFinger[0] <= 1000) { // Play Button
          savePaused = false;
        } else if (foreFinger[0] >= 520 && foreFinger[0] <= 620) { // Pause Button
          savePaused = true;
        }
        drawing = false;
      }
    }
  } else {
    drawing = false;
  }

  // Draw lines on the canvas
  canvasCtx.lineWidth = 4;
  canvasCtx.strokeStyle = '#FFFFFF';
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
function saveDrawing() {
  const dataURL = canvasElement.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = 'drawing.png';
  link.click();
}