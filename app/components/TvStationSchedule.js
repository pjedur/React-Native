import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';

import moment from "moment";
import { getTvStationSchedule }  from "../API/tvApi";

export default class TvStationSchedule extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      schedule: ds,
      fetching: true
    };
  }

  componentDidMount() {
    this.setState({fetching: true});
    const { endpoint } = this.props.tvStation;

    getTvStationSchedule(endpoint).then((data) => {
      this.setState({
        schedule: this.state.schedule.cloneWithRows(data),
        fetching: false
      });
    }).catch((err) => {
      console.log(err);
      this.setState({fetching: false})
    })
  }

  onPress(tvShowDetails) {
    if(tvShowDetails.description.length > 1) {
      this.props.navigator.push({
        component: "tvShowDetails",
        tvShowDetails: tvShowDetails
      });
    }
  }

  parseStartTime(startTime) {
    startTime = startTime.slice(10);
    startTime = startTime.substring(0, startTime.length - 3);
    return startTime;
  }

  renderRow(tvShow, sectionId, rowId, highlightRow) {
    return (
      <TouchableHighlight onPress={() => this.onPress(tvShow)}>
        <View style={styles.row}>
          <Text style={styles.text}>
            {this.parseStartTime(tvShow.startTime)}    {tvShow.title}
          </Text>
        </View>
      </TouchableHighlight>
    )
  }

  renderListView() {
    return (
      <View>
        <Text style={styles.header}> {moment().format('LL')} </Text>
        <ListView
          dataSource={this.state.schedule}
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    );
  }

  renderActivityIndicator() {
    return (
      <ActivityIndicator
        animating={this.state.fetching}
        style={[styles.centering, {height: 500}]}
        size={60}
        color="#FFFFFF"
      />
    );
  }

  render() {
    if(this.state.fetching) {
      return this.renderActivityIndicator();
    }
    else {
      return this.renderListView();
    }
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection:'row',
    backgroundColor: '#4286f4',
    borderBottomWidth: 2,
    borderColor: "white",
    height: 55,
    paddingTop: 14
  },
  text: {
    color: "white",
    fontSize: 18,
    fontFamily: "Verdana",
    fontWeight: "normal",
    justifyContent: "space-around",
    paddingLeft: 10
  },
  header: {
    height: 50,
    justifyContent: "center",
    color: 'grey',
    backgroundColor: "white",
    fontSize: 22,
    padding: 10,
    textAlign: "center",
    borderBottomWidth: 2,
    borderColor: "grey"
  }
});



AppRegistry.registerComponent('TvStationSchedule', () => TvStationSchedule);
