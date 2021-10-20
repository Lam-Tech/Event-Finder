import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Button, Header, Icon, Menu } from 'semantic-ui-react';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { marginBottom: '200px' };
    return (
      <Menu className='home' secondary borderless fluid>
        {/* eslint-disable-next-line no-undef */}
        {this.props.currentUser && Roles.userIsInRole(Meteor.userId(), 'admin') === false ? (
          [
            // eslint-disable-next-line react/jsx-key
            <Menu.Item position="left "as={NavLink} activeClassName="" exact to="/home"><Header as='h3'>Event Finder<Icon name='search'/></Header></Menu.Item>,
            // eslint-disable-next-line react/jsx-key
            <Menu.Item position="right"><span><Button size={'tiny'} as={NavLink} activeClassName="" exact to="/signout" color='red' inverted>Sign Out</Button></span></Menu.Item>,
          ]
        ) : ''}
        {this.props.currentUser === '' ? (
          <Menu.Item style={menuStyle} as={NavLink} activeClassName="" exact to="/"><Header as='h3'>Event Finder<Icon name='search'/></Header></Menu.Item>
        ) : ''
        }
      </Menu>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
