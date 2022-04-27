1. Clone project
```bash
git clone https://github.com/jc578271/RNBoilerplatev2.git YourApp
````
2. Remove .git
```bash
cd YourApp && rm -rf .git
````
3. Install react-native-rename
```bash
yarn global add react-native-rename
```
4. Yarn
```bash
yarn install && npx react-native-rename "YourApp"
```
5. IOS:
- In ios/YourApp/AppDelegate.mm, replace "RNBoilerplatev2" to "YourApp"

6. Android: 
- Rename "android/app/src/main/java/com/rnboilerplatev2" to "android/app/src/main/java/com/yourapp"
- Replace all "com.rnboilerplatev2" to "com.yourapp"

7. Pod install
```bash
cd ios && pod install && cd ..
```
9. Start app
```bash
watchman watch-del-all
npm start --reset-cache
```