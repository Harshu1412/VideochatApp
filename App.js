import { StatusBar, Modal, View, Text, TouchableOpacity, BackHandler, Platform, Linking } from 'react-native';
import AgoraUIKit from 'agora-rn-uikit';
import React, { useEffect, useState } from 'react';

export default function App() {
  const [videoCall, setVideoCall] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleEndCall = () => {
    setVideoCall(false);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setVideoCall(true)
    if (Platform.OS === 'android') {
      BackHandler.exitApp();

    }
  };
  useEffect(() => {
    const handleBackButton = () => {
      setShowModal(true);
      return true; 
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => backHandler.remove();
  }, []);

 

  const props = {
    connectionData: {
      appId: '1293fb7e0c454096aaec6230a08bddd5',
      channel: 'test', 
    },
    rtcCallbacks: {
      EndCall: handleEndCall,
    },
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden />
      {videoCall && <AgoraUIKit connectionData={props.connectionData} rtcCallbacks={props.rtcCallbacks} />}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Call Ended</Text>
            <Text>This app was created by Harshvardhan Khera.</Text>
            <TouchableOpacity onPress={handleCloseModal} style={{ marginTop: 20, backgroundColor: 'blue', padding: 10, borderRadius: 5 }}>
              <Text style={{ color: 'white', textAlign: 'center' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
