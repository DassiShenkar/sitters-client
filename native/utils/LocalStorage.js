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

    static async getFromLocalStorage(key) {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null){
                return await value;
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    }
}
