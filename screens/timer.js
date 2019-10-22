/*This is an Example of Timer/Stopwatch in React Native */
import React, { Component } from 'react';
//import React in our project
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
//import all the required components
import { Stopwatch } from 'react-native-stopwatch-timer';
//importing library to use Stopwatch and Timer

export default class timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStopwatchStart: false,
      resetStopwatch: false,
      currentTime: null,
    };
    this.startStopStopWatch = this.startStopStopWatch.bind(this); // member function. 
    this.resetStopwatch = this.resetStopwatch.bind(this);
  }                            //menber関数の bind(this) を呼んでComponent自身がthisになるように指定しておく

  startStopStopWatch() {
    this.setState({ isStopwatchStart: !this.state.isStopwatchStart, resetStopwatch: false });
  }

  getFormattedTime(time) {
    currentTime = time;
  }

  resetStopwatch() {
    console.log(currentTime);
    this.setState({ isStopwatchStart: false, resetStopwatch: true });
  }

  // AsyncStorageへcurrentTimeを保存したい


  render() {
    return (
      <View style={styles.display}>
        <Stopwatch laps msecs
          options={options}
          //options for the styling
          start={this.state.isStopwatchStart}
          //To start
          reset={this.state.resetStopwatch}
          //To reset
          getTime={this.getFormattedTime} />
        <TouchableHighlight onPress={this.startStopStopWatch}>
          <Text style={{ fontSize: 45, marginTop: 10, color: "#00F" }}>
            {!this.state.isStopwatchStart ? "▶" : "Ⅱ"}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.resetStopwatch}>
          <Text style={{ fontSize: 40, marginTop: 10, color: "#F00" }}>■</Text>
        </TouchableHighlight>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  display: {
    flex: 1,
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center'
  },
})

const options = {
  container: {
    backgroundColor: '#00e68e',
    padding: 5,
    borderRadius: 5,
    width: 300,
    alignItems: 'center',
  },
  text: {
    fontSize: 35,
    color: '#FFF',
    marginLeft: 7,
  }
};

//   render() {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <View style={{ flex: 1, marginTop: 32, alignItems: 'center', justifyContent: 'center' }}>
//           <Stopwatch laps msecs
//             start={this.state.isStopwatchStart}
//             //To start
//             reset={this.state.resetStopwatch}
//             //To reset
//             options={options}
//             //options for the styling
//             getTime={this.getFormattedTime} />
//           <TouchableHighlight onPress={this.startStopStopWatch}>
//             <Text style={{ fontSize: 20, marginTop: 10 }}>
//               {!this.state.isStopwatchStart ? "START" : "STOP"}
//             </Text>
//           </TouchableHighlight>
//           <TouchableHighlight onPress={this.resetStopwatch}>
//             <Text style={{ fontSize: 20, marginTop: 10 }}>RESET</Text>
//           </TouchableHighlight>
//         </View>
//       </View>
//     );
//   }
// }

// const options = {
//   container: {
//     backgroundColor: '#00e68e',
//     padding: 5,
//     borderRadius: 5,
//     width: 200,
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 25,
//     color: '#FFF',
//     marginLeft: 7,
//   }
// };