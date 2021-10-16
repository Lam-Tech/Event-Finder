import React from 'react';
import { Grid } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            Joined Event
          </Grid.Column>
          <Grid.Column>
            Created Event
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Landing;
