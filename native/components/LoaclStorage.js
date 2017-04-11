"use strict";
var ReactNative = require('react-native');
var { AsyncStorage } = ReactNative;

export default class LocalStorage {
    static FACEBOOK_KEY = '@FacebookAccessToken:key';
    static USER_KEY = '@User:key';

    static async setToLocalStorage(key, data){
        try {
            await AsyncStorage.setItem(key, data);
        } catch (error) {
            alert('failed to save data');
        }
    }

    static async getFromLocalStorage(key){
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null){
                alert(value);
                return value;
            } else {
                alert('no such key');
                return null;
            }
        } catch (error) {
            alert('failed to get data');
            return null;
        }
    }
}
