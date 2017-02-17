import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, } from 'react-native';

export default class TvShowDetails extends Component {
  constructor(props) {
    super(props);
  }

  renderSeasonEpisode(tvShow) {
    if(tvShow.episode !== '1' && tvShow.series !== '1') {
      return (
        <View>
          <Text style={styles.text}>Sería: {tvShow.series}</Text>
          <Text style={styles.text}>Þáttur: {tvShow.episode}</Text>
        </View>
      );
    }
  }

  render() {
    const { tvShow } = this.props;
    return (
      <View>
        <Text style={styles.text}>{tvShow.description}</Text>
        <Text style={styles.text}>Lengd: {tvShow.duration}</Text>
        {this.renderSeasonEpisode(tvShow.series)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15
  }
});


AppRegistry.registerComponent('TvShowDetails', () => TvShowDetails);
