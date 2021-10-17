import React from 'react';
import { Card, Header, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class CreatedEventsCard extends React.Component {
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
          <Button>Edit</Button>
        </Card.Content>
      </Card>
    );
  }
}

CreatedEventsCard.propTypes = {
  event: PropTypes.shape({
    owner: PropTypes.string,
    title: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    location: PropTypes.string,
    information: PropTypes.string,
    pHave: PropTypes.number,
    maxWant: PropTypes.number,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(CreatedEventsCard);
