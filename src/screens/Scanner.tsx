import React, {Component} from 'react'
  import {
    Colors,
  } from 'react-native/Libraries/NewAppScreen';
import {SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,View, Text,useColorScheme,} from 'react-native'
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';


function Home() {
    const backgroundStyle = {
      backgroundColor: '#000',
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
                backgroundColor: '#000',
            }}>
                <View style={{flex: 1,
                    justifyContent: 'center', // Menyusun tombol secara vertikal di tengah
                    alignItems: 'center', }}
                >
                    <Button style={{
                                marginVertical:16,
                                width:200,
                                height:60,
                                paddingTop:10
                            }} 
                            labelStyle={{ fontSize: 18 }} 
                            icon={({ size, color }) => (
                                <Icon name="camera" size={size+1} color={color} /> // Menambahkan 10 piksel pada ukuran ikon
                            )} 
                            mode="contained"
                    >
                        QR Scanner
                    </Button>
                </View>

            </View>
        </SafeAreaView>
    )
}

export default Home
