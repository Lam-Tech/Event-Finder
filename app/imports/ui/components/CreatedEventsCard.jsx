import React from 'react';
import { Card, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

class CreatedEventsCard extends React.Component {
  render() {
    return (
      <Card color='red'>
        <Card.Content>
          <Card.Header>{this.props.event.title}</Card.Header>
          <Card.Meta>
            <span className='date'>{new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
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
        <Card.Content extra>
          <Header className='numberPeople' as='h5'>{this.props.event.pHave + (this.props.event.members.length - 1)}/{this.props.event.maxWant + this.props.event.pHave}
            <Link className='editButton' to={`/editevents/${this.props.event._id}`}>Edit</Link></Header>
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
