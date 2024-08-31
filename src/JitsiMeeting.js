import React, { useEffect } from 'react';

const JitsiMeeting = ({ roomName, userName }) => {
  useEffect(() => {
    const domain = 'meet.jit.si'
    const options = {
      roomName: roomName,
      width: '100%',
      height: 800,
      parentNode: document.getElementById('jitsi-container'),
      userInfo: {
        displayName: userName,
      },
    };
    const api = new window.JitsiMeetExternalAPI(domain, options);

    return () => api.dispose(); // Cleanup when component unmounts
  }, [roomName, userName]);

  return <div id="jitsi-container" style={{ width: '100%', height: '800px' }} />;
};

export default JitsiMeeting;