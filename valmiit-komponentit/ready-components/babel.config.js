module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],

    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@/app': './src/app',
            '@/context': './src/context',
            '@/data': './src/data',
            '@/assets': './assets',
            '@/components': './components',
            '@': './',
          },
        },
      ],
      'react-native-worklets/plugin',
    ],
  };
};