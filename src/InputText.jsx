import React from 'react';
import { TextInput, Animated, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import Input from './Input';
import { Feather } from "@expo/vector-icons";

class FloatingLabelInput extends React.Component {
    state = {
        isFocused: true,
        animatedValue: new Animated.Value(0),
        secureTextEntry: false,
        floatingTopValue: 18,
        floatingFontSize: 20,
        afterFloatTopValue: -4
    };

    componentDidMount() {
        const { animatedValue } = this.state;
        if (this.props.secureTextEntry)
            this.setState({ secureTextEntry: this.props.secureTextEntry });
        if (this.props.floatingTopValue)
            this.setState({ floatingTopValue: this.props.floatingTopValue });
        if (this.props.afterFloatTopValue)
            this.setState({ afterFloatTopValue: this.props.afterFloatTopValue });
        if (this.props.floatingFontSize)
            this.setState({ floatingFontSize: this.props.floatingFontSize });
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
                outputRange: [this.state.floatingTopValue, this.state.afterFloatTopValue],
            }),
            fontSize: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [this.state.floatingFontSize, 14],
            }),
            color: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['#fff', '#000'],
            }),
        };
        return (
            <View style={[styles.action, this.props.containerStyle]}>
                {
                    this.props.leftIcon
                }
                <Animated.Text style={[labelStyle, this.props.leftIcon ? { left: 25 } : { left: 10 }, { textTransform: "capitalize", fontWeight: "bold" }, this.props.labelStyle]}>
                    {label}
                </Animated.Text>
                <TextInput
                    {...props}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    blurOnSubmit
                    style={[styles.textInput, this.props.style]}
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
                            style={{ alignSelf: "center" }}
                        >
                            {this.state.secureTextEntry ?
                                this.props.passwordHideIcon
                                :
                                this.props.passwordShowIcon
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