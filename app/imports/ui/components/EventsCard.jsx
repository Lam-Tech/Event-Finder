import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Header, Button, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { _ } from 'meteor/underscore';
import swal from 'sweetalert';
import { Event } from '../../api/Event/Event';

class EventsCard extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const _id = this.props.event._id;
    const members = Meteor.user().username;
    Event.collection.update(_id, { $addToSet: { members } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Joined event successfully', 'success')));
  }

  render() {
    return (
      <Card color='green'>
        <Card.Content>
          <Card.Header>{this.props.event.title}</Card.Header>
          <Card.Meta>
            <span className='date'>{new Intl.DateTimeFormat('en-US', {
              dateStyle: 'full', timeStyle: 'short' }).format(this.props.event.date)}</span>
          </Card.Meta>
          <Card.Description>
            <Header as='h5'>Location: {this.props.event.location}</Header>
            <Header as='h5'>Info</Header>
            {this.props.event.information}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Header as='h5'>Tags{_.map(this.props.event.tag,
            (tag, index) => <Label key={index} size='tiny' color='black'>{tag}</Label>)}</Header>
        </Card.Content>
        <Card.Content extra>
          <Header as='h5'>Members{_.map(this.props.event.members,
            (member, index) => <Label key={index} size='tiny' color='black'>{member}</Label>)}</Header>
        </Card.Content>
        <Card.Content extra>
          <Header className='numberPeople' as='h5'>{this.props.event.pHave + (this.props.event.members.length - 1)}/{this.props.event.maxWant + this.props.event.pHave}
            <span className='statues'>{this.props.event.statusType}</span><Button className='joinButton' basic size='tiny' onClick={this.handleClick} color='green'>  Join  </Button></Header>
        </Card.Content>
      </Card>
    );
  }
}

EventsCard.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string,
    owner: PropTypes.string,
    members: PropTypes.array,
    title: PropTypes.string,
    tag: PropTypes.array,
    date: PropTypes.instanceOf(Date),
    location: PropTypes.string,
    information: PropTypes.string,
    statusType: PropTypes.string,
    pHave: PropTypes.number,
    maxWant: PropTypes.number,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(EventsCard);
