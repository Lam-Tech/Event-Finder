import React from 'react';
import { Card, Header, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router-dom';
import { Event } from '../../api/Event/Event';
import swal from 'sweetalert';

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
      <Card>
        <Card.Content>
          <Card.Header>{this.props.event.title}</Card.Header>
          <Card.Meta>
            <span className='date'>{new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }).format(this.props.event.date)}</span>
          </Card.Meta>
          <Card.Description>
            <Header as='h5'>Location</Header>
            {this.props.event.location}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Header as='h5'>Info</Header>
          {this.props.event.information}
        </Card.Content>
        <Card.Content extra>
          <Header as='h5'>{this.props.event.pHave}/{this.props.event.maxWant}</Header>
          <Button onClick={this.handleClick}>Opt-Out</Button>
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
    pHave: PropTypes.number,
    maxWant: PropTypes.number,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(JoinedEventsCard);
