# AR Web Drawing Application

## Overview
The **AR Web Drawing Application** allows users to draw in the air using hand gestures captured through their device's camera. The application uses MediaPipe for real-time hand tracking and converts finger movements into digital strokes on a canvas. Users can save their drawings as PNG files with a white background and black strokes, which are automatically uploaded to Firebase Storage for data collection purposes.

## Features
- **Hand Gesture-Based Drawing**: Draw in the air using finger movements without touching the screen
- **Real-Time Hand Tracking**: Uses MediaPipe to detect and track hand landmarks with high accuracy
- **Gesture Controls**: 
  - Drawing when index finger and thumb are apart
  - Pause drawing when index finger and thumb are close together
- **Save & Upload**: Automatically saves drawings as PNG files with white background and black strokes
- **Firebase Integration**: Uploads drawings to Firebase Storage with timestamps and character categorization
- **Web-Based Interface**: No app installation required; runs directly in web browsers
- **Clear Functionality**: Reset the canvas to start a new drawing
- **Responsive Design**: Works across different devices with Bootstrap styling
- **Mirrored Display**: Canvas is horizontally flipped for natural drawing experience

## Technologies Used
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Hand Tracking**: MediaPipe Hands library
- **UI Framework**: Bootstrap 5.3.0
- **Backend**: Node.js with Express.js
- **Database & Storage**: Firebase Storage
- **Deployment**: Render.com
- **Environment Management**: dotenv

## Project Structure
```
AR_WEb/
├── index.html              # Main application interface
├── script.js               # Core application logic and MediaPipe integration
├── server.js               # Express.js server for Firebase configuration
├── package.json            # Node.js dependencies and scripts
├── .env                    # Environment variables (Firebase config)
├── fun.html               # Alternative drawing interface
├── data.html              # Data collection interface
├── instructions.html       # User instructions page
└── styles.css             # Custom styling
```

## Setup Instructions

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/shamik004/AR_WEb.git
   ```

2. Navigate to the project folder:
   ```bash
   cd AR_WEb
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file with your Firebase configuration:
   ```env
   FIREBASE_API_KEY=your_api_key
   FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   FIREBASE_APP_ID=your_app_id
   FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open `http://localhost:3000` in your web browser

### Production Deployment
The application is deployed on Render.com with automatic deployments from the main branch.

## Usage
1. **Camera Access**: Allow camera access when prompted by the browser
2. **Drawing**: 
   - Keep your index finger and thumb apart to draw
   - Bring your index finger and thumb close together to pause drawing
   - Move your hand to create strokes on the canvas
3. **Saving**: Click the **Save** button to download and upload your drawing to Firebase
4. **Clearing**: Click the **Clear** button to reset the canvas
5. **Character Selection**: Use URL parameters to specify character types for data collection

## API Endpoints
- `GET /` - Serves the main application
- `GET /api/firebase-config` - Returns Firebase configuration for client-side initialization

## Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari (iOS 14.3+)
- Edge

**Note**: HTTPS is required for camera access in production environments.

## Firebase Storage Structure
```
drawings/
├── character_name/
│   ├── drawing_timestamp1.png
│   ├── drawing_timestamp2.png
│   └── ...
```

## Environment Variables
- `FIREBASE_API_KEY` - Firebase API key
- `FIREBASE_AUTH_DOMAIN` - Firebase authentication domain
- `FIREBASE_PROJECT_ID` - Firebase project ID
- `FIREBASE_STORAGE_BUCKET` - Firebase storage bucket
- `FIREBASE_MESSAGING_SENDER_ID` - Firebase messaging sender ID
- `FIREBASE_APP_ID` - Firebase app ID
- `FIREBASE_MEASUREMENT_ID` - Firebase measurement ID
- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 3000)

## Live Demo
[Try the Application](https://ar-web.onrender.com/)

## Future Enhancements
- **Multi-language Support**: Add support for different character sets and languages
- **Drawing Tools**: Implement different brush sizes and colors
- **Gesture Recognition**: Add more gesture controls for advanced features
- **Drawing Accuracy**: Improve smoothing algorithms for better stroke quality
- **Offline Mode**: Add offline drawing capabilities with sync when online
- **User Authentication**: Implement user accounts for personalized data collection
- **Analytics Dashboard**: Create an admin panel for viewing collected data

## Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## Troubleshooting
- **Camera not working**: Ensure HTTPS is enabled and camera permissions are granted
- **Hand tracking issues**: Ensure good lighting and clear hand visibility
- **Firebase upload errors**: Check network connection and Firebase configuration
- **Drawing lag**: Try reducing video resolution or closing other browser tabs

## Author
Developed by **Shamik**

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Google MediaPipe team for the hand tracking technology
- Firebase team for the storage and hosting services
- Bootstrap team for the responsive UI components