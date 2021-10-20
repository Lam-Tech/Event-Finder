import React from 'react';
import { Loader, Segment, Form, Container, Button, Header } from 'semantic-ui-react';
import swal from 'sweetalert';
import {
  AutoField,
  AutoForm,
  DateField,
  ErrorsField,
  HiddenField, LongTextField,
  NumField, SelectField,
  SubmitField,
  TextField,
} from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { NavLink, Redirect } from 'react-router-dom';
import { Event } from '../../api/Event/Event';

const bridge = new SimpleSchema2Bridge(Event.schema);

/** Renders the Page for editing a single document. */
class EditEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { redirectToReferer: false };
  }

  // On successful submit, insert the data.
  submit(data) {
    const { owner, title, date, location, information, tag, pHave, maxWant, _id } = data;
    Event.collection.update(_id, { $set: { owner, title, date, location, information, tag, pHave, maxWant } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Event updated successfully', 'success')));
    this.setState({ redirectToReferer: true });
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const menuStyle = { marginTop: '100px' };
    if (this.state.redirectToReferer) {
      return <Redirect to='/currentuserevents'/>;
    }
    return (
      <Container style={menuStyle} textAlign='center'>
        <Header as='h1'>Editing Event</Header>
        <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
          <Segment>
            <Form.Group widths={'equal'}>
              <TextField name='title' placeholder='Basketball' label='Event Title'/>
              <DateField name='date' placeholder='MM/DD/YYYY' label='Date'/>
              <TextField name='location' placeholder='Address' label='Location'/>
            </Form.Group>
            <Form.Group widths={'equal'}>
              <LongTextField name='information' placeholder='Extra info people need to know to join' label='Info'/>
              <AutoField name='tag' label='Tag'/>
            </Form.Group>
            <Form.Group widths='equal'>
              <SelectField name = "statusType" label='Status Type' placeholder='Online / Offline'/>
              <NumField name='pHave' decimal={false} placeholder='Amount of People Already Have' label='People Already Have'/>
              <NumField name='maxWant' decimal={false} placeholder='Amount of People Needed' label='People Needed'/>
            </Form.Group>
            <SubmitField color='red' value='Update'/>
            <Button color='red' as={NavLink} exact to="/currentuserevents">Cancel</Button>
            <ErrorsField/>
            <HiddenField name='owner' value={Meteor.user().username}/>
          </Segment>
        </AutoForm>
      </Container>
    );
  }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
EditEvent.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Event.userPublicationName);
  // Determine if the subscription is ready
  // Get the document
  return {
    doc: Event.collection.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditEvent);
