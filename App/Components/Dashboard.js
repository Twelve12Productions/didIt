import React, {
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1
  },
  image: {
    height: 350,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  }
});

class Dashboard extends Component {
	makeBackground(btn){
		var obj = {
			flexDirection: 'row',
			alignSelf: 'stretch',
			justifyContent: 'center',
			flex: 1
		}
		if(btn === 0){
			obj.backgroundColor = '#009688';
		} else if (btn === 1){
			obj.backgroundColor = '#FF9100';
		} else {
			obj.backgroundColor = '#31708f';
		}
		return obj;
	}

	goToProfile(){
		console.log('Going to Profile Page');
	}

	goToRepos(){
		console.log('Going to Repos');
	}
	
	goToNotes(){
		console.log('Going to Notes');
	}


	render(){
		return (
			<View style={styles.container}>
				<Image style={styles.image} source={{uri: this.props.userInfo.avatar_url}} />
				<TouchableHighlight
		            style={this.makeBackground(0)}
		            onPress={this.goToProfile.bind(this)}
		            underlayColor="#88D4F5">
		              <Text style={styles.buttonText}>View Profile</Text>
		        </TouchableHighlight>
		        <TouchableHighlight
		            style={this.makeBackground(1)}
		            onPress={this.goToRepos.bind(this)}
		            underlayColor="#E39EBF">
		              <Text style={styles.buttonText}>View Repositories</Text>
		        </TouchableHighlight>
		        <TouchableHighlight
		            style={this.makeBackground(2)}
		            onPress={this.goToNotes.bind(this)}
		            underlayColor="#9BAAF3">
		              <Text style={styles.buttonText}>Take Notes</Text>
		        </TouchableHighlight>
			</View>
		)
	}
}

module.exports = Dashboard;