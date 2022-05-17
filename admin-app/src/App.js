import Router from './Router';
import { ErrorBoundary } from 'react-error-boundary';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
	styles: {
		global: {
			'html, body, #root': {
				fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
				height: '100%',
			},
		},
	},
	colors: {
		blue: {
			500: 'rgb(59,130,246)',
		},
	},
});

function App() {
	function ErrorFallback({ error, resetErrorBoundary }) {
		return (
			<div role='alert'>
				<p>Something went wrong:</p>
				<pre>{error.message}</pre>
				<button onClick={resetErrorBoundary}>Try again</button>
			</div>
		);
	}
	return (
		<>
			<ChakraProvider theme={theme}>
				<Router />
			</ChakraProvider>{' '}
		</>
	);
}

export default App;
