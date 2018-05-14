import { createMuiTheme, } from "@material-ui/core/styles"
import deepPurple from "@material-ui/core/colors/deepPurple"
import indigo from "@material-ui/core/colors/indigo"

export default createMuiTheme({
  palette: {
    type: "dark",
    primary: deepPurple,
    secondary: indigo,
  },
})