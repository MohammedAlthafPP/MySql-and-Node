import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { logout } from "../../Redux/actions/userAction";
import { toast } from "react-toastify";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //const [anchorEl, setAnchorEl] = React.useState(null);

  const { isAuthenticated } = useSelector((state) => state.user);

  function logoutUser() {
    dispatch(logout());
    toast.success("Logout Successfully");
  }

  const HomeHandler = () => {
    navigate("/");
  };

  const handleMenu = (event) => {
    // setAnchorEl(event.currentTarget);
  };

  const AccountHandler = () => {
    if (isAuthenticated) {
      navigate("/user/success");
    } else {
      navigate("/user/login");
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={HomeHandler}
            style={{ cursor: "pointer" }}
          >
            Mysql
          </Typography>

          <div onClick={AccountHandler}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              {isAuthenticated && isAuthenticated ? (
                <Button onClick={logoutUser} style={{ color: "white" }}>
                  Logout
                </Button>
              ) : (
                <AccountCircle />
              )}
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
