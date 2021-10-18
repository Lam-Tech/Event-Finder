import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Header, Button, CardGroup } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
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
    const currentUser = Meteor.user().username;
    let ownEvents = this.props.event;
    ownEvents = _.reject(ownEvents, function (events) { return events.owner === currentUser; });
    ownEvents = _.reject(ownEvents, function (events) { return _.find(events.members, function (member) { return member === currentUser; }); });
    ownEvents = _.reject(ownEvents, function (events) { return (events.pHave + (events.members.length - 1)) >= (events.maxWant + events.pHave); });
    return (
      <Container>
        <Container fluid textAlign='center'>
          <Header as="h1" textAlign="center">Events</Header>
          <Button as={NavLink} exact to="/addevents" color='Yellow'>Create Event</Button>
        </Container>
        <br/>
        <CardGroup>
          {ownEvents.map((events) => <EventsCard key={events._id} event={events} />)}
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
