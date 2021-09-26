import { makeStyles, alpha } from "@material-ui/core";

export const NavbarStyle = makeStyles((theme) => ({
  grow: {
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
  //search box
  search: {
    width: "100%",
    maxWidth: "230px",
    margin: theme.spacing(0, 1),
    position: "relative",
    borderRadius: "4px",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
  },
  searchIcon: {
    position: "absolute",
    padding: theme.spacing(0, 1),
    width: theme.spacing(4),
    height: "100%",
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(5),
  },

  infoMsg: {
    width: "100%",
    position: "absolute",
    bottom: "-20px",
    left: "0px",
    backgroundColor: "#00bcd4",
  },
}));
