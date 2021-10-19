import React from 'react';
import { Header, Container } from 'semantic-ui-react';
import { Geolocation } from 'meteor/mdg:geolocation';
import { Tracker } from 'meteor/tracker';

/** A simple static component to render some text for the landing page. */
class Home extends React.Component {
  render() {
    Tracker.autorun(() => {
      const latLng = Geolocation.currentLocation();
      const latLng1 = Geolocation.latLng();
      // Initialize the map once we have the latLng.
      if (latLng != null) {
        console.log(latLng.coords);
        console.log(latLng1);
      }
    });

    return (
      <Container textAlign='center' fluid>
        <Header as='h1'>Hello!</Header>
      </Container>
    );
  }
}

export default Home;
