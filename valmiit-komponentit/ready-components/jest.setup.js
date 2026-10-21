jest.mock('react-native-worklets', () =>
  require('react-native-worklets/src/mock')
);

jest.mock('lucide-react-native', () => {
  const MockIcon = () => null;

  return new Proxy(
    {},
    {
      get: (_target, property) => {
        if (property === '__esModule') {
          return true;
        }

        return MockIcon;
      },
    }
  );
});

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  },
}));