import { Button } from "@mui/material";
import { useRef } from "react";
import Webcam from "react-webcam";

interface PictureModalProps {
  handleSetImage: (src: string) => void;
  onClose: () => void;
}

const PictureModal: React.FC<PictureModalProps> = ({
  handleSetImage,
  onClose,
}) => {
  const webcamRef = useRef<Webcam>(null);

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      handleSetImage(imageSrc);
    }
    onClose();
  };

  return (
    <div className='flex flex-col gap-4'>
      <Webcam
        imageSmoothing
        audio={false}
        ref={webcamRef}
        screenshotFormat='image/jpeg'
        videoConstraints={{
          width: 250,
          height: 250,
          facingMode: "user",
        }}
      />
      <Button
        fullWidth
        variant='contained'
        size='small'
        color='bfpRed'
        onClick={capture}
      >
        Capture
      </Button>
    </div>
  );
};

export default PictureModal;
