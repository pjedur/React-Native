import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  BackAndroid
} from 'react-native';

import { getTvStations } from "../API/tvApi";

export default class TvStationsList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      tvStations: ds
    };
  }

  componentDidMount() {
    const { tvStations } = this.state;
    getTvStations().then((data) => {
      this.setState({
        tvStations: tvStations.cloneWithRows(data)
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', function() {
      const secondRoute = this.props.navigator.getCurrentRoutes()[1];
      secondRoute === undefined ? BackAndroid.exitApp() : this.props.navigator.pop();
      return true;
    }.bind(this));
  }

  onPress(tvStation) {
    this.props.navigator.push({
      component: 'tvStationSchedule',
      tvStation: tvStation
    });
  }

  renderRow(tvStation, sectionId, rowId, highlightRow){
    return(
      <TouchableHighlight onPress={() => this.onPress(tvStation)}>
        <View style={styles.item}>
            <Text style={styles.itemText}> {tvStation.name} </Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <ListView contentContainerStyle={styles.list}
        dataSource={this.state.tvStations}
        renderRow={this.renderRow.bind(this)}
      />
    );
  }
}

const styles = StyleSheet.create({
  list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    },
    item: {
      width: 150,
      height: 75,
      borderStyle: "solid",
      borderWidth: 1,
      borderRadius: 5,
      borderColor: "white",
      padding: 15,
      marginBottom: 3,
      marginRight: 3,
      marginLeft: 3,
      marginTop: 15,
      justifyContent: "center",
      backgroundColor: '#4286f4',
    },
    itemText: {
      fontSize: 17,
      textAlign: "center",
      fontFamily: "Helvetica",
      fontWeight: "normal",
      color: "white"
    }
});

AppRegistry.registerComponent('TvStationsList', () => TvStationsList);
