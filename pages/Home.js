import React, {useState, useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View, Alert, PermissionsAndroid} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {GoogleSignin} from 'react-native-google-signin';
import {Avatar, Button, Card, Title, Paragraph, FAB} from 'react-native-paper';

/**
 * require write storage permission
 */
const requestWriteStoragePermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                'title': 'Allow access to Files',
                'message': 'Write access needed for saving your data in storage.',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can write storage');
        } else {
            console.log('Write Storage permission denied');
        }
    } catch (err) {
        console.warn(err);
    }
};
/**
 * * require read storage permission
 */
const requestReadStoragePermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
                'title': 'Allow access to Files',
                'message': 'Read access needed for getting your data from storage.',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can Read storage');
        } else {
            console.log('Read Storage permission denied');
        }
    } catch (err) {
        console.warn(err);
    }
};
//using scoped storage access on android 11
const requestManageStoragePermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            'android.permission.MANAGE_EXTERNAL_STORAGE',
            {
                'title': 'Allow access to All Files',
                'message': 'All files access needed to manage your storage.',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can manage storage on A11');
        } else {
            console.log('Manage Storage permission denied');
        }
    } catch (err) {
        console.warn(err);
    }
};

const Home = ({navigation}) => {
    const [user, setUser] = useState(null);
    const [folders, setFolders] = useState(null);
    const getCurrentUser = async () => {
        return await GoogleSignin.getCurrentUser();
    };

    useEffect(() => {
        getCurrentUser().then(userInfo => {
            setUser(userInfo);
            console.log('Home: ', userInfo);
        });
        // check storage permission
        const checkPermission = () => {
            PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE).then((writeGranted) => {
                console.log('writeGranted', writeGranted);
                if (!writeGranted) {
                    requestWriteStoragePermission().then();
                }
                PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((readGranted) => {
                    console.log('readGranted', readGranted);
                    if (!readGranted) {
                        requestReadStoragePermission().then();
                    }
                });
            });
            PermissionsAndroid.check('android.permission.MANAGE_EXTERNAL_STORAGE').then((readGranted) => {
                console.log('manageGranted', readGranted);
                if (!readGranted) {
                    requestManageStoragePermission().then();
                }
            });
        };
        checkPermission();
    }, []);
    return (
        <>
            <StatusBar barStyle="dark-content"/>
            <View style={styles.body}>
                {user === null || user === undefined ? null : (
                    <Card elevation={10} style={{marginHorizontal: 10, marginVertical: 10}}>
                        <Card.Title title={user.user.name} subtitle={user.user.email}
                                    left={() => <Avatar.Image size={50} source={{uri: user.user.photo}}/>}/>
                        <Card.Content>
                            <Text style={{color: '#00ff00', fontSize: 20}}>Sync Status: Active</Text>
                        </Card.Content>
                    </Card>
                )}
                {folders === null ? (
                    <SafeAreaView>
                        <View style={styles.body}>
                            <View style={styles.sectionContainer}>
                                <Text style={styles.sectionTitle}>Step Two</Text>
                                <Text style={styles.sectionDescription}>
                                    Choose {' '}
                                    <Text style={styles.highlight}>Folders</Text> from your storage to sync files.{'\n\n'}
                                    Click on the Floating button on bottom to start.
                                </Text>

                            </View>
                        </View>
                    </SafeAreaView>
                ) : (
                    <View>

                    </View>
                )
                }
                <FAB
                    style={styles.fab}
                    icon="plus"
                    label={'Select'}
                    onPress={() => Alert.alert('hey')}
                />
            </View>

        </>
    );
};

const styles = StyleSheet.create({
    body: {
        backgroundColor: Colors.white,
        flex: 1,
        alignContent: 'center',
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
        alignSelf: 'center',
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
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
    fab: {
        position: 'absolute',
        margin: 24,
        right: 0,
        bottom: 0,
    },
});

export default Home;
