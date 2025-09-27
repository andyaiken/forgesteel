import { Component, ReactNode } from 'react';
import { Alert } from 'antd';

interface Props {
	children: ReactNode;
}

interface State {
	error: unknown;
}

function getErrorMessage(error: unknown) {
	if (error instanceof Error) {
		return error.message;
	}
	if (typeof error === 'string') {
		return error;
	}
	return JSON.stringify(error);
}

export class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			error: null
		};
	}

	static getDerivedStateFromError(error: unknown) {
		return {
			error: error
		};
	}

	componentDidCatch(error: unknown, errorInfo: unknown) {
		console.error(error);
		console.error(errorInfo);

		this.setState({
			error: error
		});
	}

	render() {
		if (this.state.error) {
			const msg = getErrorMessage(this.state.error);
			return (
				<Alert message={msg} type='error' showIcon />
			);
		}

		return this.props.children;
	}
};
