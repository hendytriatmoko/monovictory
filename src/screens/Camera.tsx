import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Linking,
    View,
    useColorScheme,
    SafeAreaView,
  } from 'react-native';
  import {
    Colors,
  } from 'react-native/Libraries/NewAppScreen';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation,useFocusEffect  } from '@react-navigation/native';

const QRScannerScreen = () => {
  const navigation = useNavigation();
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
      backgroundColor: '#000',
    };
  const [torchOn,setTorchOn] = useState(false)
  const onReadQRCode = (e) => {
    // Handle data dari QR code di sini
    console.log('QR Code Data:', e.data);
    // Misalnya, Anda dapat mengirim data ke layar lain atau menjalankan tindakan tertentu
    // startScan()
    navigation.navigate('Readed', { qrData: e.data });
    // setTimeout(startScan(), 3000)
  };
  const torchControll = () => {
    setTorchOn(!torchOn);
  }
  let scanner;

    const startScan = () => {
      if (scanner) {
        scanner._setScanning(false);
      }
    };
    console.log('test jalan lagi apa ga')
    useFocusEffect(
      React.useCallback(() => {
  
        startScan()
  
        return () => {
  
          // alert('Screen was unfocused');
          // Useful for cleanup functions
  
        };
      }, [])
    );
  return (
    // <QRCodeScanner
    //     onRead={onReadQRCode}
    //     flashMode={RNCamera.Constants.FlashMode.torch}
    //   />
    <SafeAreaView style={backgroundStyle}>
        <View style={{
                height:'100%',
                backgroundColor: '#000',
            }}
        >
            <View style={{flex: 1,
                    justifyContent: 'center', // Menyusun tombol secara vertikal di tengah
                    alignItems: 'center', }}
                >
            <QRCodeScanner
                reactivateTimeout={1000}
                ref={(camera) => scanner = camera}
                onRead={onReadQRCode}
                flashMode={torchOn ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
                topContent={
                <Text style={styles.centerText}>
                    <Text style={{color:'#fff'}}>Scan Qr Code</Text>
                </Text>
                }
            />
            <Button 
                onPress={torchControll}
                style={{
                    marginVertical:16,
                    width:200,
                    height:60,
                    paddingTop:10
                }} 
                buttonColor='#ffe680'
                textColor='#000'
                labelStyle={{ fontSize: 18 }} 
                icon={({ size, color }) => (
                    !torchOn ?
                    <Icon name="flashlight" size={size+8} color={color} /> :
                    <Icon name="flashlight-off" size={size+8} color={color} />
                )} 
                mode="contained"
            >
                Flash
            </Button>
            </View>
        </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    centerText: {
      flex: 1,
      fontSize: 18,
      padding: 32,
      color: '#777'
    },
    textBold: {
      fontWeight: '500',
    },
    buttonText: {
      fontSize: 21,
      color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
      padding: 16
    }
  });

export default QRScannerScreen;
