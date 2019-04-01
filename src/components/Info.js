import React from 'react'
import { Component } from 'react'
import GoogleMapReact from 'google-map-react'

export default class Info extends Component {

  static defaultProps = {
    zoom: 11
  }

  render () {
    return (
      <div style={{ height: '54.4vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAXXfudwFAvEh-dVmeP1COO1N6z54sw_vU' }}
          center={this.props.center}
          defaultZoom={this.props.zoom} 
        />
      </div>
    )
  }
}


