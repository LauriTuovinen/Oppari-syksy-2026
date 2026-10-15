import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Profile from '../src/app/(tabs)/profile';
import { GluestackUIProvider } from '../components/ui/gluestack-ui-provider';
import { useUser } from '../src/context/UserContext';
import users from '../src/data/Users.json';

jest.mock('../src/context/UserContext', () => ({
  useUser: jest.fn(),
}));

const mockSetUser = jest.fn();
const mockUseUser = useUser as jest.Mock;
const mockRemoveFavourite = jest.fn();

const testUser = {
  ...users[0],
};

const renderProfile = () =>
  render(
    <GluestackUIProvider mode="light">
      <Profile />
    </GluestackUIProvider>
  );

  const openGenderSelect = async (
    getByTestId: (testID: string) => any
  ) => {
    await fireEvent.press(getByTestId('settings-tab'));
    await fireEvent.press(
      getByTestId('gender-select-trigger')
    );
  };

beforeEach(() => {
  jest.clearAllMocks();

  mockUseUser.mockReturnValue({
    user: testUser,
    setUser: mockSetUser,
    favourites: [],
    removeFavourite: mockRemoveFavourite,
  });
});

describe('<Profile /> gender Select', () => {
  test('opens the gender selector and displays its options', async () => {
    const { getByTestId, findByTestId } = await renderProfile();
    
    await openGenderSelect(getByTestId);

    expect(await findByTestId('gender-option-nainen')).toBeTruthy();
    expect(await findByTestId('gender-option-mies')).toBeTruthy();
    expect(await findByTestId('gender-option-en-halua-sanoa')).toBeTruthy();
  });

test.each([
  ['Nainen', 'gender-option-nainen'],
  ['Mies', 'gender-option-mies'],
  ['En halua sanoa', 'gender-option-en-halua-sanoa'],
])('updates the user gender to %s', async (gender, optionTestID) => {
    const { getByTestId } = await renderProfile();

    await openGenderSelect(getByTestId);

    await fireEvent.press(getByTestId(optionTestID));

    await waitFor(() => {
      expect(mockSetUser).toHaveBeenCalledWith({
        ...testUser,
        gender,
      });
    });
  });
});