import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";


function Header() {
  return (
    <AppBar position="sticky">
      <Toolbar >
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Spacetagram
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
export default Header;