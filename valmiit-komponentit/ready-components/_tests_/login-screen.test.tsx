import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Login from '../src/app/login';
import { GluestackUIProvider } from '../components/ui/gluestack-ui-provider';
import { useUser } from '../src/context/UserContext';
import { router } from 'expo-router';
import users from '../src/data/Users.json';

jest.mock('../src/context/UserContext', () => ({
  useUser: jest.fn(),
}));

const mockSetUser = jest.fn();
const mockUseUser = useUser as jest.Mock;

const renderLogin = () =>
  render(
    <GluestackUIProvider mode="light">
      <Login />
    </GluestackUIProvider>
  );

const pressLoginButton = async (
  getAllByText: (text: string) => any[]
) => {
  await fireEvent.press(getAllByText('Kirjaudu')[0]);
};

beforeEach(() => {
  jest.clearAllMocks();

  mockUseUser.mockReturnValue({
    setUser: mockSetUser,
  });
});

describe('<Login />', () => {
  test('renders the login screen', async () => {
    const { getByText } = await renderLogin();

    expect(getByText('VisitOulu')).toBeTruthy();
  });

  test('accepts email and password text input', async () => {
    const { getByTestId } = await renderLogin();

    await fireEvent.changeText(
      getByTestId('email-input'),
      'katri.koodari@gmail.com'
    );

    await fireEvent.changeText(
      getByTestId('password-input'),
      'Testi123'
    );

    await waitFor(() => {
      expect(getByTestId('email-input').props.value).toBe(
        'katri.koodari@gmail.com'
      );

      expect(getByTestId('password-input').props.value).toBe(
        'Testi123'
      );
    });
  });

  test('handles pressing login with an empty email', async () => {
    const { getAllByText } = await renderLogin();

    await pressLoginButton(getAllByText);

    expect(mockSetUser).not.toHaveBeenCalled();
    expect(router.replace).not.toHaveBeenCalled();
  });

  test('shows an error for an incorrect email', async () => {
    const { getByTestId, getAllByText, findByText } =
      await renderLogin();

    await fireEvent.changeText(
      getByTestId('email-input'),
      'wrong@example.com'
    );

    await fireEvent.changeText(
      getByTestId('password-input'),
      'Testi123'
    );

    await pressLoginButton(getAllByText);

    expect(
      await findByText('Virheellinen sähköposti tai salasana')
    ).toBeTruthy();

    expect(mockSetUser).not.toHaveBeenCalled();
    expect(router.replace).not.toHaveBeenCalled();
  });

  test('shows an error for an incorrect password', async () => {
    const { getByTestId, getAllByText, findByText } =
      await renderLogin();

    await fireEvent.changeText(
      getByTestId('email-input'),
      'katri.koodari@gmail.com'
    );

    await fireEvent.changeText(
      getByTestId('password-input'),
      'WrongPassword'
    );

    await pressLoginButton(getAllByText);

    expect(
      await findByText('Virheellinen sähköposti tai salasana')
    ).toBeTruthy();

    expect(mockSetUser).not.toHaveBeenCalled();
    expect(router.replace).not.toHaveBeenCalled();
  });

  test('logs in successfully with valid credentials', async () => {
    const { getByTestId, getAllByText } = await renderLogin();

    await fireEvent.changeText(
      getByTestId('email-input'),
      'katri.koodari@gmail.com'
    );

    await fireEvent.changeText(
      getByTestId('password-input'),
      'Testi123'
    );

    await pressLoginButton(getAllByText);

    const expectedUser = users.find(
      (user) => user.email === 'katri.koodari@gmail.com'
    );

    expect(expectedUser).toBeDefined();

    await waitFor(() => {
      expect(mockSetUser).toHaveBeenCalledWith(expectedUser);
      expect(router.replace).toHaveBeenCalledWith('/home');
    });
  });

  test('toggles the remember-me checkbox', async () => {
    const { getByTestId, getByText } = await renderLogin();

    expect(getByTestId('login-checkbox').props.isChecked).toBe(false);

    await fireEvent.press(getByText('Muista minut'));

    await waitFor(() => {
      expect(getByTestId('login-checkbox').props.isChecked).toBe(true);
    });
  });
});