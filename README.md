#Flipr Hackathon 2020
**This project is an android app made using React Native.**

##Features
App APK and Screenshots can be found here on [GitHub](https://github.com/tanujkucp/hackathon2020/tree/master/Screenshots).
1. Google SignIn
2. Authentication to Google Drive data
3. Choose folders from storage using document picker
4. Material Design
##Prerequisites
1. Java JDK 14.0
2. React Native
3. Android Studio
4. Code editor
5. ADB, Gradle 6.5

##Installing development environment
Configure your development using this [environment setup guide.](https://reactnative.dev/docs/environment-setup)
Go to 'React Native CLI Quickstart' section.
###Dependencies
1. Node
2. Java Development Kit 14
3. Android Studio
4. Android SDK
5. Watchman
6. React Native CLI
7. Android Debug Bridge (ADB)

###Starting debug and using app
```shell script
1. npx react-native start
2. npx react-native run-android
```

##Building App for sharing- APK 
1. Run 'bundle' script from 'package.json' file using 'npx' or 'yarn' or 'npm'.
2. Open terminal in root project folder and execute 'cd android'
3. Execute './gradlew assembleDebug'
4. APK will be present in 'root folder/android/app/build/outputs/apk/debug'
