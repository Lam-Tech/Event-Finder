import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, CardGroup, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { NavLink } from 'react-router-dom';
import { Event } from '../../api/Event/Event';
import JoinedEventsCard from '../components/JoinedEventsCard';

// const username = Meteor.users.findOne(this.userId).username;
/** A simple static component to render some text for the landing page. */
class JoinedEvent extends React.Component {
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
    let joinedEvents = this.props.event.filter(events => _.find(events.members, function (member) { return member === currentUser; }));
    joinedEvents = _.reject(joinedEvents, function (events) { return events.owner === currentUser; });
    return (
      <div>
        <Container>
          <Button as={NavLink} exact to="/currentuserevents" >Created Events</Button><Button as={NavLink} exact to="/joinedevents">Joined Events</Button>
          <br/><br/>
          <CardGroup>
            {joinedEvents.map((events) => <JoinedEventsCard key={events._id} event={events} />)}
          </CardGroup>
          <br/><br/><br/><br/>
        </Container>
      </div>
    );
  }
}

JoinedEvent.propTypes = {
  event: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe(Event.userPublicationName);
  const event = Event.collection.find({}).fetch();
  const ready = subscription.ready();
  return {
    event,
    ready,
  };
})(JoinedEvent);
