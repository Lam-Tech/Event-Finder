import React from 'react';
import { Container, Segment, Form } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import {
  AutoForm, DateField,
  ErrorsField,
  HiddenField,
  NumField,
  LongTextField,
  SubmitField,
  TextField,
} from 'uniforms-semantic';
import { Event } from '../../api/Event/Event';

const bridge = new SimpleSchema2Bridge(Event.schema);

/** A simple static component to render some text for the landing page. */
class AddEvent extends React.Component {
  constructor(props) {
    super(props);
    this.owner = Meteor.user().username;
    this.card = '';
  }

  submit(data) {
    const { owner, ownerName, title, date, location, information, pHave, maxWant } = data;
    Event.collection.insert({ owner, ownerName, title, date, location, information, pHave, maxWant },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Profile updated successfully', 'success');
        }
      });
  }

  render() {
    return (
      <Container>
        <AutoForm schema={bridge} onSubmit={data => this.submit(data)}>
          <Segment>
            <Form.Group widths={'equal'}>
              <TextField name='EventTitle' placeholder='Basketball' label='Event Title'/>
              <DateField name='Date' placeholder='MM/DD/YYYY' label='Date'/>
              <TextField name='Location' placeholder='Address' label='Location'/>
            </Form.Group>
            <LongTextField name='Information' placeholder='Extra info people need to know to join' label='Info'/>
            <Form.Group widths={'equal'}>
              <NumField name='pHave' decimal={false} placeholder='# People it have' label='# People'/>
              <NumField name='maxWant' decimal={false} placeholder='Max People Needed' label='People Needed'/>
            </Form.Group>
            <SubmitField value='Create'/>
            <ErrorsField/>
            <HiddenField name="owner" value={this.owner}/>
          </Segment>
        </AutoForm>
      </Container>
    );
  }
}

export default AddEvent;
