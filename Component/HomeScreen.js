import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Text, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import MasonryList from '@react-native-seoul/masonry-list';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  FadeInUp, FadeInRight, FadeInLeft, FadeInDown
} from 'react-native-reanimated';
import { StatusBar } from 'react-native';

const HomeScreen = () => {
  const [meals, setMeals] = useState([])
  const navigation = useNavigation()
  category = searchQuery
  const getRecipes = async () => {
    try {
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${searchQuery}`);
      console.log('got recipes: ', response.data);
      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (err) {
      console.log('error: ', err.message);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      getRecipes()
    }, 500);
  }, [])

  const images = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7HjQfYqYBsspqy-iV0-Cw5uHo-cH-3TbhbAugLXu7RnL9lmqiPZUkqBy-XpKfandg7FQ&usqp=CAU';

  const [searchQuery, setSearchQuery] = useState('beef');

  const renderMealItem = ({ item }) => (

    <View style={{ top: 10, }}>
      <TouchableOpacity style={styles.mealItemContainer} onPress={() => handleMealPress(item)}>
        <Animated.Image entering={FadeInDown.duration(500)} source={{ uri: item.strMealThumb }} style={{ width: '90%', height: 200, alignSelf: 'center', borderRadius: 20 }} />
        <Text style={{ textAlign: 'center', fontWeight: '600', marginBottom: 10 }}>{item.strMeal}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderMealItem1 = ({ item }) => (
    <View style={{ padding: 20, bottom: 20 }}>
      <TouchableOpacity style={styles.mealItemContainer} onPress={() => handleMealPress(item)}>
        <View style={{ backgroundColor: "#fff", paddingHorizontal: 5, paddingVertical: 5, borderRadius: 50, shadowColor: 'black', shadowOpacity: 0.9, shadowOffset: 20, shadowRadius: 50, elevation: 5 }}>
          <Image source={{ uri: item.strMealThumb }} style={{ width: 60, height: 60, borderRadius: 50 }} />
        </View>
        <Text style={{ position: 'absolute', fontSize: 10, top: 75, left: 10 }}>{item.strMeal}</Text>
      </TouchableOpacity>
    </View>
  );

  const handleMealPress = (item) => {
    navigation.navigate('Details', { data: item })
    //console.warn('Selected Meal:', item);
  }



  return (
    <ScrollView style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="orange"  barStyle="dark-content" />

      <View style={{ backgroundColor: 'orange', borderBottomStartRadius: 30, borderBottomEndRadius: 30, paddingTop: 50 }}>
        <Animated.Image entering={FadeInRight.duration(500).damping()} source={{ uri: images }} style={{ width: 35, height: 35, position: 'absolute', left: responsiveWidth(83), top: 40, borderRadius: 50 }} />
        {/*  <Animated.View entering={FadeInRight.duration(500).damping()} style={{
          backgroundColor: '#fff', position: 'absolute', top: 42, left: 310, shadowColor: 'gray', shadowOffset: 10,
          shadowOpacity: 0.9, shadowRadius: 50, elevation: 5,
          paddingHorizontal: 5, paddingVertical: 5, borderRadius: 50
        }}>
          <TouchableOpacity onPress={() => navigation.navigate('StoreData')}>
            <BookmarkIcon size={23} strokeWidth={4.5} color={'orange'} />
          </TouchableOpacity>
      </Animated.View>*/}

        <Animated.Text entering={FadeInLeft.duration(500).damping()} style={{ fontSize: 23, position: 'absolute', marginTop: 40, color: 'white', fontWeight: 'bold', left: 20 }}>
          Recipe List...
        </Animated.Text>

        <View style={styles.inputView}>

          <TextInput style={styles.inputText} placeholder="Search..." placeholderTextColor="black" edile={true} onChangeText={(txt) => setSearchQuery(txt)} value={searchQuery} />
        </View>
      </View>
      <TouchableOpacity onPress={() => getRecipes()}  >
        <FontAwesome5 size={20} name='search' style={{ left: 300, bottom: 15, }} color={'#704a93'} />
      </TouchableOpacity>

      <Animated.View entering={FadeInUp.duration(500).damping()} style={{ marginBottom: 70, right: 20, }}>
        <Text style={{ top: 20, left: 50, fontSize: 23, fontWeight: '500' }}>Make your own food,</Text>
        <Text style={{ top: 20, left: 50, fontSize: 18, fontSize: 23, fontWeight: '500' }}>stay at</Text>
        <Text style={{ left: 130, fontSize: 18, bottom: 8, fontSize: 23, color: 'orange', fontWeight: '500' }}>Home...</Text>
      </Animated.View>

      <Animated.View entering={FadeInRight.duration(500).damping()} style={{}}>
        <FlatList
          data={meals}
          keyExtractor={(item) => item.idMeal}
          renderItem={renderMealItem1}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ bottom: 50 }}
        />
      </Animated.View>

      <View style={{ flex: 1, alignItems: 'center' }}>
        {meals === null ? (
          <View style={{ flex: 1 }}>

            <Text style={{ color: 'red', textAlign: 'center', }}>Item is not Found!</Text>
          </View>
        ) : (
          <>
            <Animated.View entering={FadeInLeft.duration(500).damping()} style={{ position: 'absolute', left: 30 }}>
              <Text style={{ fontSize: 23, bottom: 20, fontWeight: '500' }}>Recipes</Text>
            </Animated.View>
            <MasonryList
              data={meals}
              keyExtractor={(item) => item.idMeal}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              renderItem={renderMealItem}
              onEndReachedThreshold={0.1}
              style={{ padding: 10 }} />


          </>
        )}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  inputView: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 50,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    top: responsiveHeight(6),
    alignSelf: 'center',
    shadowColor: '#984065',
    shadowOffset: {
      width: 0,
      height: 50,
    },
    shadowOpacity: 0.8,
    shadowRadius: 16.00,
    elevation: 5,
  },
  inputText: {
    height: 50,
    color: "black"
  },
});