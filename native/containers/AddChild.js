{/*<Text style={styles.text}>Child name</Text>
 <TextInput
 type="TextInput"
 name="child Name"
 placeholder="childName"
 value={ this.props.register.childName ? this.props.register.childName : null}
 onChangeText={(text) => this.props.actions.registerActions.changeChildName(text)} />
 <Text style={styles.text}>Child age</Text>
 <TextInput
 type="TextInput"
 name="childAge"
 placeholder="child Age"
 value={ this.props.register.childAge ? this.props.register.childAge : null }
 onChangeText={(text) => this.props.actions.registerActions.changeChildAge(text)} />
 <Text style={styles.text}>Child Expertise</Text>
 <CheckboxGroup
 onSelect={ (values) => self.props.actions.registerActions.changeChildExpertise(values) }
 checked={ [] }
 items={ strings.EXPERTISE } />
 <Text style={styles.text}>Child Hobbies</Text>
 <CheckboxGroup
 onSelect={ (values) => self.props.actions.registerActions.changeChildHobbies(values) }
 checked={ [] }
 items={ strings.HOBBIES } />
 <Text style={styles.text}>Child Special needs</Text>
 <CheckboxGroup
 onSelect={ (values) => self.props.actions.registerActions.changeChildSpecialNeeds(values) }
 checked={ [] }
 items={ strings.SPECIAL_NEEDS } />
 <Text style={styles.text}>Partner name</Text>
 <TextInput
 type="TextInput"
 name="parnterName"
 placeholder="parnter Name"
 value={ this.props.register.partnerName ? this.props.register.partnerName : null}
 onChangeText={(text) => this.props.actions.registerActions.changePartnerName(text)} />
 <Text style={styles.text}>Partner email</Text>
 <TextInput
 type="TextInput"
 name="parnterEmail"
 placeholder="parnter Email"
 value={ this.props.register.parterEmail ? this.props.register.parterEmail : null}
 onChangeText={(text) => this.props.actions.registerActions.changePartnerEmail(text)} />
 <Text style={styles.text}>Partner gender</Text>
 <Picker
 selectedValue={ this.props.user.partnerGender ?  this.props.user.partnerGender : 'Female' }
 onValueChange={(gender) => { this.props.actions.registerActions.changePartnerGender(gender) }}>
 <Picker.Item label={ strings.GENDER[0] } value={ strings.GENDER[0] } />
 <Picker.Item label={ strings.GENDER[1] } value={ strings.GENDER[1] } />
 </Picker>*/}