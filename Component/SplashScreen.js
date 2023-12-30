import React, { useEffect } from 'react';
import { View, Image, StyleSheet, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { StatusBar } from 'react-native';


const duration = 2000;
const easing = Easing.bezier(0.25, -0.5, 0.25, 1);
const SplashScreen = () => {
  const navigation = useNavigation()
  
  const imageUrl1 = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdsLR9e8WGlfBJah5FRETwlD98eUPNNYzDjJMX-Br_fcI7pLw3hFpitPJNiqOyJDN95-I&usqp=CAU';

  useEffect(() => {
     setTimeout(() => {
      navigation.navigate('HomeScreen')
     },1000);
  }, []);

  const sv = useSharedValue(0);

  React.useEffect(() => {
    // highlight-next-line
    sv.value = withRepeat(withTiming(1, { duration, easing }), -1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${sv.value * 360}deg` }],
  }));
  return (
    <><View style={styles.container}>
           <StatusBar translucent backgroundColor="#rgb(75 35 14)"  barStyle="dark-content" />

      <View style={{
        backgroundColor: '#rgb(75 35 14)', flex: 1,
      
      }}>
      
                     <Animated.View style={[styles.box, animatedStyle]} >
        <Image
          source={{ uri: imageUrl1 }}
          style={{width:250,height:250,borderRadius:200}} />
      </Animated.View>
       
      </View>
    </View>

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },box:{
       alignItems:'center',
       justifyContent:'center',
       top:'30%'
       
  }
 
 
});

export default SplashScreen;