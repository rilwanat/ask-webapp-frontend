import React from 'react';
import Modal from 'react-modal';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import InfoIcon from '@mui/icons-material/Info';
import { Zoom } from '@mui/material';

// import { useNavigate, useLocation, useParams } from 'react-router-dom';

const customModalStyles = {
  content: {
    maxHeight: '320px',
    maxWidth: '480px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '30px',
    zIndex: 5000,
  },
};

const BoostNotificationModal = ({ isOpen, onRequestClose, notificationType, notificationMessage, gotoPage }) => {

      // const navigate = useNavigate();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Notification"
      style={customModalStyles}
    >
      <div className="flex flex-col w-full px-4 pt-4 z-5000">
        <div className='flex justify-center mt-4'>
            <InfoIcon className='text-theme' style={{ width: '64px', height: '64px' }}/> 
        </div>

        <div className='flex justify-center w-full my-4 text-center'>
          {notificationMessage}                  
        </div>  

        <div className='flex justify-center'>
          <div 
            onClick={onRequestClose}
            style={{ width: '128px', borderWidth: '1px' }}
            className='text-center border-theme bg-theme rounded-lg px-4 py-2 text-white text-sm cursor-pointer mx-1'>
            Okay
          </div>


{
   (notificationMessage === "Reset code sent to your email.") ? <></> : 

          <div 
            onClick={() => {
              onRequestClose();
              gotoPage('donate');
            }}
            style={{ width: '128px', borderWidth: '1px' }}
            className='text-center border-theme bg-theme rounded-lg px-4 py-2 text-white text-sm cursor-pointer mx-1'>
            Boost
          </div>
        }


        </div>
      </div>
    </Modal>
  );
};

export default BoostNotificationModal;
