import React, { Component } from 'react'
import { getUserData } from '../../action'
import { getSkateSpots } from '../../action'
import { connect } from 'react-redux'
import SkateSpotItem from '../child_components/SkateSpotItem'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux'

const styles = {
  title: {
    fontFamily: 'pacifico',
    flexGrow: 1,
    maxWidth: 500,
    margin: 20,
    fontSize: 30
  },
};

class BookmarkContainer extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }
  render(){
    const { classes } = this.props;
    return(
      <div>
        <center>
          <Typography className={classes.title} variant="title">
            Bookmarks
          </Typography>
          </center>

        <Grid justify='center' container spacing={24}>
          { this.state.myBookmarks ? this.state.myBookmarks.map(spot => <SkateSpotItem key={spot.id} spot={spot} /> ): null }
        </Grid>

      </div>
    )
  }

  async componentDidMount(){
    const response = await this.props.getUserData()
    this.setState({ myBookmarks: response.skate_spots})
  }

  getBookmarkedSpots = () =>{
    if (this.state.allSkateSpots.payload.length > 0){

      console.log('mybookmarked spot')
      // this.setState({myBookmarkedSpots: [...this.state.myBookmarkedSpots, myBookmarkedSpot]})
    }
  }

}


const mapStateToProps = (state) => {
  return {
    userData: state.user_data,
    skateSpots: state.skateSpots,
    loadingData: state.loadingData
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      getUserData: () => dispatch(getUserData()),
      getSkateSpots: () => dispatch(getSkateSpots())
    }
}


const stylesMap = withStyles(styles)

const connectMap = connect(mapStateToProps, mapDispatchToProps)

export default compose(stylesMap, connectMap)(BookmarkContainer)