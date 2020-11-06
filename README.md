***React-Native Expo Form Validation Component Library with Floating Label!***
===================
[![N|Solid](https://camo.githubusercontent.com/2ff6a06f2f6e08b17783133ca7ebc23ce1f8ac4415eee8e835647b57048a8f0d/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6c6963656e73652f6d6173686170652f6170697374617475732e737667)](https://opensource.org/licenses/MIT)

😉 Hey! I'm Radhakishan Jangid 😎. More about me [Here ↩](https://radhakishan.vpran.in/).

ℹ️ [**validate-form-in-expo-style**](https://github.com/radhakishan404/validate-form-in-expo-style) is a Simple form validation component with floating label for React-Native inspired by [react-native-form-validator](https://github.com/NewOldMax/react-native-validator-form). You can add floating label with this library and can validate form. I created this package for my personal use you can use it in yours too.

----------

My bad, that I don't have Mac or IPhone, so this library is tested only in android. Do check it in Mac and let me know if any problem occurs.

----------

***📋 Table of Contents***
--
- [Install](#_Install_22)
- [Supported Types](#_Supoorted_types_26)
- [Default Validation Rules](#_Default_Validation_Rules_are_30)
- [Usage](#usage)
- [License](#license)

***📥 Install***
--
```sh
$ npm install validate-form-in-expo-style
```  
or
```sh
$ yarn add react-native-stylish-accordion
```
Now we need to install react-native-reanimated and react-lifecycles-compat.
If you are using Expo, to ensure that you get the compatible versions of the libraries, run:

```
expo install react-native-reanimated react-native-gesture-handler react-lifecycles-compat
```

If you are not using Expo, run the following:

```
yarn add react-native-reanimated react-native-gesture-handler react-lifecycles-compat
```

***✔️ Supoorted types:-***
----------
  - TextInput
 
***📝 Default Validation Rules are:-***
----------
  - matchRegexp
  - isEmail
  - isEmpty
  - required
  - trim
  - isNumber
  - isFloat
  - isPositive
  - minNumber
  - maxNumber
  - minFloat
  - maxFloat
  - minStringLength
  - maxStringLength
  - isString

Some rules that are added in validationName can accept extra parameter for validation, like:
````javascript
<InputText
   {...otherProps}
   validateNames={['minNumber:1', 'maxNumber:255', 'matchRegexp:^[0-9]$']}
/>
````
***🎥 See the full example of form validation in react-native Expo:-***
----------
[![Watch the video](https://i.ytimg.com/vi_webp/y7bkVDu0LVA/maxresdefault.webp)](https://youtu.be/y7bkVDu0LVA)

***💡 How to use:-***
----------

````javascript
import React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Form, InputText } from 'validate-form-in-expo-style';
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
        //You can add your own rules
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
       // Remove own rules
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
                        <Form ref="form" onSubmit={this.submit} >
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
````
***🔗 Props***
----
#### Form Props

| Prop            | Required | Type     | Default value | Description                                                                                                                  |
|-----------------|----------|----------|---------------|------------------------------------------------------------------------------------------------------------------------------|
| onSubmit        | true     | function |               | Callback for form that fires when all validations are passed                                                                 |
| instantValidate | false    | bool     | true         | If true, form will be validated after each field change. If false, form will be validated only after clicking submit button. |
| onError         | false    | function |               | Callback for form that fires when some of validations are not passed. It will return array of elements which not valid. |
| debounceTime    | false    | number   | 0             | Debounce time for validation i.e. your validation will run after `debounceTime` ms when you stop changing your input |

#### InputText Props

| Prop            | Required | Type     | Default value | Description                                                                            |
|-----------------|----------|----------|---------------|----------------------------------------------------------------------------------------|
| name            | true     | string   |               | Name of input field |
| label           | false    | string   |               | Name of input Floating Label  |
| placeholder | false | string  |               | Placeholder of input before any value      |
| validateNames   | false    | array    |               | Array of validation. See list of default validation rules in above example.                             |
| errorMessages   | false    | array    |               | Array of error messages. Order of messages should be the same as `validateNames` prop.    |
| errorStyle      | false    | object   | { container: { top: 0, left: 0, position: 'absolute' }, text: { color: 'red' }, underlineValidColor: 'gray', underlineInvalidColor: 'red' } }             | Add your own error styles                                                                          |
| validatorListener | false  | function |               | It triggers after each validation. It will return `true` or `false`                    |
| withRequiredValidator | false | bool  |               | Allow to use `required` validator in any validation trigger, not only form submit      |
| leftIcon | false | code, image  |               | Either include image or add Icon tag code to display left icon see above example |
| invalidIcon | false | code, image  |               | Either include image or add Icon tag code to display error icon on right side see above example |
| validIcon | false | code, image  |               | Either include image or add Icon tag code to display success icon on right side see above example |
| secureTextEntry | false | bool  |     false          | If true than show hide icon will get added automatically |

***🔗 Methods***
----
#### Form Methods

| Name             | Params | Return | Descriptipon                                       |
|------------------|--------|--------|----------------------------------------------------|
| resetValidations |        |        | Reset validation messages for all validated inputs |
| isFormValid      | dryRun: bool (default true) | Promise   | Get form validation state in a Promise (`true` if whole form is valid). Run with `dryRun = false` to show validation errors on form |
#### InputText Methods

| Name             | Params | Return | Descriptipon                                       |
|------------------|--------|--------|----------------------------------------------------|
| getErrorMessage  |        |        | Get error validation message                       |
| validate         | value: any, includeRequired: bool | | Run validation for current component |
| isValid          |        | bool   | Return current validation state                    |
| makeInvalid      |        |        | Set invalid validation state                       |
| makeValid        |        |        | Set valid validation state                         |

***💼 Contributing***
----

This component covers all my needs, but feel free to contribute.

***🖋 License***
---
[MIT © Radhakishan Jangid](https://radhakishan.vpran.in)
