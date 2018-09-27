import React, { Component } from 'react'
import { getUserData } from '../../action'
import { connect } from 'react-redux'


class SkateSpotContainer extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }
  render(){
    return(
      <h1>Spot page hello</h1>
    )
  }


  async componentDidMount(){
  //   const response = await this.props.getUserData()
  //   this.setState({ myBookmarks: response.bookmarks, mySkateSpots: response.skate_spots })
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.user_data,
    loadingData: state.loadingData
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      getUserData: () => dispatch(getUserData()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SkateSpotContainer)
