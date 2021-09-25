import { alpha, makeStyles } from "@material-ui/core";

export const NavbarStyle = makeStyles((theme) => ({
  flexGrow: {
    flexGrow: 1,
  },
  logoContainer: {
    display: "flex",
    flexFlow: "row wrap",
  },
  logo: {
    width: "45px",
    height: "auto",
  },
  link: {
    textDecoration: "none",
  },
  title: {
    marginLeft: theme.spacing(1),
    lineHeight: "48px",
    color: "white",
    textDecoration: "none",
  },
  // styleing navbar search
  search: {
    position: "relative",
    width: "100%",
    maxWidth: "230px",
    borderRadius: "5px",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    margin: theme.spacing(0, 1, 0, 1),
  },
  searchIcon: {
    position: "absolute",
    width: theme.spacing(4),
    height: "100%",
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: theme.spacing(4),
  },
}));
