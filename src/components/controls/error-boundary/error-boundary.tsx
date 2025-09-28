import { Component, ReactNode } from 'react';
import { Alert } from 'antd';

interface Props {
	children: ReactNode;
	hideAllErrors?: boolean;
	name?: string;
}

interface State {
	error: unknown;
}

const getErrorMessage = (error: unknown) => {
	if (error instanceof Error) {
		return error.message;
	}
	if (typeof error === 'string') {
		return error;
	}
	return JSON.stringify(error);
};

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
		console.warn('caught error in', this.props.name ? this.props.name : 'unknown ErrorBoundary');
		console.error(error);
		console.error(errorInfo);

		this.setState({
			error: error
		});
	}

	render() {
		if (this.state.error) {
			if (this.props.hideAllErrors) {
				return null;
			}

			const msg = getErrorMessage(this.state.error);
			return (
				<Alert
					data-name={this.props.name || 'unknown'}
					message={msg}
					type='error'
					showIcon={true}
				/>
			);
		}

		return this.props.children;
	}
};
