import React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Form, InputText } from './src/index';

import { FontAwesome, Feather } from "@expo/vector-icons";
class App extends React.Component {
    state = {
        first_name: "",
        number: "",
        last_name: "",
        email: '',
        user: { password: "", repeatPassword: "" },
    }

    componentDidMount() {
        Form.addValidationRule('isValidPassword', (value) => {
            let passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
            if (passwordReg.test(value) === false) {
                return false;
            }
            return true;
        });
        Form.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.user.password) {
                return false;
            }
            return true;
        });
    }

    componentWillUnmount() {
        Form.removeValidationRule('isPasswordMatch');
        Form.removeValidationRule('isValidPassword');
    }

    handlePassword = (event) => {
        const { user } = this.state;
        user.password = event.nativeEvent.text;
        this.setState({ user });
    }

    handleRepeatPassword = (event) => {
        const { user } = this.state;
        user.repeatPassword = event.nativeEvent.text;
        this.setState({ user });
    }

    handleChange = (email) => {
        this.setState({ email });
    }

    handleFirstName = (first_name) => {
        this.setState({ first_name });
    }
    handleLastName = (last_name) => {
        this.setState({ last_name });
    }
    handleNumber = (number) => {
        this.setState({ number });
    }

    submit = () => {
        alert("form submit, thank you.")
    }

    handleSubmit = () => {
        this.refs.form.submit();
    }

    render() {
        let Image_Http_URL = { uri: 'https://radhakishan.vpran.in/img/radhakishan-web-3.jpg' };
        const { user } = this.state;
        return (
            <ScrollView>
                <View style={[styles.container, {marginTop: 50}]}>
                    <View style={[styles.action, { alignItems: "center" }]} >
                        <Image source={Image_Http_URL} style={{ width: 100, height: 100, borderRadius: 100 / 2 }} />
                        <FontAwesome name="github" size={24} /><Text style={{fontSize: 18}}>radhakishan404</Text>
                        <Text style={{ fontSize: 20, padding: 10 }}>validate-form-in-expo-style</Text>
                    </View>
                    <View style={styles.action} >
                        <Form
                            ref="form"
                            onSubmit={this.submit}
                        >
                            <InputText
                                name="first_name"
                                label="First Name"
                                placeholder="textfield with floating label"
                                validateNames={['required', "isString", "maxStringLength:30"]}
                                errorMessages={["This field is required", "Only characters allowed", "Max character limit is 30"]}
                                value={this.state.first_name}
                                onChangeText={this.handleFirstName}
                                type="text"
                                leftIcon={<FontAwesome name="user-o" color="#0A3055" size={20} />}
                                invalidIcon={< Feather
                                    name="alert-circle"
                                    color="red"
                                    size={20}
                                />}
                                validIcon={<Feather name="check-circle" color="green" size={20} />}
                            />
                            <InputText
                                name="last_name"
                                placeholder="textfield without floating label"
                                validateNames={['required', "isString", "maxStringLength:30"]}
                                errorMessages={["This field is required", "Only characters allowed", "Max character limit is 30"]}
                                value={this.state.last_name}
                                onChangeText={this.handleLastName}
                                type="text"
                                leftIcon={<FontAwesome name="user-o" color="#0A3055" size={20} />}
                                invalidIcon={< Feather
                                    name="alert-circle"
                                    color="red"
                                    size={20}
                                />}
                                validIcon={<Feather name="check-circle" color="green" size={20} />}
                            />
                            <InputText
                                name="phone"
                                label="Mobile"
                                placeholder="textfield with only number"
                                validateNames={['required', "isNumber", "maxStringLength:10"]}
                                errorMessages={["This field is required", "Only numbers allowed", "Max string limit is 10"]}
                                value={this.state.number}
                                onChangeText={this.handleNumber}
                                type="text"
                                leftIcon={<FontAwesome name="phone" color="#0A3055" size={20} />}
                                invalidIcon={< Feather
                                    name="alert-circle"
                                    color="red"
                                    size={20}
                                />}
                                validIcon={<Feather name="check-circle" color="green" size={20} />}
                            />
                            <InputText
                                name="email"
                                label="email"
                                validateNames={['required', 'validEmail']}
                                errorMessages={['This field is required', 'Enter valid email address']}
                                placeholder="textfield with email validation"
                                type="text"
                                keyboardType="email-address"
                                value={this.state.email}
                                onChangeText={this.handleChange}
                                leftIcon={<FontAwesome name="user-o" color="#0A3055" size={20} />}
                                invalidIcon={< Feather
                                    name="alert-circle"
                                    color="red"
                                    size={20}
                                />}
                                validIcon={<Feather name="check-circle" color="green" size={20} />}
                            />
                            <InputText
                                name="password"
                                label="Password"
                                secureTextEntry
                                validateNames={['isValidPassword', 'required']}
                                errorMessages={['Minimum eight characters, at least one uppercase letter, one lowercase letter and one number', 'This field is required']}
                                type="text"
                                value={user.password}
                                placeholder="custom password validation"
                                leftIcon={<FontAwesome name="lock" color="#0A3055" size={20} />}
                                onChange={this.handlePassword}
                                invalidIcon={< Feather
                                    name="alert-circle"
                                    color="red"
                                    size={20}
                                />}
                            />
                            <InputText
                                name="repeatPassword"
                                label="Confirm Password"
                                secureTextEntry
                                validateNames={['isPasswordMatch', 'required']}
                                errorMessages={['Password mismatch', 'This field is required']}
                                type="text"
                                value={user.repeatPassword}
                                placeholder="Confirm your password"
                                onChange={this.handleRepeatPassword}
                                invalidIcon={< Feather
                                    name="alert-circle"
                                    color="red"
                                    size={20}
                                />}
                                leftIcon={<FontAwesome name="lock" color="#0A3055" size={20} />}
                            />
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={this.handleSubmit}
                                style={styles.appButtonContainer}
                            >
                                <Text style={styles.appButtonText}>Submit</Text>
                            </TouchableOpacity>
                        </Form>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    action: {
        width: Dimensions.get('window').width,
        padding: 20
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginTop: 10
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
});
