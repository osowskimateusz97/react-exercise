import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'normalize.css';
import { ProvideAuth } from './hook/useAuth';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<Provider store={store}>
				<ProvideAuth>
					<App />
				</ProvideAuth>
			</Provider>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
);
