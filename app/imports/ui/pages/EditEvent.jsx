import React from 'react';
import { Loader, Segment, Form, Container } from 'semantic-ui-react';
import swal from 'sweetalert';
import {
  AutoForm,
  DateField,
  ErrorsField,
  HiddenField, LongTextField,
  NumField,
  SubmitField,
  TextField,
} from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Event } from '../../api/Event/Event';

const bridge = new SimpleSchema2Bridge(Event.schema);

/** Renders the Page for editing a single document. */
class EditEvent extends React.Component {

  // On successful submit, insert the data.
  submit(data) {
    const { owner, title, date, location, information, pHave, maxWant } = data;
    const _id = Event.collection.findOne({ owner })._id;
    Event.collection.update(_id, { $set: { owner, title, date, location, information, pHave, maxWant } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Event updated successfully', 'success')));
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
      <Container>
        <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
          <Segment>
            <Form.Group widths={'equal'}>
              <TextField name='title' placeholder='Basketball' label='Event Title'/>
              <DateField name='date' placeholder='MM/DD/YYYY' label='Date'/>
              <TextField name='location' placeholder='Address' label='Location'/>
            </Form.Group>
            <LongTextField name='information' placeholder='Extra info people need to know to join' label='Info'/>
            <Form.Group widths='equal'>
              <NumField name='pHave' decimal={false} placeholder='# People it have' label='# People'/>
              <NumField name='maxWant' decimal={false} placeholder='Max People Needed' label='People Needed'/>
            </Form.Group>
            <SubmitField value='Update'/>
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
  const ready = subscription.ready();
  // Get the document
  const doc = Event.collection.findOne(documentId);
  return {
    doc,
    ready,
  };
})(EditEvent);
