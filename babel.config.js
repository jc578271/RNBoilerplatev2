module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
      [
          require.resolve('babel-plugin-module-resolver'),
        {
          root: ['./src/'],
          alias: {
            '@': './src/',
            _: 'lodash'
          }
        }
      ],
    'react-native-reanimated/plugin'
  ],
};
