import { render } from '@testing-library/react-native';
import Home from '../src/app/(tabs)/home';

describe('<Home />', () => {
  test('renders the Home screen', async () => {
    const { getByText } = await render(<Home />);

    expect(getByText('VisitOulu')).toBeTruthy();
  });
});