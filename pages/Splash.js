import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Splash = ({navigation}) => {
    return (
        <>
            <StatusBar barStyle="dark-content"/>
            <SafeAreaView>
                <View style={styles.body}>
                    <Text style={styles.sectionTitle}>Welcome to Sync !</Text>
                </View>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    body: {
        backgroundColor: Colors.white,
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
        alignSelf: 'center',
        marginTop: 100,
    },
});

export default Splash;
