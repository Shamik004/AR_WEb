# AR Web Drawing Application

## Overview
The **AR Web Drawing Application** allows users to draw in the air using hand gestures. The application uses the device's camera to track hand movements and converts them into digital strokes. The drawn images are saved as JPG files and can be uploaded automatically to Firebase.

## Features
- **Hand Gesture-Based Drawing**: Draw in the air using your fingers without touching the screen.
- **Camera-Based Tracking**: Uses the device's camera to detect hand gestures.
- **Save & Upload**: Automatically saves drawings as JPG files and uploads them to Firebase.
- **Web-Based**: No need for app installation; runs in the browser.
- **Clear & Undo Options**: Provides a clear button to erase drawings.
- **Optimized for Mobile & Desktop**: Works across different devices with a seamless experience.

## Technologies Used
- **HTML, CSS, JavaScript**: For frontend development.
- **A-Frame (v1.6.0) & AR.js (v3.4.5)**: For augmented reality functionalities.
- **Mediapipe**: For hand-tracking capabilities.
- **Firebase Storage**: For uploading and storing images.

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/shamik004/AR_WEb.git
   ```
2. Navigate to the project folder:
   ```bash
   cd AR_WEb
   ```
3. Open `index.html` in a web browser to run the application.

## Usage
1. Allow camera access when prompted.
2. Move your finger in the air to draw.
3. Click the **Save** button to store your drawing.
4. Click **Clear** to reset the canvas.

## Live Demo
[Try it here](https://shamik004.github.io/AR_WEb/)

## Future Enhancements
- Implementing gesture recognition for additional controls.
- Enhancing drawing accuracy and smoothing.
- Adding color and brush size customization options.

## Author
Developed by **Shamik**.

## License
This project is licensed under the MIT License.
