import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View, Button, Alert} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Home = ({navigation}) => {
    return (
        <>
            <StatusBar barStyle="dark-content"/>
            <SafeAreaView>
                <View style={styles.body}>
                    <Text style={styles.sectionTitle}>HOME</Text>

                </View>
                <Button
                    title="Go to login"
                    onPress={() => navigation.push('Login')}
                />
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

export default Home;
