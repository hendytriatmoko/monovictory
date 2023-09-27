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
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation,useFocusEffect } from '@react-navigation/native';


function Splashscreen() {
    const navigation = useNavigation();
    const backgroundStyle = {
        backgroundColor: '#ffe680',
    };
    useFocusEffect(
        React.useCallback(() => {

            const timeoutId = setTimeout(() => {
                navigation.navigate('Home')
            }, 2500);

            return () => {

            // alert('Screen was unfocused');
            // Useful for cleanup functions

            };
        }, [])
    );
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
                    alignItems: 'center', }}
                >
                    <Image style={{width:400,height:400}} source={require('../assets/logoapps.jpg')}/>
                    {/* <Button onPress={() => navigation.navigate('Scanner')} style={{
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
                    </Button> */}
                </View>

            </View>
        </SafeAreaView>
    )
}

export default Splashscreen
