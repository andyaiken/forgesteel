/* eslint-disable @typescript-eslint/no-explicit-any */

import { Component, ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

interface State {
	error: unknown;
}

export class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			error: null
		};
	}

	static getDerivedStateFromError(error: any) {
		return {
			error: error
		};
	}

	componentDidCatch(error: any, errorInfo: any) {
		console.error(error);
		console.error(errorInfo);

		this.setState({
			error: error
		});
	}

	render() {
		if (this.state.error) {
			return (
				<div>
					{JSON.stringify(this.state.error)}
				</div>
			);
		}

		return this.props.children;
	}
};
