import { render } from '@testing-library/react-native';

import  Home  from '@/app/(tabs)/home';

describe('<Home />', () => {
  test('Text renders correctly on HomeScreen', async () => {
    const { getByText } = await render(<Home />);

    getByText('Welcome!');
  });
});