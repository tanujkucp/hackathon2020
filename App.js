import React, {useState} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    ImageBackground,
    Button,
    Alert,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

const loginToGoogle = () => {
    Alert.alert('connect');
};

const connectToDrive = () => {
    //login to google to access access token for using google drive
    //Alert.alert('connect');
};

const App: () => React$Node = () => {
    const [isSigninInProgress, setSigninInProgress] = useState(false);

    return (
        <>
            <StatusBar barStyle="dark-content"/>
            <SafeAreaView>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                    <ImageBackground
                        accessibilityRole={'image'}
                        source={require('./assets/logo.png')}
                        style={styles.background}
                        imageStyle={styles.logo}>
                        <Text style={styles.text}>Welcome to Sync!</Text>
                    </ImageBackground>

                    <View style={styles.body}>
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>Step One</Text>
                            <Text style={styles.sectionDescription}>
                                Connect with your{' '}
                                <Text style={styles.highlight}>Google Drive</Text> account to
                                sync local files from this device.
                            </Text>

                        </View>
                        <View style={styles.button}>
                            <GoogleSigninButton
                                style={{width: 312, height: 48}}
                                size={GoogleSigninButton.Size.Wide}
                                color={GoogleSigninButton.Color.Dark}
                                onPress={loginToGoogle}
                                disabled={isSigninInProgress}/>
                        </View>

                    </View>

                </ScrollView>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    body: {
        backgroundColor: Colors.white,
        flex: 1,
        justifyContent: 'center',
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    background: {
        paddingBottom: 40,
        paddingTop: 96,
        paddingHorizontal: 32,
        backgroundColor: Colors.lighter,
    },
    logo: {
        opacity: 0.2,
        overflow: 'visible',
        resizeMode: 'cover',
        /*
         * These negative margins allow the image to be offset similarly across screen sizes and component sizes.
         *
         * The source logo.png image is 512x512px, so as such, these margins attempt to be relative to the
         * source image's size.
         */
        marginLeft: -128,
        marginBottom: -192,
    },
    text: {
        fontSize: 40,
        fontWeight: '600',
        textAlign: 'center',
        color: Colors.black,
    },
    button: {
        marginTop: 40,
        alignSelf: 'center',
    },
});

export default App;
