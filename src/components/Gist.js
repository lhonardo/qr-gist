import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Actions } from 'react-native-router-flux'
import { Text, View, Image, ScrollView, TextInput } from 'react-native'
import * as gistActions from '../actions/gistActions'
import * as loginActions from '../actions/loginActions'
import { Button } from 'react-native'
import { AsyncStorage } from 'react-native'
import styles from '../styles/all'

class Gist extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comment: ''
    }
    this.handleCommentInputChange = this.handleCommentInputChange.bind(this)
    this.sendComment = this.sendComment.bind(this)
  }

  handleCommentInputChange (comment){
    this.setState({comment: comment})
  }

  sendComment (){
    if(this.state.comment.length > 0){
      AsyncStorage.multiGet(['gistId', 'token']).then((value) => {
        this.props.sendComment(value[0][1], value[1][1], this.state.comment)
        this.setState({'comment': ''})
      }).done()
    }
  }

  componentWillMount() {
    if(Object.keys(this.props.gist).length === 0){
      AsyncStorage.setItem('gistId', this.props.gistId)
      this.props.fetchGist(this.props.gistId)
    }
  }

  render() {
    const { gist, comments, isAuthenticated, loading } = this.props;
    return (
      loading
      ? <Text>Loading...</Text>
      : <ScrollView contentContainerStyle={styles.contentContainer}>
        {
          Object.keys(gist).length > 0
          ? <View>
            <View style={styles.contentRow}>
              <Image
                style={{width: 50, height: 50}}
                source={{uri: gist.owner.avatar_url}}
              />
              <Text style={styles.h1}>{gist.owner.login}</Text>
            </View>
            <View style={styles.boxColor}>
              <Text style={styles.h2}>{gist.description}</Text>
            </View>
            {
              Object.keys(gist.files).map(key =>
                <View key={key} style={styles.paddingTopBottom}>
                  <Text style={styles.h3, styles.titleColor}>{key}</Text>
                  <Text style={styles.codeContent}>{gist.files[key].content}</Text>
                </View>
              )
            }

            <Text style={styles.h2}>Comments: {gist.comments} </Text>

            {
              comments.map(comment =>
                <View key={comment.id} style={styles.paddingTopBottom}>
                  <View style={styles.contentRow}>
                    <Image
                      style={{width: 35, height: 35}}
                      source={{uri: comment.user.avatar_url}}
                    />
                    <Text style={styles.paddingLeft, styles.h2}>{comment.user.login}</Text>
                  </View>
                  <View style={styles.boxColor}>
                    <Text style={styles.paddingTopBottom, styles.h2}>{comment.body}</Text>
                  </View>
                </View>
              )
            }

            <Text style={styles.h2, styles.titleColor}>Add new comment: </Text>
            {
              isAuthenticated
              ? <View>
                <TextInput
                  onChangeText={this.handleCommentInputChange}
                />
                <Button
                  onPress={this.sendComment}
                  title="Send"
                  color="#841584"
                  disabled={!(this.state.comment.length > 0)}
                />
              </View>
              : <View>
                <Text>
                  You need to login in your GitHub account before post comments
                </Text>
                <Button
                  onPress={() => this.props.navigation.navigate('login')}
                  title="Login"
                  color="#841584"
                />
              </View>

            }
          </View>
          : <Text>Loading...</Text>
        }
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ gistReducer, userReducer, spinnerReducer }) => {
  return {
    gist: gistReducer.gist,
    comments: gistReducer.comments,
    isAuthenticated: userReducer.isAuthenticated,
    loading: spinnerReducer.visible
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({...gistActions, ...loginActions}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Gist)
