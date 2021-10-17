import React from 'react';
import { Container, Button, Header } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <Container textAlign='center' fluid className='landing'>
        <Header as='h1'>Event Finder</Header>
        <p>Join / Create Event</p>
        <Button.Group size='medium'>
          <Button as={NavLink} exact to="/signup" inverted color='green'>Sign Up</Button>
          <Button as={NavLink} exact to="/signin" inverted color='red'>Sign In</Button>
        </Button.Group>
      </Container>
    );
  }
}

export default Landing;
