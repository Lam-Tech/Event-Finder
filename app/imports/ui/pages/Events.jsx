import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Header, Button, CardGroup } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { AutoForm, SubmitField } from 'uniforms-semantic';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Tag } from '../../api/Event/Tag';
import EventsCard from '../components/EventsCard';

/** A simple static component to render some text for the landing page. */
const bridge = new SimpleSchema2Bridge(Tag.schema);
class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prompt: false,
    };
  }

  // eslint-disable-next-line no-unused-vars
  submit(data) {
  }

  handleClick = () => this.setState((prevState) => ({ active: !prevState.active }))

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const { active } = this.state;
    const currentUser = Meteor.user().username;
    let ownEvents = this.props.event;
    ownEvents = _.reject(ownEvents, function (events) { return events.owner === currentUser; });
    ownEvents = _.reject(ownEvents, function (events) { return _.find(events.members, function (member) { return member === currentUser; }); });
    ownEvents = _.reject(ownEvents, function (events) { return (events.pHave + (events.members.length - 1)) >= (events.maxWant + events.pHave); });
    return (
      <Container>
        <Container fluid textAlign='center'>
          <Header as="h1" textAlign="center">Events</Header>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)}>
            <input name='tag' label='Tags' placeholder={'Tag'}/>
            <span></span>
            <SubmitField value='Search'/>
          </AutoForm>
          <br/>
          <Button as={NavLink} exact to="/addevents" color='green'>Create Event</Button>
          <Button toggle active={active} onClick={this.handleClick}>
            Online
          </Button>
        </Container>
        <br/>
        <CardGroup>
          {ownEvents.map((events) => <EventsCard key={events._id} event={events} />)}
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
  const subscription = Meteor.subscribe(Tag.userPublicationName);
  const ready = subscription.ready();
  const event = Tag.collection.find({}).fetch();
  return {
    event,
    ready,
  };
})(Events);
