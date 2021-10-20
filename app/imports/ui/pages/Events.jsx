import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Header, Button, CardGroup, Input } from 'semantic-ui-react';
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
      search: [],
    };
  }

  onchange = e => {
    this.setState({ search: e.target.value.split(/[ ,]+/) });
    console.log(this.state);
  }

  handleClick = () => this.setState((prevState) => ({ active: !prevState.active }))

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const { active } = this.state;
    const { search } = this.state;
    const currentUser = Meteor.user().username;
    let otherEvents = this.props.event;
    otherEvents = _.reject(otherEvents, function (events) { return events.owner === currentUser; });
    otherEvents = _.reject(otherEvents, function (events) { return _.find(events.members, function (member) { return member === currentUser; }); });
    otherEvents = _.reject(otherEvents, function (events) { return (events.pHave + (events.members.length - 1)) >= (events.maxWant + events.pHave); });
    if (search.length > 1) {
      otherEvents = _.filter(otherEvents, function (events) {
        return _.find(search, function (searchs) {
          const tags = events.tag;
          _.each(tags, function (lowerTag) { lowerTag.toLowerCase(); });
          return _.contains(tags, searchs.toLowerCase());
        });
      });
    }
    return (
      <Container>
        <Container fluid textAlign='center'>
          <Header as="h1" textAlign="center">Events</Header>
          <Input icon="search" placeholder="Search events by tags seperated by space or comma..." onChange={this.onchange}/>
          <Button as={NavLink} exact to="/addevents" color='green'>Create Event</Button>
          <Button toggle active={active} onClick={this.handleClick}>
            Online
          </Button>
        </Container>
        <br/>
        <CardGroup>
          {otherEvents.map((events) => <EventsCard key={events._id} event={events} />)}
        </CardGroup>
        <br/><br/><br/><br/>
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
