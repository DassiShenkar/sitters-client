import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Calendar } from 'react-native-calendars';
import dateFormat from 'dateformat';


class SitterCalendar extends React.Component {
    
    constructor(props) {
        super(props);
        this.showInfo = this.showInfo.bind(this);
    }

    render() {
        let invites = this.props.user.invites.length > 0 ? this.props.user.invites : [];
        let markedDates = {};
        invites.map(function(invite) {
           markedDates[dateFormat(invite.date, "yyyy-mm-dd")] = [{marked: true}]
        });
        return (
            <ScrollView>
                <Calendar
                    onDayPress={(day) => {this.showInfo(day)}}
                    onMonthChange={(month) => {console.log('month changed', month)}}
                    markedDates={markedDates}
                    style={{
                       borderTopWidth: 1,
                        paddingTop: 5,
                        borderBottomWidth: 1,
                        borderColor: '#eee',
                        height: 350
                    }}
                    theme={{
                        calendarBackground: '#ffffff',
                        textSectionTitleColor: '#f7a1a1',
                        selectedDayBackgroundColor: '#f7a1a1',
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: '#f7a1a1',
                        dayTextColor: '#2d4150',
                        textDisabledColor: '#d9e1e8',
                        dotColor: '#f7a1a1',
                        selectedDotColor: '#ffffff',
                        arrowColor: '#f7a1a1',
                        monthTextColor: '#f7a1a1'
                    }}
                />
                {
                    this.props.calendar.showInfo ?
                        <View style={styles.container}>
                            <Text style={styles.text}>Watch {this.props.calendar.data.childName}</Text>
                            <Text style={styles.text}>At: {this.props.calendar.data.address.city}, {this.props.calendar.data.address.street} {this.props.calendar.data.address.houseNumber}</Text>
                            <Text style={styles.text}>From: {this.props.calendar.data.from} To: {this.props.calendar.data.to}</Text>
                        </View> : null
                }
            </ScrollView>
        );
    }

    showInfo(day) {
        const self = this;
        let invites = this.props.user.invites.length > 0 ? this.props.user.invites : [];
        let found = false;
        invites.map(function (invite) {
            if(dateFormat(invite.date, "yyyy-mm-dd") === day.dateString) {
                let data = {
                    childName: invite.childName,
                    address: invite.address,
                    from: invite.startTime,
                    to: invite.endTime
                };
                found = true;
                self.props.calendarActions.addData(data);
                self.props.calendarActions.showInfo(true);
            }
        });
        if(!found) {
            this.props.calendarActions.showInfo(false);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    text: {
        color: '#f7a1a1',
        fontSize: 16,
        padding: 5,
        fontWeight: 'bold'
    },
});


export default SitterCalendar;
