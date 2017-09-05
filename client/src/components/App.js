import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';

//dummy components for testing
const Header = () => <h2>Header</h2>;
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;
// end of dummy components

const App = () => {
	return (
		//place browser routes, each specifies a relation between a possible address the user can visit, and a component to display
		//BrowserRouter can only have 1 child at most
		//exact means the path must be exactly the string in path="" to show the component
		//By default, the component will be shown if the string in path="" is included in the path
		//Header must always be visible
		<div>
			<BrowserRouter>
				<div>
					<Header />
					<Route exact path="/" component={Landing} />
					<Route exact path= "/surveys" component={Dashboard} />
					<Route path="/surveys/new" component={SurveyNew} />
					
				</div>
			</BrowserRouter>
		</div>
	);
};

export default App;