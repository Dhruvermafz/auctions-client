import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CopyAllIcon from '@mui/icons-material/CopyAll';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CopyText = ({ title, elementRef, ...rest }) => {
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);

  const copyText = async () => {
    const element = elementRef.current;
    const text = element.innerText || element.textContent || element.value;

    try {
      await navigator.clipboard.writeText(text);
      setSnackbarOpen(true);
    } catch (error) {
      console.error(error);
      // Handle error here if needed
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Tooltip title={title}>
        <IconButton
          color="secondary"
          aria-label="Copy Text"
          onClick={copyText}
          {...rest}
        >
          <CopyAllIcon />
        </IconButton>
      </Tooltip>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={2000} // Adjust the duration as needed
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          Copied to clipboard!
        </Alert>
      </Snackbar>
    </>
  );
};

export default CopyText;

CopyText.defaultProps = {
  title: 'Copy',
};
