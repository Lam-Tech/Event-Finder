import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Header, Button, CardGroup, Input, Dropdown, Icon } from 'semantic-ui-react';
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
      value: 'Online/Offline',
      search: [],
    };
  }

  onChange = e => {
    this.setState({ search: e.target.value.split(/[ ,]+/) });
    console.log(this.state);
  }

  onSort = (e, { value }) => this.setState({ value })

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const sortOptions = [
      {
        key: 'Online/Offline',
        text: 'Online/Offline',
        value: 'Online/Offline',
      },
      {
        key: 'Online',
        text: 'Online',
        value: 'Online',
      },
      {
        key: 'Offline',
        text: 'Offline',
        value: 'Offline',
      },
    ];

    const { value } = this.state;
    const { search } = this.state;
    const currentUser = Meteor.user().username;
    let otherEvents = this.props.event;
    otherEvents = _.reject(otherEvents, function (events) { return events.owner === currentUser; }); // filter out event created by you
    otherEvents = _.reject(otherEvents, function (events) { return _.find(events.members, function (member) { return member === currentUser; }); }); // filter out event you join
    otherEvents = _.reject(otherEvents, function (events) { return (events.pHave + (events.members.length - 1)) >= (events.maxWant + events.pHave); }); /// filter out event that is full
    if (value !== 'Online/Offline') {
      otherEvents = _.reject(otherEvents, function (events) { return events.statusType !== value; });
    }
    if (search.length > 1) {
      otherEvents = _.filter(otherEvents, function (events) {
        return _.find(search, function (searches) {
          const tags = events.tag;
          return _.contains(tags, searches.toUpperCase());
        });
      });
    }
    return (
      <Container className='pageStyle'>
        <Container fluid textAlign='center'>
          <Header as="h1" textAlign="center">Events</Header>
          <Input fluid icon="search" placeholder="Search events by tags seperated by space or comma..." onChange={this.onChange}/> <Dropdown
            selection
            options={sortOptions}
            defaultValue={sortOptions[0].value}
            value={value}
            onChange={this.onSort}
          />
          <br/><br/>
          <Button classname='create' icon as={NavLink} exact to="/addevents" color='green'><Icon name='plus'/>Create Event</Button>
        </Container>
        <br/>
        <CardGroup itemsPerRow={4}>
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
