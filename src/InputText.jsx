import React from 'react';
import { TextInput, Animated, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import Input from './Input';
import { Feather } from "@expo/vector-icons";

class FloatingLabelInput extends React.Component {
    state = {
        isFocused: true,
        animatedValue: new Animated.Value(0),
        secureTextEntry: false
    };

    componentDidMount() {
        const { animatedValue } = this.state;
        this.setState({ secureTextEntry: this.props.secureTextEntry })
        this.props.value !== '' ? Animated.timing(animatedValue, {
            duration: 280,
            toValue: 1,
            useNativeDriver: false
        }).start() : null;
    }

    handleFocus = () => {
        const { animatedValue } = this.state;
        Animated.timing(animatedValue, {
            duration: 280,
            toValue: 1,
            useNativeDriver: false
        }).start();
    }

    handleBlur = () => {
        const { animatedValue } = this.state;
        this.props.value === '' ? Animated.timing(animatedValue, {
            duration: 140,
            toValue: 0,
            useNativeDriver: false
        }).start() : null;
    }

    showHidePassword = () => {
        this.setState({ secureTextEntry: !this.state.secureTextEntry })
    }

    render() {
        const { animatedValue } = this.state;
        const { label, ...props } = this.props;
        const labelStyle = {
            position: 'absolute',
            color: "#fff",
            top: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [18, -8],
            }),
            fontSize: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 14],
            }),
            color: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['#fff', '#000'],
            }),
        };
        return (
            <View style={[styles.action]}>
                {
                    this.props.leftIcon
                }
                <Animated.Text style={[labelStyle, this.props.labelStyle, this.props.leftIcon ? { left: 25 } : { left: 10 }, { textTransform: "capitalize", fontWeight: "bold" }]}>
                    {label}
                </Animated.Text>
                <TextInput
                    {...props}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    blurOnSubmit
                    style={[this.props.style, styles.textInput]}
                    secureTextEntry={this.state.secureTextEntry}
                />
                {
                    this.props.isValid && this.props.value !== '' ?
                        this.props.validIcon
                        : null
                }

                {
                    this.props.isInvalid && !this.props.isValid ?
                        this.props.invalidIcon
                        : this.props.secureTextEntry ? <TouchableOpacity
                            onPress={() => this.showHidePassword()}
                        >
                            {this.state.secureTextEntry ?
                                <Feather
                                    name="eye-off"
                                    color="grey"
                                    size={20}
                                />
                                :
                                <Feather
                                    name="eye"
                                    color="grey"
                                    size={20}
                                />
                            }
                        </TouchableOpacity>
                            : null
                }
            </View>
        );
    }
}

export default class InputText extends Input {

    render() {
        const {
            errorMessage,
            validateNames,
            requiredError,
            errorStyle,
            validatorListener,
            style,
            ...rest
        } = this.props;
        return (
            <View>
                <FloatingLabelInput
                    {...rest}
                    ref={(r) => { this.input = r; }}
                    {...this.state}
                    style={style}
                />
                {
                    this.state.isInvalid && !this.state.isValid ?
                        <Text style={errorStyle.text}>{this.getErrorMessage()}</Text>
                        :
                        null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    action: {
        flexDirection: "row",
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#f2f2f2",
        paddingBottom: 5,
        paddingTop: 8
    },
    inputError: {
        borderBottomColor: "red",
        borderBottomWidth: 3
    },
    inputSuccess: {
        borderBottomColor: "green",
        borderBottomWidth: 3
    },
    textInput: {
        flex: 1,
        marginTop: -2,
        paddingLeft: 10,
        color: "black"
    },
    error: {
        color: "red",
        fontSize: 14,
        fontWeight: "700"
    },
})