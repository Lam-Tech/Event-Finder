import React from 'react';
import { Container, Segment, Form } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import {
  AutoForm, DateField,
  ErrorsField,
  NumField,
  LongTextField,
  SubmitField,
  TextField,
} from 'uniforms-semantic';
import { Event } from '../../api/Event/Event';

const bridge = new SimpleSchema2Bridge(Event.schema);

/** A simple static component to render some text for the landing page. */
class AddEvent extends React.Component {

  submit(data) {
    const { title, date, location, information, pHave, maxWant } = data;
    Event.collection.insert({ title, date, location, information, pHave, maxWant },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Event Created successfully', 'success');
        }
      });
  }
  // <HiddenField name="owner" value={this.owner}/>

  render() {
    return (
      <Container>
        <AutoForm schema={bridge} onSubmit={data => this.submit(data)}>
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
            <SubmitField value='Create'/>
            <ErrorsField/>
          </Segment>
        </AutoForm>
      </Container>
    );
  }
}

export default AddEvent;
