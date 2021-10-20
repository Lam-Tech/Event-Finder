import React from 'react';
import { Header, Container } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Home extends React.Component {
  render() {
    return (
      <Container textAlign='center' fluid>
        <Header as='h1'>Hello!</Header>
        <Header as='h4'> Go to the event tab to find/create a event!</Header>
      </Container>
    );
  }
}

export default Home;
