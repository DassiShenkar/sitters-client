//external sources
import React from 'react';
import {geocodeByAddress} from "react-places-autocomplete";
import {AgeFromDate} from 'age-calculator';
import * as _ from "lodash";

//utils
import {post} from '../../../../../utils/serverCalls';
import {sittersApi} from "../../../../../sittersAPI/sittersAPI";

//statics
import strings from '../../../../../static/strings';

//style
import '../style.css';


export default class ParentFormBase extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmitParent = this.handleSubmitParent.bind(this);
    };
    calcAge(birthday) {
        let date = birthday.split("/");
        return (new AgeFromDate(new Date(parseInt(date[2],10),parseInt(date[1],10) -1, parseInt(date[0],10) -1)).age) || 0;//convert "01/01/1985" to years
    }

    handleSelect(selectedKey) {
        this.props.actions.registerActions.changeRegisterView(selectedKey);
    }

    getLanguagesFromFacebook(languages){
        if(languages.length > 0){
            return languages;
        }
        else if(this.props.user.languages){
            let langs =  [];
            this.props.user.languages.forEach(function(language){
                langs.push({value:language.name.toLowerCase(), label:language.name}); // build array of object from array of strings
            });
            return langs;
        }
    }

    next(){
        let registerViewIndex = strings.STEPS.indexOf(this.props.register.view) +1; // go to next step
        this.props.actions.registerActions.changeRegisterView(strings.STEPS[registerViewIndex])
    }

    handleSubmitParent(e) {
        e.preventDefault();
        const self = this;
        let parent = {address:{},languages: []};
        let expertise = [], hobbies = [], specialNeeds = [],personality = [];
        let langs = this.props.register.languages === null ? this.props.user.languages : this.props.register.languages;
        langs.forEach (function(language){
            if(self.props.register.languages === null)
                parent.languages.push(language.name);
            else
                parent.languages.push(language.value);
        });
        if(this.props.register.childExpertise.length > 0){
            this.props.register.childExpertise.forEach(function(o){
                expertise.push(o.value);
            });
        }
        if(this.props.register.childSpecialNeeds.length > 0){
            this.props.register.childSpecialNeeds.forEach(function(o){
                specialNeeds.push(o.value);
            });
        }
        if(this.props.register.childHobbies.length > 0){
            this.props.register.childHobbies.forEach(function(o){
                hobbies.push(o.value);
            });
        }
        this.props.register.items.forEach(function(o){
            personality.push(o.label);
        });

        parent = {
            _id : this.props.user.facebookID,
            name: this.props.register.name !== "" && this.props.register.age !== null ? this.props.register.name : this.props.user.name,
            email: this.props.register.email !== "" && this.props.register.age !== null ? this.props.register.email : this.props.user.email,
            age: this.props.register.age !== ""  && this.props.register.age !== null ? Number(this.props.register.age): this.calcAge(this.props.user.birthday),
            gender: this.props.register.gender !== "" && this.props.register.gender !== null ? this.props.register.gender.toLowerCase(): this.props.user.gender,
            coverPhoto: this.props.user.coverPhoto? this.props.user.coverPhoto.source: "",
            timezone: this.props.user.timezone? this.props.user.timezone: "",
            profilePicture: this.props.user.picture? this.props.user.picture.data.url: "",
            maxPrice: Number(this.props.register.watchMaxPrice),
            children: {
                name: this.props.register.childName,
                age: Number(this.props.register.childAge),
                expertise: expertise,
                hobbies: hobbies,
                specialNeeds: specialNeeds,
            },
            userType: "I'm a Parent",
            personality: personality,
            notifications: [],
            invites: [],
            blacklist: [],
            settings: {
                allowNotification: false,
                allowSuggestions: false
            },
            friends: this.props.user.friends,
            preferedGender: this.props.register.watchChildGender.toLowerCase(),
            isParent: true,
            pushNotifications: {},
            senderGCM: {
                senderId: "",
                valid: false
            }
        };

        if(this.props.register.havePartner === "True"){
            parent.partner = {
                gender: this.props.register.partnerGender,
                email:  this.props.register.partnerEmail,
                name:  this.props.register.partnerName
            };
        }
        geocodeByAddress(this.props.user.address,  (err, latLng) => {
            if (err) { console.log('Oh no!', err) }
            else{
                let add = self.props.user.address.split(',');
                const street = add[0].split(' ');
                let houseNumber = street.pop();
                if(Number.isNaN(houseNumber)){
                    street.push(houseNumber);
                    houseNumber = 0;
                }
                parent.address = {
                    city: self.props.user.address.split(',')[1],
                    street: _.join(street, " "),
                    houseNumber: Number(houseNumber),
                    longitude: latLng.lng,
                    latitude: latLng.lat
                };

                post(sittersApi.CREATE_PARENT, parent, (result) => {
                    if (result.data) {  // user created
                        if(self.props.user.friends.length > 0){
                            post(sittersApi.GET_USER, {_id: self.props.user.facebookID}, (response) =>{
                                if (response.data) {  // get user from db
                                    post(sittersApi.UPDATE_PARENT_MUTUAL_FRIENDS, response.data, (response) =>{
                                        document.cookie = ("auth_token="+self.props.user.facebookID); // set token for future login
                                        document.cookie = ("is_parent=true");
                                        self.props.actions.actionCreators.changeIsParentFlag(true);
                                        self.props.router.push('/'); // go to feed page
                                    });
                                }
                            });
                            // axios({
                            //     method: 'post',
                            //     url: (strings.DEBUG?strings.LOCALHOST : strings.WEBSITE ) + 'user/getUser',
                            //     headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                            //     data: {_id: self.props.user.facebookID}
                            // })
                            //     .then(function (response) {
                            // if (response.data) {  // user exists
                            //     // let parent = response.data;
                            //     // parent.friends = self.props.user.friends.data;
                            //     axios({
                            //         method: 'post',
                            //         url: (strings.DEBUG?strings.LOCALHOST : strings.WEBSITE ) + 'parent/updateMutualFriends',
                            //         headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                            //         data: response.data
                            //     })
                            //         .then(function (response) {
                            //             document.cookie = ("auth_token="+self.props.user.facebookID);
                            //             document.cookie = ("is_parent=true");
                            //             self.props.actions.actionCreators.changeIsParentFlag(true);
                            //             self.props.router.push('/');
                            //         })
                            //         .catch(function (error) {
                            //             console.log(error);
                            //         });
                            // }
                            // })
                            // .catch(function (error) {
                            //     console.log(error);
                            // });
                            // }

                        }
                        //     else { // user not created
                        //         //TODO: think about error when user not created
                        //     }
                        // });


                        // axios({
                        //     method: 'post',
                        //     url: (strings.DEBUG?strings.LOCALHOST : strings.WEBSITE ) + 'parent/create',
                        //     headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                        //     data: parent
                        // }).then(function (res) {
                        // if (res.data) {  // user created
                        //     if(self.props.user.friends.length > 0){
                        //         axios({
                        //             method: 'post',
                        //             url: (strings.DEBUG?strings.LOCALHOST : strings.WEBSITE ) + 'user/getUser',
                        //             headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                        //             data: {_id: self.props.user.facebookID}
                        //         })
                        //             .then(function (response) {
                        //                 if (response.data) {  // user exists
                        //                     // let parent = response.data;
                        //                     // parent.friends = self.props.user.friends.data;
                        //                     axios({
                        //                         method: 'post',
                        //                         url: (strings.DEBUG?strings.LOCALHOST : strings.WEBSITE ) + 'parent/updateMutualFriends',
                        //                         headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                        //                         data: response.data
                        //                     })
                        //                         .then(function (response) {
                        //                             document.cookie = ("auth_token="+self.props.user.facebookID);
                        //                             document.cookie = ("is_parent=true");
                        //                             self.props.actions.actionCreators.changeIsParentFlag(true);
                        //                             self.props.router.push('/');
                        //                         })
                        //                         .catch(function (error) {
                        //                             console.log(error);
                        //                         });
                        //                 }
                        //             })
                        //             .catch(function (error) {
                        //                 console.log(error);
                        //             });
                        //     }
                        //
                        // }
                        // else { // user not created
                        //     //TODO: think about error when user not created
                        // }
                        // })
                        //     .catch(function (error) {
                        //         console.log(error);
                        //         //TODO: think about error when user not created
                        //     });
                    }
                });
            }
        }