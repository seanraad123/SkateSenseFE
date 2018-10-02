import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import NewSpotForm from '../child_components/newSpotForm'
import LikeButton from '../child_components/likeButton'
import BookmarkButton from '../child_components/bookmarkButton'
import SkateSpotPageButton from '../child_components/spotProfileButton'
import { getSkateSpots } from '../../action'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {Provider} from 'react-redux'
import store from '../../store'
import IconButton from '@material-ui/core/IconButton';
import DirectionsIcon from '@material-ui/icons/Directions'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';



class MapContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      showingInfoWindow: false,
      activeMarker: {
        image:{
          url:'a'
        }
      },
      selectedPlace: {},
      image: '',
      fields: {
        location: {
          lat: 33.1631037,
          lng: -117.3286687
        }
      },
      spots: [],
      term: this.props.logSearchTerm
    }

}

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps.logSearchTerm)
      if (nextProps.geoLocation != undefined){
         if(nextProps.geoLocation.latitude !== this.state.fields.location.lat) { // You might need to have a deep comparison here if columns is not immutable or a nested obejct. You can use _.isEqual from lodash in that case
           console.log('got here!');
             this.setState({
               fields:{
                 location:{
                   lat: nextProps.geoLocation.latitude,
                   lng: nextProps.geoLocation.longitude
                 }
               }
            })
          }
     }else if (nextProps.geolocation == undefined) {
       console.log('got to line 50, MapContainer. nextProps.geolocation == undefined');
     }
   }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        showingNewInfoWindow: false
      })

    }
  }

  onMarkerClick = (props, marker, e) =>{
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      image: marker.image.url,
      showingNewInfoWindow: false,
    })}

  newMarkerCreation = (props) =>{
    props = props.payload[props.payload.length-1]
    this.setState({
      selectedPlace:props,
      activeMarker: this.state.newActiveMarker,
      showingInfoWindow: true,
      image: props.skatephoto.url,
      showingNewInfoWindow: false
    })
  }

  newMarkerClick = (props, marker, e) =>{
    this.setState({
      showingInfoWindow: false,
      newSelectedPlace: props,
      newActiveMarker: marker,
      showingNewInfoWindow: true
  })}

  addMarker = (location, map) => {
    this.setState(prev => ({
      showingInfoWindow: false,
      fields: {
        ...prev.fields,
        location
      }
      }));
    };

  onInfoWindowOpen = (props, e) => {
    // let spot = ('filtered spot', props.skateSpots.filter(spot => spot.id === this.state.activeMarker.id))
    // let spotLikeCount = ''
    // if (spot[0] !== undefined){
    //   spotLikeCount = spot[0].likes.length
    // }
    // <h1>Likes: {spotLikeCount !== undefined ? spotLikeCount : null} </h1>

      const styles = theme => ({
        title:{
          fontSize: 60,
          // fontFamily: 'gurajada',
          fontWeight: 'bold'
        },
        root: {
          flexGrow: 1,
          maxWidth: 500,
          padding: theme.spacing.unit * 2,
          margin: 20
        },
        description:{
          fontSize: 20,
          wordWrap: 'break-word'
        },
        image: {
          width: 128,
          height: 100,
        },
        img: {
          margin: 'auto',
          display: 'block',
          maxWidth: '100%',
          maxHeight: '100%',
        },
      });
      const btnSet = (
        <Grid container>
          <div>
            <Grid item>
              <Paper className={styles.root}>
                <Typography className={styles.title}>
                {this.state.selectedPlace.title}
                </Typography><br/>
                  <img src={`http://localhost:3000${this.state.image}`} height='300' width='400'/>
                <Typography className={styles.description}>
                  {this.state.selectedPlace.description}
                </Typography>
                  <IconButton href={`https://www.google.com/maps/dir//${this.state.activeMarker.position.lat()},${this.state.activeMarker.position.lng()}`}
                    target="_blank"
                    color="inherit"
                    aria-label="Open drawer"
                    >
                    <DirectionsIcon />
                  </IconButton>
                  <BookmarkButton marker={this.state.activeMarker}/>
              </Paper>
          </Grid>
          </div>
        </Grid>
      )
      ReactDOM.render(
        <Provider store={store}>
          {btnSet}
        </Provider>,
        document.getElementById("iwc")
      )
    }

  onNewInfoWindowOpen = (props, e) => {
    const wholeForm = (
      <div>
        <NewSpotForm latitude={this.state.fields.location.lat} longitude={this.state.fields.location.lng} newMarkerCreation={this.newMarkerCreation}/>
      </div>
    )
    ReactDOM.render(
      <Provider store={store}>
        {wholeForm}
      </Provider>,
      document.getElementById("newMarker")
    )
  }

  render() {
    return (
      <Map google={this.props.google}
          style={{width: "100%", marginTop:3, height: "96%"}}
          initialCenter={{lat: 33.1631037,lng: -117.3286687}}
          zoom={14}
          center={{lat: this.state.fields.location.lat, lng: this.state.fields.location.lng}}
          onClick={(t, map, c) => this.addMarker(c.latLng, map)}>

        <Marker position={this.state.fields.location} onClick={this.newMarkerClick}/>

        {this.props.skateSpots.map(spot => <Marker key={spot.id} id={spot.id} currentUserid={1} onClick={this.onMarkerClick} title={spot.name} bustFactor={spot.bust_factor} description={spot.description} image={spot.skatephoto} position={{lat:spot.latitude, lng:spot.longitude}} />)}

          <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onOpen={e => {this.onInfoWindowOpen(this.props, e)}}>

              <div id="iwc" />
          </InfoWindow>

          <InfoWindow
          marker={this.state.newActiveMarker}
          visible={this.state.showingNewInfoWindow}
          onOpen={e => {this.onNewInfoWindowOpen(this.props, e)}}>
          <div id="newMarker" />
          </InfoWindow>
    </Map>
    )
  }
}

const mapStateToProps = state => {
  return {
    skateSpots: state.skate_spots,
    geoLocation: state.geoLocation,
    logSearchTerm: state.logSearchTerm
  }
}

const connectedMap = connect(mapStateToProps)(MapContainer)
export default GoogleApiWrapper({
  apiKey: ('AIzaSyD8eyGeIVO1m-lMAwJ21o3qiUPRiuFV_ck')
})(connectedMap)
// AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo
// AIzaSyD8eyGeIVO1m-lMAwJ21o3qiUPRiuFV_ck
// AIzaSyDiNwCezSsFJzr1kzCqAwnoOlblT5KXNwQ
