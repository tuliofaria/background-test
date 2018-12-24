import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Dimensions, Animated, Easing} from 'react-native';
import Sound from 'react-native-sound'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
const dim = Dimensions.get('window')

export default class App extends Component {
  state = {
    perc: 0,
    counter: 0,
    chartAnimation1: new Animated.Value(0),
    chartAnimation2: new Animated.Value(dim.height),
    numberAnim1: new Animated.Value(0)
  }
  componentDidMount(){
    Sound.setCategory('Playback', true)
    const plim = new Sound('alert.mp3', Sound.MAIN_BUNDLE, err => {
      console.log('err', err)
    })
    plim.play(s => console.log('success', s))
    const t = 30
    setInterval(() => {
      Animated.parallel([
        Animated.timing(this.state.chartAnimation1, {
          toValue: dim.height * this.state.perc,
          duration: 1000,
          //easing: Easing.ease
        }),
        Animated.timing(this.state.chartAnimation1, {
          toValue: dim.height * (1-this.state.perc),
          duration: 1000,
          //easing: Easing.ease
        }),
        Animated.sequence([
          Animated.timing(this.state.numberAnim1, {
            toValue: 1,
            duration: 500
          }),
          Animated.timing(this.state.numberAnim1, {
            toValue: 0,
            duration: 500
          })
        ])
      ]).start()
      
      plim.play()
      this.setState({
        counter: this.state.counter + 1,
        perc: (this.state.counter%t)/t
      })
    }, 1000)
  }
  render() {
    return(
      <View style={styles.container}>
        <View style={{ flex: 1, backgroundColor: 'black' }}>
          <Animated.View style={{ height: this.state.chartAnimation1, backgroundColor: 'green' }} />
          <Animated.View style={{ height: this.state.chartAnimation2, backgroundColor: 'blue' }} />
        </View>
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Animated.Text style={[styles.welcome, { opacity: this.state.numberAnim1 }]}>{this.state.counter}</Animated.Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 50,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
