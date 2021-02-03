import React, { Component } from "react";
import ErrorContainer from "./ErrorContainer";

export default class ChartErrorWrapper extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return <ErrorContainer />;
    return this.props.children;
  }
}
