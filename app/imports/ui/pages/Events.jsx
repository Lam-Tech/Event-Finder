import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card, Header, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Event } from '../../api/Event/Event';
import { EventCard } from '../components/EventsCard';
import { NavLink } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Events extends React.Component {
  constructor(props) {
    super(props);
    this.owner = Meteor.user().username;
    this.state = {
      prompt: false,
    };
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
      <div>
        <Header as="h1" textAlign="center">Events</Header>
        <Container>
          <Button as={NavLink} exact to="/addevents">Create Event</Button>
          <Card.Group>
            {this.props.event.map((event) => <EventCard key={event._id} event={event} />)}
          </Card.Group>
        </Container>
      </div>
    );
  }
}

Events.propTypes = {
  event: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Event.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const event = Event.collection.find({}).fetch();
  return {
    event,
    ready,
  };
})(Events);
