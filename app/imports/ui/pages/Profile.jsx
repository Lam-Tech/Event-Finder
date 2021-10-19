import React from 'react';
import { Container, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <Container textAlign='center'>
        <Button size={'big'} as={NavLink} activeClassName="" exact to="/signout" color='red' inverted>Sign Out</Button>
        <br/><br/><br/><br/>
      </Container>
    );
  }
}

export default Landing;
