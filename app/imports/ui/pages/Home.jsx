import React from 'react';
import { Header, Container } from 'semantic-ui-react';
import { Geolocation } from 'meteor/mdg:geolocation';

/** A simple static component to render some text for the landing page. */
class Home extends React.Component {
  render() {
    return (
      <Container textAlign='center' fluid>
        <Header as='h1'>Hello!</Header>
        <Header as='h2'>{Geolocation.latLng()}</Header>
      </Container>
    );
  }
}

export default Home;
