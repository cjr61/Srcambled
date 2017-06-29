/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ActivityIndicator,
  TextInput,
  Button,
  Alert
} from 'react-native';
import colors from './components/Colors.js'
import GameData from './components/root.js'

export default class Srcambeld extends Component {
  constructor(props) {
    super(props)
    this.gameData = new GameData()

    this.state = {
      currentWord: null, scrambledWord: null,
      answerCorrect: false,
      text: ''
    }
  }

  componentDidMount() {
    this.newWord()
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
  }

  newWord() {
    const { gameData: g } = this

    const num = g.getSize()
    const i = Math.floor(Math.random() * num)
    const currentWord = g.getWord(i)
    const scrambledWord = g.scramble(currentWord)
    if(currentWord != scrambledWord){
      this.setState({
        currentWord,
        scrambledWord
      })
    } else {
      newWord()
    }
  }

  handleSubmit(event) {
    const { text, currentWord } = this.state
    if (text.toLowerCase() === currentWord.toLowerCase()) {
      this.setState({
        text: '',
        scrambledWord: null,
        answerCorrect: true
      })
    } else {
      this.setState({ text: '' })
      Alert.alert('Try Again')
    }
  }

  render() {
    const { currentWord, scrambledWord, text } = this.state
    if (currentWord == null) return (<View />)
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {scrambledWord || currentWord.toUpperCase()}
        </Text>
        <TextInput
          style={styles.input}
          maxLength={currentWord.length}
          onChangeText={text => this.setState({ text })}
          value={text}
          autoCorrect={false}
          returnKeyType="go"
          onSubmitEditing={e => this.handleSubmit(e)}/>
        {scrambledWord == null ? <Button title="Continue" color='lightgreen' onPress={e => this.newWord()} /> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.coal,
  },
  welcome: {
    marginTop: 180,
    fontSize: 35,
    fontFamily: 'Chalkduster',
    textAlign: 'center',
    color: colors.snow,
    margin: 10,
  },
  input: {
    marginTop: 40,
    height: 40,
    borderColor: 'gray',
    fontFamily: 'Chalkduster',
    borderWidth: 1,
    textAlign: 'center',
    color: colors.cloud},
});

AppRegistry.registerComponent('Srcambeld', () => Srcambeld);
