import React, {Component} from 'react'
  import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
  } from 'react-native/Libraries/NewAppScreen';
import {SafeAreaView,
    ScrollView,
    StatusBar,Image,
    StyleSheet,View, Text,useColorScheme,} from 'react-native'
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';


function Home() {
    const navigation = useNavigation();
    const backgroundStyle = {
        backgroundColor: '#ffe680',
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
                // opacity:0.5
            }}>
                <View style={{flex: 1,
                    justifyContent: 'center', // Menyusun tombol secara vertikal di tengah
                    alignItems: 'center', }}
                >
                    <Image style={{width:350,height:230}} source={require('../assets/logoapps.jpg')}/>
                    <Button textColor='#fff' buttonColor="#010101" onPress={() => navigation.navigate('Scanner')} style={{
                                marginVertical:16,
                                width:200,
                                height:60,
                                paddingTop:10,
                            }} 
                            labelStyle={{ fontSize: 18 }} 
                            icon={({ size, color }) => (
                                <Icon name="camera" size={size+9} color={color} /> // Menambahkan 10 piksel pada ukuran ikon
                            )} 
                            mode="contained"
                    >
                        QR Scanner
                    </Button>
                    <Button textColor='#fff' buttonColor="#010101" onPress={() => navigation.navigate('Generator')} style={{
                                marginVertical:16,
                                width:200,
                                height:60,
                                paddingTop:10
                            }}
                            icon={({ size, color }) => (
                                <Icon name="qrcode-scan" size={size+8} color={color} /> // Menambahkan 10 piksel pada ukuran ikon
                            )} 
                            labelStyle={{ fontSize: 18 }} 
                            mode="contained"
                    >
                        QR Generator
                    </Button>
                </View>

            </View>
        </SafeAreaView>
    )
}

export default Home
