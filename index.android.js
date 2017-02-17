import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Navigator } from 'react-native';

import TvStationsList from "./app/components/TvStationsList";
import TvStationSchedule from "./app/components/TvStationSchedule";
import TvShowDetails from "./app/components/TvShowDetails";

export default class myapp extends Component {

  renderScene(route, navigator) {
    switch(route.component) {
      case "tvStationSchedule":
        return (<TvStationSchedule navigator={navigator} tvStation={route.tvStation} title="Details" />)
      case "tvStationsList":
        return (<TvStationsList navigator={navigator} title="TV Stations" />)
      case "tvShowDetails":
        return (<TvShowDetails navigator={navigator} tvShow={route.tvShowDetails} />)
    }
  }

  render() {
    return (
      <Navigator
        style={{backgroundColor: "#4286f4"}}
        initialRoute={{component: "tvStationsList"}}
        renderScene={this.renderScene}
        configureScreen={(route, routeStack) => Navigator.SceneConfigs.FloatFromBottom}
      />
    );
  }
}

AppRegistry.registerComponent('myapp', () => myapp);
