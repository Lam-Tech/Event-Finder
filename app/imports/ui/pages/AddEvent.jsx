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
  TextField, HiddenField,
  SelectField,
} from 'uniforms-semantic';
import { Redirect } from 'react-router-dom';
import { Event } from '../../api/Event/Event';

const bridge = new SimpleSchema2Bridge(Event.schema);

/** A simple static component to render some text for the landing page. */
class AddEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { redirectToReferer: false };
  }

  submit(data) {
    const { owner, members, tag, title, date, location, information, statusType, pHave, maxWant } = data;
    Event.collection.insert({ owner, members, tag, title, date, location, information, statusType, pHave, maxWant },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Event Created successfully', 'success');
          this.setState({ redirectToReferer: true });
        }
      });
  }

  render() {
    if (this.state.redirectToReferer) {
      return <Redirect to='/events'/>;
    }
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
              <SelectField name = "statusType" label='Status Type' placeholder='Online / Offline'/>
              <TextField name='tag' label='Tags' showInlineError={true} placeholder={'Tag'}/>
              <NumField name='pHave' decimal={false} placeholder='Amount of People Already Have' label='People Already Have'/>
              <NumField name='maxWant' decimal={false} placeholder='Amount of People Needed' label='People Needed'/>
            </Form.Group>
            <SubmitField value='Create'/>
            <ErrorsField/>
            <HiddenField name='owner' value={Meteor.user().username}/>
            <HiddenField name='members' value={[Meteor.user().username]}/>
          </Segment>
        </AutoForm>
      </Container>
    );
  }
}

export default AddEvent;
