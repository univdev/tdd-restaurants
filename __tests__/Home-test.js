import React from 'react';
import { Alert } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { createStore } from '@reduxjs/toolkit';
import Home from '../src/pages/Home';
import Reducers from '../store';

const store = createStore(Reducers);

jest.spyOn(Alert, 'alert');

const setup = () => {
  const screen = render(
    <Provider
      store={store}
    >
      <Home />
    </Provider>
  );
  const input = screen.getByTestId('restaurantNameField');
  const button = screen.getByTestId('restaurantAddButton');
  return {
    screen,
    input,
    button,
  };
};

describe('Home', () => {
  it('Home 화면이 정상적으로 렌더링 되는가?', () => {
    const { screen } = setup();
    const json = screen.toJSON();
    expect(json).toMatchSnapshot();
  });
  it('타이틀이 정상적으로 보여지는가?', () => {
    const { screen } = setup();
    const title = screen.getByText('Your Favorite Restaurants!');
    expect(title).toBeDefined();
  });
  it('레스토랑 이름을 입력할 수 있는 텍스트 필드가 존재하는가?', () => {
    const { screen } = setup();
    expect(screen.getByTestId('restaurantNameField')).toBeDefined();
  });
  it('레스토랑을 추가할 수 있는 추가 버튼이 존재하는가?', () => {
    const { screen } = setup();
    expect(screen.getByTestId('restaurantAddButton')).toBeDefined();
  });
  it('레스토랑 이름을 추가하지 않고 추가 버튼을 누를 경우 예외 문구가 표시 되는가?', () => {
    const { screen, button } = setup();
    const title = '레스토랑 추가 실패';
    const message = '레스토랑 이름을 입력해주세요!';
    fireEvent(button, 'press');
    const json = screen.toJSON();
    expect(Alert.alert).toHaveBeenCalledWith(title, message);
    expect(json).toMatchSnapshot();
  });
  it('레스토랑을 추가할 수 있는가?', () => {
    const names = [
      '1st gourmet',
      'sushi daisuki',
      'udonya',
    ];
    const { screen, input, button } = setup();
    for (const name of names) {
      fireEvent(input, 'changeText', name);
      fireEvent(button, 'press');
      expect(screen.getByText(name)).toBeDefined();
    }
  });
});