import React from "react";
import { Link } from "react-router-dom";
import { Typography, Paper, Button } from "@mui/material";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Display a more detailed error message
      return (
        <Paper elevation={3} style={{ padding: "16px", margin: "16px" }}>
          <Typography variant="h6">Oops! Something went wrong.</Typography>
          <Typography variant="body1" paragraph>
            {this.state.error && this.state.error.toString()}
          </Typography>
          <Typography variant="body1" paragraph>
            Component Stack Trace:
          </Typography>
          <pre>
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </pre>
          <Button component={Link} to="/" variant="contained" color="primary">
            Back to Home
          </Button>
        </Paper>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
