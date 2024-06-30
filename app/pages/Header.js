import {View, Text, SafeAreaView, useColorScheme} from 'react-native';
import React, {useContext, useState} from 'react';
import {Appbar, Dialog, Portal} from 'react-native-paper';
import {Button, Menu} from 'react-native-paper';
import style from '../css/style';
import {AuthContext} from '../common/AuthContext';
import {useNavigation} from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = () => {
  const isDark = useColorScheme() === 'dark';

  const {store, setStore} = useContext(AuthContext);
  const navigation = useNavigation();

  const [visible, setVisible] = React.useState(false);
  const [info, setInfo] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const handleProfile = () => {
    if (store.user) {
      showDialog();
    } else {
      navigation.navigate('profile');
    }
  };

  const handleLogout = () => {
    setStore({});
    hideDialog();
    navigation.navigate('home');
  };

  return (
    <>
      <Appbar.Header style={isDark ? style.headDark : style.headWhite}>
        <Appbar.Content title={store?.path ? store.path : 'FoodyWoody'} />

        <Ionicons
          style={{color: isDark ? 'white' : 'black'}}
          onPress={() => setInfo(true)}
          name="information-circle"
          size={21}
        />

        <Button onPress={() => handleProfile()}>
          {store.user ? (
            store?.user?.name
          ) : (
            <Ionicons name="person" size={20} />
          )}
        </Button>
      </Appbar.Header>

      <Portal>
        <Dialog
          style={{margin: 5, backgroundColor: isDark ? '#535353' : 'white'}}
          visible={info}
          onDismiss={() => setInfo(false)}>
          <Dialog.Title>Hi There!</Dialog.Title>
          <Dialog.Content>
            <Text> Welcome to my first ReactNative app,</Text>
            <Text></Text>
            <Text> Kindly Sign Up fresh or login as</Text>
            <Text> userName: subham</Text>
            <Text> Password: 12</Text>
            <Text></Text>
            <Text> TechStack:</Text>
            <Text> RN, Expo, RN Paper, MongoDB, NodeJs</Text>
            <Text> (For best experience,avoid dark mode)</Text>
          </Dialog.Content>
        </Dialog>
        <Dialog
          style={{backgroundColor: isDark ? '#535353' : 'white'}}
          visible={visible}
          onDismiss={hideDialog}>
          <Dialog.Title>Logout ?</Dialog.Title>
          <Dialog.Actions>
            <Button onPress={hideDialog}>No</Button>
            <Button onPress={handleLogout}>Yes</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

export default Header;
