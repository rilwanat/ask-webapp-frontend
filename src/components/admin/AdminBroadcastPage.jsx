import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AdminHeader from '../navbar/admin-navbar/AdminHeader';
import AdminFooter from '../navbar/admin-navbar/AdminFooter';

import axiosAdminInstance from '../../auth/axiosAdminConfig';
import { setCookie, isAuthenticated, getCookie, deleteCookie } from '../../auth/authUtils';
import { jwtDecode } from 'jwt-decode';

import NotificationModal from '../modals/NotificationModal';

export default function AdminBroadcastPage({
  isMobile,
  currentRequestSlide, carouselRequestItems, setCurrentRequestSlide,
  currentBeneficiarySlide, carouselBeneficiaryItems, setCurrentBeneficiarySlide,
  currentSponsorSlide, carouselSponsorItems, setCurrentSponsorSlide,
}) {
  const navigate = useNavigate();

  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDataloading, setIsDataLoading] = useState(false);

  // notification modal states
  const [notificationType, setNotificationType] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  const openNotificationModal = (type, title, message) => {
    setNotificationType(type);
    setNotificationTitle(title);
    setNotificationMessage(message);
    setIsNotificationModalOpen(true);
  };

  const closeNotificationModal = () => {
    setIsNotificationModalOpen(false);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const gotoPage = (pageName) => {
    navigate('/' + pageName);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const sendBroadcast = async () => {
    if (isDataloading) {
      openNotificationModal(false, 'Broadcast', 'Please wait...');
      return;
    }

    if (!broadcastMessage.trim() && !selectedFile) {
      openNotificationModal(false, 'Broadcast', 'Message or file is required.');
      return;
    }

    setIsDataLoading(true);

    try {
      const endpoint = import.meta.env.VITE_API_SERVER_URL + import.meta.env.VITE_ADMIN_BROADCAST;

      const formData = new FormData();
      formData.append('message', broadcastMessage);
      if (selectedFile) {
        formData.append('file', selectedFile);
      }

      const response = await axiosAdminInstance.post(endpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setIsDataLoading(false);

      if (response.data.status) {
        openNotificationModal(true, 'Broadcast Sent', response.data.message || 'Message sent successfully.');
        setBroadcastMessage('');
        setSelectedFile(null);
        setPreview(null);
      } else {
        openNotificationModal(false, 'Broadcast Error', response.data.message);
      }
    } catch (error) {
      setIsDataLoading(false);
      openNotificationModal(false, 'Broadcast Error', error.message || 'An error occurred');
    }
  };

  return (
    <div className="bg-theme h-full">
      <AdminHeader
        isMobile={isMobile}
        carouselRequestItems={carouselRequestItems}
        carouselBeneficiaryItems={carouselBeneficiaryItems}
        carouselSponsorItems={carouselSponsorItems}
        gotoPage={gotoPage}
        showMarqees={false}
      />

      <div className="flex flex-col items-center px-0 sm:px-16 md:px-24 h-full">
        <div className="p-4 rounded-lg w-full mt-24">
          <div className="p-4 bg-theme rounded-lg w-full">
            <div className="flex w-full">
              <div className="w-full">
                <div className="flex flex-col gap-4 w-full">
                  <textarea
                    className="w-full h-48 p-4 border border-gray-300 rounded-lg bg-white text-black"
                    placeholder="Enter broadcast message..."
                    value={broadcastMessage}
                    onChange={(e) => setBroadcastMessage(e.target.value)}
                  />

                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="p-2 border border-gray-300 rounded-lg bg-white text-black"
                  />
                  {selectedFile && (
                    <p className="text-white text-sm mt-1">Selected: {selectedFile.name}</p>
                  )}

                  {preview && (
                    <img
                      src={preview}
                      alt="Preview"
                      className="mt-2"
                      style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                  )}

                  <div
                    onClick={sendBroadcast}
                    className="flex justify-center items-center rounded-lg px-4 py-2 bg-theme border border-softTheme cursor-pointer mb-4 mx-2"
                  >
                    <div className="text-s text-white">
                      {isDataloading ? 'Sending...' : 'Send Broadcast'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AdminFooter />

      <NotificationModal
        isOpen={isNotificationModalOpen}
        onRequestClose={closeNotificationModal}
        notificationType={notificationType}
        notificationTitle={notificationTitle}
        notificationMessage={notificationMessage}
      />
    </div>
  );
}
