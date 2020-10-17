import React, {useState, useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View, Alert, PermissionsAndroid, ScrollView} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {GoogleSignin} from 'react-native-google-signin';
import {Avatar, Button, Card, Title, Paragraph, FAB} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import {saveFolders, getFolders, deleteFolders} from '../utilities/Storage';

const RNFS = require('react-native-fs');
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

const pickDirectory = async (addFolder) => {
    try {
        const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.allFiles],
        });
        RNFetchBlob.fs.stat(res.uri).then(stats => {
            console.log('STATS: ', stats);
            let path = stats.path;
            //extract folder name from path
            path = path.substring(0, path.lastIndexOf('/'));
            let name = path.substring(path.lastIndexOf('/') + 1);
            //console.log('Folder name: ' + name);
            addFolder({path: path, name: name, file_path: stats.path});
        }).catch(err => {
            console.log('Error in RNfetchblob:' + err);
        });
    } catch (err) {
        if (DocumentPicker.isCancel(err)) {
            // User cancelled the picker, exit any dialogs or menus and move on
            Alert.alert('Action cancelled!');
        } else {
            //throw err;
            console.log(err);
        }
    }
};

const Home = ({navigation}) => {
    const [user, setUser] = useState(null);
    const [folders, setFolders] = useState([]);
    const getCurrentUser = async () => {
        return await GoogleSignin.getCurrentUser();
    };
    const searchFolder = (path) => {
        for (let fold of folders) {
            //console.log(path, ' and ', fold.path);
            if (path === fold.path) {
                return true;
            }
        }
        return false;
    };
    const addFolder = ({path, name, file_path}) => {
        //check if same folder already exists or not.
        if (searchFolder(path)) {
            //means this folder already exists - so dont select it again
            Alert.alert('This folder is already selected!');
        } else {
            let newFolder = {
                path: path,
                name: name,
                sync_enabled: false,
                last_sync_time: 0,
                file_path: file_path,
            };
            setFolders(folds => folds.concat(newFolder));
            // also save these folders to storage
            saveFolders(folders.concat(newFolder)).then();
        }
    };

    useEffect(() => {
        getCurrentUser().then(userInfo => {
            setUser(userInfo);
            console.log('Home: ', userInfo);
        });
        getFolders().then(f => {
            if (f !== null && f !== undefined) {
                setFolders(f);
            }
        });
        // check storage permission
        const checkPermission = () => {
            PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((readGranted) => {
                console.log('readGranted', readGranted);
                if (!readGranted) {
                    requestReadStoragePermission().then();
                }
            });
            // PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE).then((writeGranted) => {
            //     console.log('writeGranted', writeGranted);
            //     if (!writeGranted) {
            //         requestWriteStoragePermission().then();
            //     }
            //     PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((readGranted) => {
            //         console.log('readGranted', readGranted);
            //         if (!readGranted) {
            //             requestReadStoragePermission().then();
            //         }
            //     });
            // });
        };
        checkPermission();
    }, []);
    const printDirectory = (path) => {
        console.log('PRINTING: ' + path);
        //const dirs = RNFetchBlob.fs.dirs;
        //console.log(dirs.DocumentDir);
        //console.log(dirs.CacheDir);
        //console.log(dirs.DCIMDir);
        // let p = dirs.SDCardDir;
        //
        // console.log(p);
        // RNFetchBlob.fs.ls(p + '/ADM').then((stats) => {
        //     console.log(stats);
        // }).catch((err) => {
        //     console.log(err);
        // });
        ///storage/emulated/0/Pictures/Instagram/IMG_20201016_113823_041.jpg
        // RNFetchBlob.fs.readFile(path, 'base64')
        //     .then((data) => {
        //         // handle the data ..
        //         console.log('READ FILE: ', data);
        //         Alert.alert('SOMETHING IS READ');
        //     }).catch(err => {
        //     console.log('READFILE: ', err);
        //     Alert.alert(err.toString());
        // });
        //todo read all files inside this 'path' directory
        console.log(RNFS.ExternalStorageDirectoryPath);
        RNFS.readDir(path).then(result => {
            console.log('GOT RESULT', result);
        }).catch((err) => {
            console.log(err);
        });

    };
    return (
        <>
            <StatusBar barStyle="dark-content"/>
            <ScrollView>
                <View style={styles.body}>
                    {user === null || user === undefined ? null : (
                        <Card elevation={20} style={{marginHorizontal: 10, marginVertical: 10}}>
                            <Card.Title title={user.user.name} subtitle={user.user.email}
                                        left={() => <Avatar.Image size={50} source={{uri: user.user.photo}}/>}/>
                            <Card.Content>
                                <Text style={{color: '#00ff00', fontSize: 20}}>Sync Status: Active</Text>
                            </Card.Content>
                        </Card>
                    )}
                    {folders === null || folders.length === 0 ? (
                        <SafeAreaView>
                            <View style={styles.body}>
                                <View style={styles.sectionContainer}>
                                    <Text style={styles.sectionTitle}>Step Two</Text>
                                    <Text style={styles.sectionDescription}>
                                        Choose {' '}
                                        <Text style={styles.highlight}>Folders</Text> from your storage to sync
                                        files.{'\n\n'}
                                        Click on the Floating button on bottom to start.
                                    </Text>

                                </View>
                            </View>
                        </SafeAreaView>
                    ) : (
                        <View style={{marginTop: 10, marginBottom: 70}}>
                            <Text style={{textAlign: 'center', fontSize: 24, marginBottom: 10}}>FOLDERS</Text>
                            {folders.map(folder => (
                                <Card key={folder.path} elevation={10} onPress={() => printDirectory(folder.path)}
                                      style={{marginHorizontal: 10, marginVertical: 5}}>
                                    <Card.Title title={folder.name} subtitle={folder.path}
                                                left={() => <Avatar.Icon size={36} icon="folder"/>}/>
                                    <Card.Content>
                                        <Text style={{fontSize: 20}}>Sync
                                            Status: {folder.sync_enabled ? 'Active' : 'Paused'}</Text>
                                    </Card.Content>
                                </Card>
                            ))}

                        </View>
                    )
                    }
                </View>
            </ScrollView>
            <FAB
                style={styles.fab}
                icon="plus"
                label={'Select'}
                onPress={() => pickDirectory(addFolder)}
            />
        </>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignContent: 'center',
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,

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
