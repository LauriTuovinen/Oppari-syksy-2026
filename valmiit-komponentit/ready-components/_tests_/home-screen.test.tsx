import { render } from '@testing-library/react-native';
import { UserProvider } from '../src/context/UserContext'
import Home from '../src/app/(tabs)/home';

describe('<Home />', () => {
  test('renders the Home screen', async () => {
    const { getByText } = await render(
    <UserProvider>
      <Home />
    </UserProvider>
  );

    expect(getByText('VisitOulu')).toBeTruthy();
  });
});