import React from 'react';
import { Card, Header, Label, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Link, withRouter } from 'react-router-dom';
import { Event } from '../../api/Event/Event';

class CreatedEventsCard extends React.Component {

  handleClick(id) {
    Event.collection.remove(id);
  }

  render() {
    return (
      <Card color='red'>
        <Card.Content>
          <Card.Header>{this.props.event.title}</Card.Header>
          <Card.Meta>
            <span className='date'>{new Intl.DateTimeFormat('en-US', {
              dateStyle: 'full', timeStyle: 'short' }).format(this.props.event.date)}</span>
          </Card.Meta>
          <Card.Description>
            <Header as='h5'>Location: <span>{this.props.event.location}</span></Header>
            <Header as='h5'>Info</Header>
            <span>{this.props.event.information}</span>
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
          <span className='numberPeople' as='h5'>{this.props.event.pHave + (this.props.event.members.length - 1)}/{this.props.event.maxWant + this.props.event.pHave}
            {/* eslint-disable-next-line max-len */}
            <span className='statues'>{this.props.event.statusType}</span>
            <Link className='editButton' to={`/editevents/${this.props.event._id}`}>Edit</Link><Icon className='trashCan' size='small' color='red' onClick={() => this.handleClick(this.props.event._id)} name='trash'/></span>
        </Card.Content>
      </Card>
    );
  }
}

CreatedEventsCard.propTypes = {
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
export default withRouter(CreatedEventsCard);
