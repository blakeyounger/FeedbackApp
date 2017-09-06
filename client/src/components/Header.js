//

import React, { Component } from 'react';
import { connect } from 'react-redux';
class Header extends Component {
	renderContent() {
		switch(this.props.auth) {
			//login status pending
			case null:
				return;
			//not logged in
			case false: 
				return <li><a href="/auth/google">Login With Google</a></li>;
					
			//logged in
			default: 
				return <li><a>Logout</a></li>;
		}
	}

	render() {
		return(
			<nav>
			    <div className="nav-wrapper">
			      <a href="#" className="left brand-logo">Feedback App</a>
			      <ul className="right">
			        {this.renderContent()}
			      </ul>
			    </div>
			</nav>
		);
	}
}
function mapStateToProps({ auth }) {
	return { auth };
}
export default connect(mapStateToProps) (Header);