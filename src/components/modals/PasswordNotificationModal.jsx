import React from 'react';
import Modal from 'react-modal';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Zoom } from '@mui/material';

// import { useNavigate, useLocation, useParams } from 'react-router-dom';

import InfoIcon from '@mui/icons-material/Info';

const customModalStyles = {
  content: {
    maxHeight: '340px',
    maxWidth: '480px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '30px',
    zIndex: 5000,
  },
};

const PasswordNotificationModal = ({ isOpen, onRequestClose, notificationType, notificationMessage, gotoPage }) => {

      // const navigate = useNavigate();
      // alert(notificationMessage);

      const parts = notificationMessage.split("#");
const mainMessage = parts[0];
const details = parts.slice(1);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Notification"
      style={customModalStyles}
    >
      <div className="flex flex-col w-full px-4 pt-4 z-7000">
        <div className='flex justify-center mt-4'>
          {
          // notificationType === null ?
          //             <InfoIcon className='text-theme' style={{ width: '64px', height: '64px' }}/> 
          //              :
                       notificationType === true ? 
            <CheckCircleIcon className='text-green' style={{ width: '64px', height: '64px' }}/> : 
            <CancelIcon className='text-red-500' style={{ width: '64px', height: '64px' }}/>
          }
        </div>

        {/* <div className='flex justify-center w-full my-4 text-center'>
          {notificationMessage}                  
        </div>   */}
        <div className='flex flex-col  w-full my-4 '>
  
    <div className='mb-2 text-center'>{mainMessage}</div>
    <div className='flex flex-col items-start justify-center'>
    {details.map((item, index) => (
      <div key={index} className='flex items-center justify-center mt-1 w-full text-center'>
        {/* <CheckCircleIcon  className='text-green  mr-1'  />  */}
        <span className='text-center'>{item}</span>
      </div>
    ))}
  </div>
</div>

        <div className='flex justify-center'>
          <div 
            onClick={() => {
              onRequestClose();


            }}
            style={{ width: '128px', borderWidth: '1px' }}
            className='text-center border-theme bg-theme rounded-lg px-4 py-2 text-white text-sm cursor-pointer mx-1'>
            Okay
          </div>
{/* {
goto &&
          <div 
            onClick={() => navigate(goto) }
            style={{ width: '128px', borderWidth: '1px' }}
            className='text-center border-theme bg-theme rounded-lg px-4 py-2 text-white text-sm cursor-pointer mx-1'>
            Okay
          </div>
} */}
        </div>
      </div>
    </Modal>
  );
};

export default PasswordNotificationModal;
