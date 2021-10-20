import React from 'react';
import { Card, Header, Button, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router-dom';
import { _ } from 'meteor/underscore';
import swal from 'sweetalert';
import { Event } from '../../api/Event/Event';

class JoinedEventsCard extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  color(member) {
    if (member === this.props.event.owner) {
      return 'green';
    }
    return 'teal';
  }

  handleClick() {
    const _id = this.props.event._id;
    const members = Meteor.user().username;
    Event.collection.update(_id, { $pull: { members } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Opt-out event successfully', 'success')));
  }

  render() {
    return (
      <Card color='yellow'>
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
            (member, index) => <Label key={index} size='tiny' color={this.color(member)}>{member}</Label>)}</Header>
        </Card.Content>
        <Card.Content extra centered>
          <Header className='numberPeople' as='h5'>{this.props.event.pHave + (this.props.event.members.length - 1)}/{this.props.event.maxWant + this.props.event.pHave}
            <span className='statues'>{this.props.event.statusType}</span><Button className='buttonTo' basic size='tiny' onClick={this.handleClick} color='red'>Opt-Out</Button></Header>
        </Card.Content>
      </Card>
    );
  }
}

JoinedEventsCard.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string,
    owner: PropTypes.string,
    members: PropTypes.array,
    tag: PropTypes.array,
    title: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    location: PropTypes.string,
    information: PropTypes.string,
    statusType: PropTypes.string,
    pHave: PropTypes.number,
    maxWant: PropTypes.number,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(JoinedEventsCard);
