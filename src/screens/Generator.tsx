import React, {Component, useState, useRef} from 'react'
  import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
  } from 'react-native/Libraries/NewAppScreen';
import {SafeAreaView,
    ScrollView,
    StatusBar,
    PermissionsAndroid,
    Image,
    ToastAndroid,
    Platform,
    StyleSheet,View, Text,useColorScheme,} from 'react-native'
import { Button,TextInput } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';
import RNFS from 'react-native-fs'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Share from 'react-native-share'
import RNFetchBlob from 'rn-fetch-blob'
import QRCodeStyled from 'react-native-qrcode-styled';
import { useNavigation } from '@react-navigation/native';


function Generator() {
  const navigation = useNavigation();
    const [Qrcode, setQrcode] = useState('')
    const [QRImage, setQRImage] = useState('');
    const viewShotRef = useRef(null)
    const [resultqr, setResultqr] = useState(false)

    const backgroundStyle = {
      backgroundColor: '#ffe680',
    };

    const shareQR = async () => {
      try {
        const uri = await viewShotRef.current.capture();
        
        const shareOptions = {
          url: uri,
          title: 'Share Image',
          message: 'Check out this qr code',
        };
  
        await Share.open(shareOptions);
      } catch (error) {
        // console.error('Error sharing image:', error);
      }
  }

    const generateQr = () => {
      if (Qrcode) {
        setResultqr(!resultqr)        
      }else{
        ToastAndroid.show('Mohon isikan teks', ToastAndroid.SHORT);
      }
    }
    
    const downloadQrs = async () => {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
          )
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            // alert('Permission denied')
            ToastAndroid.show('Permission denied', ToastAndroid.SHORT);
          }else{

            await viewShotRef.current.capture().then(async (uri) => {
              // Create a new Date object to represent the current date and time
                const currentDate = new Date();
    
                // Get various components of the current date and time
                const year = currentDate.getFullYear(); // Get the year (e.g., 2023)
                const month = currentDate.getMonth() + 1; // Get the month (0-based index, so add 1)
                const day = currentDate.getDate(); // Get the day of the month (1-31)
                const hours = currentDate.getHours(); // Get the hours (0-23)
                const minutes = currentDate.getMinutes(); // Get the minutes (0-59)
                const seconds = currentDate.getSeconds(); // Get the seconds (0-59)
    
                // Create a formatted string representation of the current date and time
                const formattedDate = `${year}-${month}-${day}`;
                const formattedTime = `${hours}-${minutes}-${seconds}`;
                const formattedDateTime = `${formattedDate}-${formattedTime}`;
    
                // Log the results
                console.log('Current Date:', formattedDate);
                console.log('Current Time:', formattedTime);
                console.log('Current Date and Time:', formattedDateTime);
    
              const path = RNFS.PicturesDirectoryPath + '/' + formattedDateTime + '.png'
              await RNFS.moveFile(uri,path)
              await RNFS.scanFile(path)
              // alert('Berhasil diunduh')
              ToastAndroid.show('Berhasil diunduh', ToastAndroid.SHORT);
            })
          }
        }
        
      } catch (error) {
        console.log(error)
      }
    }

    return(
        <SafeAreaView style={backgroundStyle}>
            <View style={{
                height:'100%',
                backgroundColor: '#ffe680',
            }}>
                  {
                    resultqr ? (
                      <View style={{flex: 1,
                        justifyContent: 'center', // Menyusun tombol secara vertikal di tengah
                        alignItems: 'center', }}>
                        <ViewShot
                          ref={viewShotRef}
                          style={{padding:20,borderWidth:2,backgroundColor:'white'}}
                          options={{format:'png', quality:1.0}}
                        >
      
                          <QRCode
                            value={Qrcode ? Qrcode : 'default'}
                            size={200}
                            color='black'
                            padding={50}
                            margin={50}
                            borderWidth={2}
                            borderColor='red'
                            backgroundColor='white'
                            getRef={(ref) => setQRImage(ref)}
                            
                          >
                          </QRCode>
                          {/* <QRCodeStyled
                            data={'Simple QR Code'}
                            style={{backgroundColor: 'white'}}
                            padding={20}
                            pieceSize={8}
                          /> */}
                        </ViewShot>
                        <Button onPress={shareQR} style={{
                                    marginVertical:5,
                                    width:200,
                                    height:60,
                                    paddingTop:10,
                                    marginTop:60,
                                }}
                                icon={({ size, color }) => (
                                  <Icon name="share" size={size+10} color={color} /> // Menambahkan 10 piksel pada ukuran ikon
                              )} 
                                buttonColor='#000'
                                labelStyle={{ fontSize: 18 }} 
                                mode="contained"
                        >
                            Share
                        </Button>
                        <Button onPress={downloadQrs} style={{
                                    marginVertical:5,
                                    width:200,
                                    height:60,
                                    paddingTop:10
                                }}
                                icon={({ size, color }) => (
                                  <Icon name="download" size={size+10} color={color} /> // Menambahkan 10 piksel pada ukuran ikon
                              )} 
                                buttonColor='#000'
                                labelStyle={{ fontSize: 18 }} 
                                mode="contained"
                        >
                            Download
                        </Button>
                        <View style={{width:'100%',position:'absolute',bottom:0,marginBottom:30}}>
                            <View style={{marginHorizontal:20,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                                <Icon onPress={generateQr} name="arrow-u-left-top-bold" size={50} color={'#000'} />
                                <Icon onPress={() => navigation.navigate('Home')} name="home" size={50} color={'#000'} />
                            </View>
                        </View>
                      </View>

                    ) : (
                      <View style={{flex: 1,
                        justifyContent: 'center', // Menyusun tombol secara vertikal di tengah
                        alignItems: 'center', }}>
                        <Image style={{width:400,height:200}} source={require('../assets/logoapps.jpg')}/>
                        <TextInput
                          placeholder='Text QR'
                          onChangeText={text => setQrcode(text)}
                          mode="outlined"
                          value={Qrcode}
                          style={{paddingHorizontal:2,paddingTop:20,maxHeight:200,height:100,width:300}}
                          multiline
                          numberOfLines={5} // Set the number of lines you want to display
                        />
                        <Button onPress={generateQr} style={{
                                    marginVertical:16,
                                    width:200,
                                    height:60,
                                    paddingTop:10
                                }}
                                icon={({ size, color }) => (
                                  <Icon name="qrcode-plus" size={size+10} color={color} /> // Menambahkan 10 piksel pada ukuran ikon
                              )} 
                                buttonColor='#000'
                                labelStyle={{ fontSize: 18 }} 
                                mode="contained"
                        >
                            Generate Text
                        </Button>
                      </View>
                    )
                  }

            </View>
        </SafeAreaView>
    )
}

export default Generator
