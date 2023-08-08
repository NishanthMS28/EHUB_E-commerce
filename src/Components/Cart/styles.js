import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  //When applied to a <div> element with the class name toolbar, this style would typically add
  //the necessary CSS properties to create a consistent and visually pleasing toolbar appearance
  title: {
    margin: "2% 0%"
  },
  emptyButton: {
    minWidth: "150px",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "5px"
    },
    [theme.breakpoints.up("xs")]: {
      marginRight: "20px"
    }
  },
  checkoutButton: {
    minWidth: "150px"
  },
  link: {
    textDecoration: "none"
  },
  cardDetails: {
    display: "flex",
    marginTop: "10%",
    width: "100%",
    justifyContent: "space-between"
  },
  container: {
    padding: "0% 10%"
  }
}));
