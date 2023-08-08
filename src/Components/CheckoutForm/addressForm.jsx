import React, { useState, useEffect } from "react";
import {
  Input,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
  InputLabel
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import CustomTextField from "./customTextField";
import { commerce } from "../lib/commerce";
import { Link } from "react-router-dom";

const AddressForm = ({ checkoutToken, next }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");
  const methods = useForm();

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name
  }));

  const subdivisions = Object.entries(shippingSubdivisions).map(
    ([code, name]) => ({
      id: code,
      label: name
    })
  );

  const options = shippingOptions.map(sO => ({
    id: sO.id,
    label: `${sO.description} - (${sO.price.formatted_with_symbol})`
  }));
  // Object entires gives keys and values of these objects. This above code actually
  //gives array of arrays, and each array contains the key and the value for each
  //specific country, like for example ["AL", "Alabania"]

  const fetchShippingCountries = async checkoutTokenID => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenID
    );
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };
  //setShippingCountry(Object.keys(countries)[0]); this code is used to use objects as an array
  //because you can't use countries[0], this is not valid in objects.
  //.keys gonna give me keys of countries like AU for Austria, US for Amercia etc...

  const fetchShippingSubDivisions = async countryCode => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (
    checkoutTokenID,
    country,
    region = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenID,
      { country, region }
    );

    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchShippingSubDivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
  }, [shippingSubdivision]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(data =>
            next({
              ...data,
              shippingCountry,
              shippingSubdivision,
              shippingOption
            })
          )}
        >
          <Grid container spacing={3}>
            <CustomTextField
              required
              name="firstName"
              label="First name"
              autoComplete="off"
            />
            <CustomTextField
              required
              name="lastName"
              label="Last name"
              autoComplete="off"
            />
            <CustomTextField
              required
              name="address1"
              label="Address"
              autoComplete="off"
            />
            <CustomTextField
              required
              name="email"
              label="Email"
              autoComplete="off"
            />
            <CustomTextField
              required
              name="city"
              label="City"
              autoComplete="off"
            />
            <CustomTextField
              required
              name="pincode"
              label="Pincode"
              autoComplete="off"
            />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={e => setShippingCountry(e.target.value)}
              >
                {countries.map(country => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping State</InputLabel>
              <Select
                value={shippingSubdivision}
                fullWidth
                onChange={e => setShippingSubdivision(e.target.value)}
              >
                {subdivisions.map(subdivision => (
                  <MenuItem key={subdivision.id} value={subdivision.id}>
                    {subdivision.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select
                value={shippingOption}
                fullWidth
                onChange={e => setShippingOption(e.target.value)}
              >
                {options.map(option => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button component={Link} to="/cart" variant="outlined">
              Back to Cart
            </Button>
            <Button type="submmit" color="primary" variant="contained">
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;

//LEARN ABOUT HANDLESUBMIT METHOD

// import React from 'react';
// import { useForm } from 'react-hook-form';

// const MyForm = () => {
//   const { handleSubmit, register } = useForm();

//   const onSubmit = (data) => {
//     // Handle the form data here (e.g., send data to the server)
//     console.log(data);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input {...register('firstName')} />
//       <input {...register('lastName')} />
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default MyForm;
// In this example, when the user clicks the submit button, the handleSubmit method is called,
// and it automatically performs form validation. If the form data is valid, it calls the onSubmit
// function and passes the validated form data as an argument. The onSubmit function logs the form
// data to the console in this example, but in a real application, you would typically handle the
// form data according to your specific requirements, such as sending it to a server or performing
//  other actions.

//LEARN ABOUT REGISTER METHOD

// import React from 'react';
// import { useForm } from 'react-hook-form';
// We import the necessary dependencies for our form. We import React, the core library for building React components, and useForm from react-hook-form, which is a hook that provides form management and validation functionality.
// jsx
// Copy code
// const MyForm = () => {
// We define a functional component called MyForm. This component will contain our form logic and JSX for the form elements.
// jsx
// Copy code
// const { register, handleSubmit, formState } = useForm();
// We use object destructuring to extract three objects, register, handleSubmit, and formState, from the return value of the useForm hook. These objects will be used to manage form inputs, handle form submissions, and access the form state.
// jsx
// Copy code
// const onSubmit = (data) => {
//   console.log(data);
// };
// We define an onSubmit function that will be called when the form is submitted. This function takes a parameter data, which will contain the form data when the form is submitted. In this example, we simply log the data to the console, but in a real application, you would typically perform some actions with the form data, such as sending it to a server.
// jsx
// Copy code
// return (
//   <form onSubmit={handleSubmit(onSubmit)}>
//     <input {...register('firstName', { required: true })} />
//     <input {...register('lastName', { required: true })} />

//     {formState.errors.firstName && <p>Please enter your first name</p>}
//     {formState.errors.lastName && <p>Please enter your last name</p>}

//     <button type="submit">Submit</button>
//   </form>
// );
// We define the JSX for the form elements and structure the form inside the return statement.
// We use the <form> element to create the form. We attach an onSubmit event handler to the form, which is set to the handleSubmit method provided by react-hook-form. This method takes our onSubmit function as an argument and handles the form submission for us. When the form is submitted, handleSubmit will perform form validation and then call our onSubmit function with the form data if the form is valid.
// Inside the form, we define two input fields using the <input> element. We use the register method provided by react-hook-form to connect these input fields to the form instance. The register method takes the name of the input field as its first argument, and the second argument is an object containing validation rules. In this example, we set the required: true rule, which means both fields are required. If the user leaves any of the fields empty, validation errors will be displayed below the respective input fields.
// We use the formState object to check if there are any validation errors for the firstName and lastName fields. If there are errors, we display error messages prompting the user to fill in these fields.
// We include a submit button inside the form using the <button> element. When the user clicks this button, it will trigger the form submission.
// The return statement returns the JSX for the form and its elements, which will be rendered on the screen when the component is used.
