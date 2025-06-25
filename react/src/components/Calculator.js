import React, { useState } from 'react';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [currentValue, setCurrentValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForSecondValue, setWaitingForSecondValue] = useState(false);

  const handleNumberClick = (value) => {
    if (display === '0' && value !== '.') {
      setDisplay(value);
    } else if (value === '.' && display.includes('.')) {
      return;
    } else {
      setDisplay(display + value);
    }
  };

  const handleOperationClick = (op) => {
    setCurrentValue(parseFloat(display));
    setOperation(op);
    setWaitingForSecondValue(true);
    setDisplay('0');
  };

  const calculateResult = () => {
    if (!currentValue || !operation) return;

    const secondValue = parseFloat(display);
    let result = 0;

    switch (operation) {
      case '+':
        result = currentValue + secondValue;
        break;
      case '-':
        result = currentValue - secondValue;
        break;
      case '*':
        result = currentValue * secondValue;
        break;
      case '/':
        if (secondValue === 0) {
          setDisplay('Error');
          return;
        }
        result = currentValue / secondValue;
        break;
      default:
        break;
    }

    setDisplay(result.toString());
    setCurrentValue(null);
    setOperation(null);
    setWaitingForSecondValue(false);
  };

  const handleClear = () => {
    setDisplay('0');
    setCurrentValue(null);
    setOperation(null);
    setWaitingForSecondValue(false);
  };

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', 'C', '+',
    '='
  ];

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
      <Paper elevation={10} sx={{ width: 320, padding: 2, backgroundColor: '#fafafa' }}>
        <Box sx={{ backgroundColor: '#333', color: '#fff', padding: 2, borderRadius: 1, textAlign: 'right', marginBottom: 2 }}>
          <Typography variant="h4">{display}</Typography>
        </Box>
        <Grid container spacing={1}>
          {buttons.map((btn) => (
            <Grid item xs={3} key={btn}>
              <Button
                fullWidth
                variant={btn === '=' ? 'contained' : 'outlined'}
                color={['+', '-', '*', '/'].includes(btn) ? 'primary' : 'default'}
                onClick={() => {
                  if (btn === 'C') handleClear();
                  else if (btn === '=') calculateResult();
                  else if (['+', '-', '*', '/'].includes(btn)) handleOperationClick(btn);
                  else handleNumberClick(btn);
                }}
                sx={{ height: 60, fontSize: 18, backgroundColor: btn === '=' ? '#1976d2' : 'transparent', color: btn === '=' ? '#fff' : 'inherit' }}
              >
                {btn}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default Calculator;
