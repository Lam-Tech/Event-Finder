import React from 'react';
import { Card, Header, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import { Event } from '../../api/Event/Event';

class JoinedEventsCard extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
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
              dateStyle: 'full', timeStyle: 'long',
            }).format(this.props.event.date)}</span>
            <span>{this.props.event.statusType}</span>
          </Card.Meta>
          <Card.Description>
            <Header as='h5'>Location</Header>
            {this.props.event.location}
            <Header as='h5'>Info</Header>
            {this.props.event.information}
          </Card.Description>
        </Card.Content>
        <Card.Content extra centered>
          <Header className='numberPeople' as='h5'>{this.props.event.pHave + (this.props.event.members.length - 1)}/{this.props.event.maxWant + this.props.event.pHave}
            <Button className='buttonTo' basic size='tiny' onClick={this.handleClick} color='red'>Opt-Out</Button></Header>
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
