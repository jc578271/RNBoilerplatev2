1. Clone project
```bash
git clone https://github.com/jc578271/RNBoilerplatev2.git YourApp
````
2. Remove .git
```bash
cd YourApp && rm -rf .git
````
3. IOS:
- In [AppDelegate.mm](ios/RNBoilerplatev2/AppDelegate.mm), replace ```RNBoilerplatev2``` to ```YourApp```

4. Android: 
- Rename [main/rnboilerplatev2](android/app/src/main/java/com/rnboilerplatev2) to ```yourapp```
- Rename [debug/rnboilerplatev2](android/app/src/debug/java/com/rnboilerplatev2) to ```yourapp```
- Replace all ```com.rnboilerplatev2``` to ```com.yourapp```
5. Install react-native-rename
```bash
yarn global add react-native-rename
```
6. Yarn
```bash
yarn install && npx react-native-rename "YourApp"
```
7. Pod install
```bash
cd ios && pod install && cd ..
```
8. Start app
```bash
watchman watch-del-all
npm start --reset-cache
```