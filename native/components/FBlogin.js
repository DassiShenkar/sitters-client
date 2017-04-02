// import RadioButton from 'radio-button-react-native';
import React from 'react';
// import Expo from 'expo';
// import { StyleSheet, Text, View, Image } from 'react-native';
import { Text, View } from 'react-native';
// import { Button } from 'react-native-elements';

export default class Login extends React.Component {

    // constructor (props) {
    //     super(props);
    //     this.state = {
    //         value: 0
    //     }
    // }

    // handleOnPress(value){
    //     this.setState({value:value})
    // }

    // login = async () => {
    //     const ADD_ID = "1800090996910027";
    //     const options = {
    //         permissions: ['public_profile', 'email', 'user_birthday', 'user_education_history', 'user_birthday', 'user_location', 'user_education_history', 'user_likes'],
    //     };
    //     const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync(ADD_ID, options);
    //     if (type === 'success') {
    //         const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,cover,birthday,currency,education,gender,languages,location,timezone,picture.width(100).height(100)`);
    //         console.log(await response.json());
    //         const data = await fetch('');
    //         console.log(data.json());
    //         this.responseFacebook(response.json());
    //     }
    // };

    render() {
        return (
            <View>
                <Text>
                    Hello World
                </Text>
            </View>
            // <View style={styles.container}>
            //     <Image
            //         style={{width: 50, height: 50}}
            //         source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} />
            //     <RadioButton currentValue={this.state.value} value={0} onPress={this.handleOnPress.bind(this)}>
            //         <Text>I'm a parent</Text>
            //     </RadioButton>
            //     <RadioButton currentValue={this.state.value} value={1} onPress={this.handleOnPress.bind(this)}>
            //         <Text>I'm a sitter</Text>
            //     </RadioButton>
            //     <Button
            //         raised
            //         onPress={this.login}
            //         icon={{name: 'cached'}}
            //         title='RAISED WITH ICON' />
            // </View>
        );
    }

}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
// });
