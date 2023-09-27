import React, {Component,useState} from 'react'
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
    StyleSheet,
    View,
    Text,
    useColorScheme,
    ToastAndroid,
    Linking,
    Image
} from 'react-native'
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Clipboard from '@react-native-clipboard/clipboard';
import Share from 'react-native-share';
import { useNavigation } from '@react-navigation/native';
// import { openURL } from 'react-native-linking';


const Readed = ({route}) => {    
    const navigation = useNavigation();
    const receiveData = route.params.qrData;
    const urlSearch = route.params.qrData.includes('https://') ? route.params.qrData : 'https://www.google.com/search?q='+route.params.qrData
    // const receiveData = 'gggg';
    // console.log('ini route', route.params.qrData)
    const backgroundStyle = {
      backgroundColor: '#ffe680',
    };
    // const openURLInBrowser = () => {
    //     openURL(receiveData)
    //       .then((res) => {
    //         if (res) {
    //           console.log('Berhasil membuka URL di browser');
    //         } else {
    //           console.warn('Tidak dapat membuka URL');
    //         }
    //       })
    //       .catch((err) => {
    //         console.error('Terjadi kesalahan:', err);
    //       });
    //   };
    const shareToWhatsApp = async () => {
        try {
          const message = receiveData;
          const url = receiveData // URL yang ingin Anda bagikan (opsional)
    
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
    const shareQR = async () => {
          const shareOptions = {
            url: route.params.qrData.includes('https://') ? route.params.qrData : '',
            title: 'Result scan qr',
            message: route.params.qrData,
          };
    
          await Share.open(shareOptions);
    }
    const copyToClipboard = () => {
        Clipboard.setString(receiveData)
        ToastAndroid.show('Disalin ke clipboard', ToastAndroid.SHORT);
    };
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center', // Untuk mengatur tombol-tombol di tengah vertikal
          alignItems: 'center', // Untuk mengatur tombol-tombol di tengah horizontal
        },
      });
    return(
        <SafeAreaView style={backgroundStyle}>
            <View style={{
                height:'100%',
                backgroundColor: '#ffe680',
            }}>
                <View style={{flex: 1,
                    justifyContent: 'center', // Menyusun tombol secara vertikal di tengah
                    alignItems: 'center',
                }}>
                    <Image style={{width:400,height:200}} source={require('../assets/logoapps.jpg')}/>
                    <View style={{
                        borderRadius:10,
                        padding:10,
                        width:300,
                        marginBottom:46,
                        maxHeight:200,
                        backgroundColor: Colors.white,
                    }}>
                        <ScrollView>
                            <Text style={{color: Colors.black}}>
                                {receiveData}
                            </Text>
                        </ScrollView>
                    </View>
                    <Button style={{
                                marginVertical:5,
                                width:200,
                                height:60,
                                paddingTop:10
                            }} 
                            buttonColor='#000'
                            onPress={copyToClipboard}
                            labelStyle={{ fontSize: 18 }} 
                            icon={({ size, color }) => (
                                <Icon name="content-copy" size={size+5} color={color} /> // Menambahkan 10 piksel pada ukuran ikon
                            )} 
                            mode="contained"
                    >
                        Salin
                    </Button>
                    <Button style={{
                                marginVertical:5,
                                width:200,
                                height:60,
                                paddingTop:10
                            }} 
                            buttonColor='#000'
                            onPress={shareQR}
                            labelStyle={{ fontSize: 18 }} 
                            icon={({ size, color }) => (
                                <Icon name="share" size={size+10} color={color} /> // Menambahkan 10 piksel pada ukuran ikon
                            )} 
                            mode="contained"
                    >
                        Share
                    </Button>
                    <Button style={{
                                marginVertical:5,
                                width:200,
                                height:60,
                                paddingTop:10
                            }}
                            buttonColor='#000'
                            onPress={() => {Linking.openURL(urlSearch)}}
                            labelStyle={{ fontSize: 18 }} 
                            icon={({ size, color }) => (
                                <Icon name="search-web" size={size+10} color={color} /> // Menambahkan 10 piksel pada ukuran ikon
                            )} 
                            mode="contained"
                    >
                        Browser
                    </Button>
                    <View style={{width:'100%',position:'absolute',bottom:0,marginBottom:30}}>
                        <View style={{marginHorizontal:20,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                            <Icon onPress={() => navigation.navigate('Scanner')} name="arrow-u-left-top-bold" size={50} color={'#000'} />
                            <Icon onPress={() => navigation.navigate('Home')} name="home" size={50} color={'#000'} />
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
    },
    content: {
      position: 'absolute',
      bottom: 0, // Konten akan ditempatkan di bagian bawah
      backgroundColor: 'lightblue', // Ganti dengan warna atau gaya yang Anda inginkan
      padding: 10,
    },
  });

export default Readed
