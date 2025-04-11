import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';

const SelfieWidget = ({ uploadEndpoint, onUploadSuccess, onUploadError, isLoading, setIsLoading, imageSrc, setImageSrc }) => {
//   const [imageSrc, setImageSrc] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const webcamRef = useRef(null);

  // Toggle camera on/off
  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
    if (!isCameraOn) {
      setImageSrc(null); // Reset image when turning camera back on
    }
  };

  // Capture image from webcam
  const captureImage = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImageSrc(imageSrc);
      setIsCameraOn(false); // Turn off camera after capture
    }
  };

  

  // Video constraints for front camera
  const videoConstraints = {
    facingMode: 'user',
    width: { ideal: 640 },
    height: { ideal: 640 }
  };

  return (
    <div className="selfie-widget max-w-[500px] mx-auto mt-8">
      {error && (
        <div className="text-red-500 mb-2.5">
          {error}
        </div>
      )}
      
      {!imageSrc ? (
        <div className="space-y-4 ">
          {isCameraOn ? (
            <>
              <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                  className="absolute h-full w-full object-cover scale-x-[-1]"
                  mirrored={true}
                  onUserMediaError={() => {
                    setError("Could not access camera. Please ensure you've granted camera permissions.");
                    setIsCameraOn(false);
                  }}
                />
              </div>
              
              <div className="flex gap-2.5">
                <button
                  onClick={toggleCamera}
                  className="flex-1 mt-4 text-center rounded-sm px-4 py-2 text-sm cursor-pointer bg-gray-500 text-white hover:bg-gray-600"
                >
                  Turn Camera Off
                </button>
                <button
                  onClick={captureImage}
                  className="flex-1 mt-4 text-center rounded-sm px-4 py-2 text-sm cursor-pointer bg-theme text-white hover:text-softTheme"
                >
                  Capture Selfie
                </button>
              </div>
            </>
          ) : (
            <div className="flex justify-center gap-2.5">
                <button
                    onClick={toggleCamera}
                    style={{ borderWidth: '0px', width: '200px' }} 
                    className="w-full mt-4 text-center rounded-sm px-4 py-2 text-sm cursor-pointer bg-theme text-white hover:text-softTheme"
                >
                    Turn Camera On
                </button>
            </div>
            
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
            <img 
              src={imageSrc} 
              alt="Captured selfie" 
              className="absolute h-full w-full object-cover scale-x-[-1]"
            />
          </div>
          
          <div className="flex gap-2.5">
            <button
              onClick={() => {
                setImageSrc(null);
                setIsCameraOn(true);
              }}
              
              className="flex-1 mt-4 text-center rounded-sm px-4 py-2 text-sm cursor-pointer bg-theme text-white hover:text-softTheme"
            >
              Retake
            </button>
            {/* <button
              onClick={uploadImage}
              disabled={isLoading}
              className={`flex-1 mt-4 text-center rounded-sm px-4 py-2 text-sm cursor-pointer bg-theme text-white hover:text-softTheme ${isLoading ? 'opacity-70' : ''}`}
            >
              {isLoading ? 'Uploading...' : 'Upload Selfie'}
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelfieWidget;