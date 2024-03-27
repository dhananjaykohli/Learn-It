import React, { useReducer } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';


const SET_FIELD = 'SET_FIELD';


function reducer(state: any, action: { type: any; field: any; value: any; }) {
  switch (action.type) {
    case SET_FIELD:
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
}

const initialState = {
  fullName: '',
  city: '',
  zipCode: '',
  country: '',
};

const OnlinePaymentPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { fullName, city, zipCode, country } = state;

  const isFormValid = fullName && city && zipCode && country;

  const handleInputChange = (field: string) => (event: { target: { value: any; }; }) => {
    let value = event.target.value;

   
    if (field === 'zipCode') {
      value = value.replace(/\D/g, '');
      value = value.slice(0, 6);
    }

    dispatch({ type: SET_FIELD, field, value });
  };

  return (
    <Container
    style={{
      textAlign: 'center',
      marginTop: '25px',
      background: 'rgba(175, 219, 245, 1)',
      color: 'rgba(52, 152, 219, 1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
    }}
    >
      <Typography variant="h3" style={{ fontWeight: 'bold' }}>
        Payment
      </Typography>
      <Grid container justifyContent="center" marginTop="10px">
        <Grid>
          <IconButton style={{ fontSize: '100px', margin: '0 20px', cursor: 'pointer' }} color="primary">
            <CreditCardIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid
        container
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '10px',
        }}
      >
        <Card
          style={{
            border: '1px solid #3498db',
            borderRadius: '5px',
            padding: '20px',
            width: '45%',
            marginRight: '20px',
          }}
        >
          <CardContent>
            <Typography variant="h5" style={{ color: '#3498db', fontWeight: 'bold' }}>
              Billing Info
            </Typography>
            <form
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <TextField
                label="Full Name"
                variant="outlined"
                style={{ margin: '10px', padding: '8px', color: '#3498db', borderRadius: '5px' }}
                required
                value={fullName}
                onChange={handleInputChange('fullName')}
              />
              <TextField
                label="City"
                variant="outlined"
                style={{ margin: '10px', padding: '8px', color: '#3498db', borderRadius: '5px' }}
                required
                value={city}
                onChange={handleInputChange('city')}
              />
              <TextField
                label="Zip Code"
                variant="outlined"
                style={{ margin: '10px', padding: '8px', color: '#3498db', borderRadius: '5px' }}
                required
                value={zipCode}
                onChange={handleInputChange('zipCode')}
              />
              <TextField
                label="Country"
                variant="outlined"
                style={{ margin: '10px', padding: '8px', color: '#3498db', borderRadius: '5px' }}
                required
                value={country}
                onChange={handleInputChange('country')}
              />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: '20px',
                }}
              >
                <Button
                  component={Link}
                  to={isFormValid ? "https://rzp.io/l/Rq89SOFANo" : ""}
                  style={{
                    margin: '0 10px',
                    padding: '10px',
                    backgroundColor: '#3498db',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '10px',
                  }}
                  disabled={!isFormValid}
                >
                  Proceed
                </Button>
                <Button
                  to="/courses"
                  component={Link}
                  style={{
                    margin: '0 10px',
                    padding: '10px',
                    backgroundColor: '#3498db',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '10px',
                  }}
                >
                  Back
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Container>
  );
};

export default OnlinePaymentPage;
