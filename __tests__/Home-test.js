import React from 'react';
import { Alert } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import Home from '../src/pages/Home';

jest.spyOn(Alert, 'alert');

describe('Home', () => {
  it('Home 화면이 정상적으로 렌더링 되는가?', () => {
    const screen = render(<Home />);
    const json = screen.toJSON();
    expect(json).toMatchSnapshot();
  });
  it('타이틀이 정상적으로 보여지는가?', () => {
    const screen = render(<Home />);
    const title = screen.getByText('Your Favorite Restaurants!');
    expect(title).toBeDefined();
  });
  it('레스토랑 이름을 입력할 수 있는 텍스트 필드가 존재하는가?', () => {
    const screen = render(<Home />);
    expect(screen.getByTestId('restaurantNameField')).toBeDefined();
  });
  it('레스토랑을 추가할 수 있는 추가 버튼이 존재하는가?', () => {
    const screen = render(<Home />);
    expect(screen.getByTestId('restaurantAddButton')).toBeDefined();
  });
  it('레스토랑 이름을 추가하지 않고 추가 버튼을 누를 경우 예외 문구가 표시 되는가?', () => {
    const screen = render(<Home />);
    const title = '레스토랑 추가 실패';
    const message = '레스토랑 이름을 입력해주세요!';
    const button = screen.getByTestId('restaurantAddButton');
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
    const screen = render(<Home />);
    const input = screen.getByTestId('restaurantNameField');
    const button = screen.getByTestId('restaurantAddButton');
    for (const name of names) {
      fireEvent(input, 'changeText', name);
      fireEvent(button, 'press');
      expect(screen.getByText(name)).toBeDefined();
    }
  });
});