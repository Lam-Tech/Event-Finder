import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Header, Button, CardGroup } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Event } from '../../api/Event/Event';
import EventsCard from '../components/EventsCard';

/** A simple static component to render some text for the landing page. */
class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prompt: false,
    };
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
      <Container>
        <Container fluid textAlign='center'>
          <Header as="h1" textAlign="center">Events</Header>
          <Button as={NavLink} exact to="/addevents">Create Event</Button>
        </Container>
        <br/>
        <CardGroup>
          {this.props.event.map((events) => <EventsCard key={events} event={events} />)}
        </CardGroup>
      </Container>
    );
  }
}

Events.propTypes = {
  event: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe(Event.userPublicationName);
  const ready = subscription.ready();
  const event = Event.collection.find({}).fetch();
  return {
    event,
    ready,
  };
})(Events);
