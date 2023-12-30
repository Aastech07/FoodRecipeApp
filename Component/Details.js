import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, ToastAndroid } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { BookmarkIcon } from "react-native-heroicons/mini";
import axios from 'axios';
import Animated, {
  FadeInRight, FadeInLeft, FadeInDown
} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'react-native';

const Details = () => {
  const navigation = useNavigation();
  const Data = useRoute();
  const Value = Data.params.data;
  const Id = Value.idMeal;

  const showToast = () => {
    ToastAndroid.show('Saved ', ToastAndroid.SHORT);
  };

  const storeData = async () => {
    try {
      const jsonValue = JSON.stringify(Value);
      await AsyncStorage.setItem('key', jsonValue);
      // console.warn('store Data',jsonValue)
    } catch (e) {
      console.log(e)
    }
  };

  const [foodrecipe, setFoodrecipe] = useState([]);
  const [isFavourite, setIsFavourite] = useState(false);

  const getRecipes = async () => {
    try {
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${Id}`);
      if (response && response.data && response.data.meals) {
        setFoodrecipe(response.data.meals);
      }
    } catch (err) {
      console.log('error: ', err.message);
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  const handleNavigateBack = () => {
    navigation.goBack('Details');
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
        <Animated.Image entering={FadeInDown.duration(500).damping()} source={{ uri: Value.strMealThumb }} style={{ width: "98%", height: 400, borderRadius: 30 }} />
        <Animated.View entering={FadeInLeft.duration(500).damping()} style={{
          backgroundColor: '#fff', right: 140, bottom: 360, padding: 5, borderRadius: 50,
          shadowColor: 'black', shadowOpacity: 0.9, shadowRadius: 50, elevation: 6
        }}>
          <TouchableOpacity onPress={() => handleNavigateBack()}>
            <ChevronLeftIcon size={27} strokeWidth={4.5} color={'#fbbf24'} />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View entering={FadeInRight.duration(500).damping()} style={{
          backgroundColor: '#fff', bottom: 390, padding: 5, borderRadius: 50,
          shadowColor: 'black', shadowOpacity: 0.9, left: 130, shadowRadius: 50, elevation: 6
        }}>
          <TouchableOpacity onPress={() => setIsFavourite(!isFavourite) + storeData() + showToast()}>
            <BookmarkIcon size={27} strokeWidth={4.5} color={isFavourite ? 'red' : '#fbbf24'} />
          </TouchableOpacity>
        </Animated.View>
      </View>

      <Animated.View entering={FadeInLeft.duration(500).damping()} style={{ left: 15, bottom: 55 }}>
        <Text style={{ fontWeight: '600', fontSize: 20 }}>{Value.strMeal}.</Text>
      </Animated.View>

      {foodrecipe.map((item, id) => (
        <View key={id} style={{ padding: 10 }}>
          <Animated.Text entering={FadeInDown.duration(500).damping()} style={{ textAlign: 'center', fontWeight: '300', marginBottom: 10, fontSize: 17, bottom: 50 }}>{item.strArea}.</Animated.Text>

          <Animated.View entering={FadeInLeft.duration(500).damping()} style={{ bottom: 40 }}>
            <Text style={{ left: 20, fontSize: 20, fontWeight: '500', top: 10 }}>Instructions:</Text>
            <Text style={{ fontSize: 16, marginLeft: 10, marginRight: 10, padding: 10 }}>{item.strInstructions}</Text>
          </Animated.View>

          <Animated.View entering={FadeInLeft.duration(500).damping()} style={{ bottom: 30 }}>
            <Text style={{ fontSize: 17, marginLeft: 20, marginBottom: 5, fontWeight: 'bold' }}>Ingredients:</Text>
            <View style={{ left: 12 }}>
              {Array.from({ length: 20 }, (_, index) => index + 1).map((index) => {
                const ingredient = item[`strIngredient${index}`];
                const measure = item[`strMeasure${index}`];
                if (ingredient && measure) {
                  return <Text key={index} style={{ fontSize: 17, marginLeft: 10 }}>{`${index}- ${ingredient} - ${measure}`}</Text>;
                }
                return null;
              })}
            </View>
          </Animated.View>

        </View>
      ))}
    </ScrollView>
  );
};

export default Details;
