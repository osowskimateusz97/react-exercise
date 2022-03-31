import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'normalize.css';
import { ProvideAuth } from './hook/useAuth';
import { BrowserRouter as Router } from 'react-router-dom';
ReactDOM.render(
	<React.StrictMode>
		<Router>
			<ProvideAuth>
				<App />
			</ProvideAuth>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
);
