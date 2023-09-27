import React from 'react';
import { View, Text, Button } from 'react-native';
import Share from 'react-native-share';

const ShareToWhatsApp = () => {
    const share = () => {
        const options = {
            message : 'Ini adalah pesan yang akan dibagikan ke WhatsApp.'
        }
        Share.open(options)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
  const shareToWhatsApp = async () => {
    try {
      const message = 'Ini adalah pesan yang akan dibagikan ke WhatsApp.';
      const url = 'https://www.example.com'; // URL yang ingin Anda bagikan (opsional)

      const options = {
        title: 'Bagikan ke WhatsApp',
        message: `${message} ${url}`,
        url: url, // URL yang ingin Anda bagikan (opsional)
        social: Share.Social.WHATSAPP,
      };

      await Share.shareSingle(options);
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };

  return (
    <View>
      <Text>Bagikan pesan ke WhatsApp:</Text>
      <Button title="Bagikan" onPress={shareToWhatsApp} />
    </View>
  );
};

export default ShareToWhatsApp;
