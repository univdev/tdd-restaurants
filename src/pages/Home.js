import produce from 'immer';
import React, { useReducer } from 'react';
import { Text, View, TextInput, Button, Alert, SafeAreaView, } from 'react-native';

const reducer = (state, action) => {
  switch(action.type) {
    case 'SET_NAME':
      return produce(state, (draft) => {
        draft.name = action.payload;
        return draft;
      });
    case 'ADD_ITEM':
      return produce(state, (draft) => {
        draft.items.push(action.payload);
        return draft;
      });
    default:
      return state;
  }
};

const Home = () => {
  const [state, dispatch] = useReducer(reducer, {
    name: '',
    items: [],
  });
  const handleAddRestaurant = () => {
    try {
      if (!state.name) throw new Error('레스토랑 이름을 입력해주세요!');
      const { name } = state;
      dispatch({ type: 'ADD_ITEM', payload: name });
      dispatch({ type: 'SET_NAME', payload: '' });
    } catch (e) {
      Alert.alert('레스토랑 추가 실패', e.message);
    }
  };
  const handleChangeName = (e) => {
    dispatch({ type: 'SET_NAME', payload: e });
  };
  return (
    <SafeAreaView>
      <Text>Your Favorite Restaurants!</Text>
      <View>
        {
          state.items.map((item, index) => {
            return (
              <Restaurant
                key={index}
                name={item}
              />
            );
          })
        }
      </View>
      <TextInput
        value={state.name}
        testID="restaurantNameField"
        onChangeText={handleChangeName}
      />
      <Button
        title="추가"
        testID="restaurantAddButton"
        onPress={handleAddRestaurant}
      />
    </SafeAreaView>
  );
};

const Restaurant = (props) => {
  return (
    <View>
      <Text>{props.name}</Text>
    </View>
  );
};

export default Home;
