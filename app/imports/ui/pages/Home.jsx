import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header, Container } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <Container textAlign='center' fluid>
        <Header as='h1'>Hello!</Header>
        <Header as='h2'>{Meteor.user().username}</Header>
        <Header as='h2'>How are you feeling Today?</Header>
      </Container>
    );
  }
}

export default Landing;
