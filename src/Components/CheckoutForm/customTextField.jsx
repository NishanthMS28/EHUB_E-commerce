import React from "react";
import { TextField, Grid } from "@material-ui/core";
import { useFormContext, Controller } from "react-hook-form";

const CustomTextField = ({ name, label, required }) => {
  const { control } = useFormContext();

  return (
    <Grid item xs={12} sm={6}>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField {...field} fullWidth label={label} required={required} />
        )}
      />
    </Grid>
  );
};

export default CustomTextField;

// import React from "react";
// import { TextField, Grid } from "@material-ui/core";
// import { useFormContext, Controller } from "react-hook-form";
// We start by importing the required dependencies. We import React for creating React components, TextField and Grid from @material-ui/core for styling the input component, and useFormContext and Controller from react-hook-form.
// jsx
// Copy code
// const CustomTextField = ({ name, label, required }) => {
//   const { control } = useFormContext();

//   return (
//     <Grid item xs={12} sm={6}>
//       <Controller
//         as={TextField}
//         control={control}
//         fullWidth
//         name={name}
//         label={label}
//         required={required}
//       />
//     </Grid>
//   );
// };
// We define a functional component called CustomTextField. This component receives three props: name, label, and required. These props are used to configure the behavior and appearance of the custom text field.

// Inside the component, we use the useFormContext hook to access the form context and methods from the parent FormProvider. This allows us to access the same form methods (control, handleSubmit, etc.) without needing to pass them down as props explicitly. In this case, we only need control to manage the input state.

// We return JSX, which renders the custom text field using TextField from @material-ui/core and Controller from react-hook-form.

// jsx
// Copy code
// <Grid item xs={12} sm={6}>
//   <Controller
//     as={TextField}
//     control={control}
//     fullWidth
//     name={name}
//     label={label}
//     required={required}
//   />
// </Grid>
// We use the <Grid> component from @material-ui/core to create a responsive grid layout for the custom text field. In this example, the custom text field occupies 12 columns in extra-small (xs) screen sizes and 6 columns in small (sm) screen sizes.

// We use the <Controller> component from react-hook-form to integrate the TextField into the form. The <Controller> component takes several props:

// as: The as prop specifies the component or element that we want to use as the custom input. In this case, we pass TextField, which means the TextField component from @material-ui/core will be used for the input.

// control: The control prop is set to control from the useFormContext hook. This tells Controller to use the form control methods provided by react-hook-form to manage the input state.

// name: The name prop specifies the name of the input field. It is used to associate the input with its corresponding data in the form state.

// label: The label prop specifies the label text for the input.

// required: The required prop is a boolean flag that determines whether the input is required or not.

// By using the Controller component, the custom text field becomes part of the react-hook-form form and benefits from form state management, validation, and form submission handling. The TextField component will automatically update the form state as the user interacts with the input, and validation errors will be displayed if the input fails validation based on the rules defined in the parent form.

// The custom text field is wrapped in the <Grid> component to style and arrange it within a grid layout. The <Grid> component is part of the Material-UI library and allows for easy and responsive grid-based layouts. In this example, we use the xs={12} and sm={6} props to specify the number of columns the custom text field should occupy on different screen sizes.
