import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DashboardIcon from '@material-ui/icons/Dashboard';

import { BrowserRouter, Switch, Link } from 'react-router-dom';
import axios from 'axios';

import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import './Table.css';

import {useState, useEffect} from 'react';
 
import Login from './components/login/login';
import SignUp from './components/user/signup.component';
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/Home';
 
import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import { getToken, removeUserSession, setUserSession } from './Utils/Common';

import UserList from './components/user/user-list.component';
import EditUser from './components/user/edit-user.component';

import CreateContact from "./components/contact/create-contact.component";
import EditContact from "./components/contact/edit-contact.component";
import ContactList from "./components/contact/contact-list.component";

import CreateTask from "./components/task/create-task.component";
import EditTask from "./components/task/edit-task.component";
import TaskList from "./components/task/task-list.component";

import CreateLead from "./components/lead/create-lead.component";
import EditLead from "./components/lead/edit-lead.component";
import LeadList from "./components/lead/lead-list.component";

import CreateDeal from "./components/deal/create-deal.component";
import EditDeal from "./components/deal/edit-deal.component";


import CreateAccount from "./components/account/create-account.component";
import EditAccount from "./components/account/edit-account.component";
import AccountList from "./components/account/account-list.component";

import Profile from "./components/auth/profile.component";
import BoardUser from "./components/pages/board-user.component";
import BoardSupervisor from "./components/pages/board-supervisor.component";
import BoardAdmin from "./components/pages/board-admin.component";

import BarChart from './components/charts/BarChart.component';
import PieChart from './components/charts/PieChart.component';

import SuccessAlert from './components/alerts/successAlert';
import UserTable from './components/tables/userTable';

import SearchBar from './components/search/search';
import UList from './components/tables/userList';
import TList from './components/tables/taskList';
import CList from './components/tables/contactList';
import LList from './components/tables/leadList';
import DList from './components/tables/dealList';

//import UserPagination from './components/pagination/list';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

function App() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const [authLoading, setAuthLoading] = useState(true);
 
  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
 
    axios.get(`http://localhost:4000/verifyToken?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);
 
  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

  return (

    <div className="App">
      <BrowserRouter>
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            crm4pro
          </Typography>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
          <IconButton
              edge="end"
              aria-label="dashboard"
              aria-controls={menuId}
              aria-haspopup="true"
              button component={Link} to="/dashboard"
              color="inherit"
            >
              <DashboardIcon />
            </IconButton>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="login"
              aria-controls={menuId}
              aria-haspopup="true"
              button component={Link} to="/login"
              color="inherit"
            >
              <ExitToAppIcon />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>

    <div className="content">

              
    
            <Switch>
             
              <PublicRoute component={SignUp} path="/signup" exact/>
           
              <PublicRoute exact path={["/", "/home"]} component={Home} />
              <PublicRoute component={Login} path="/login" exact />
              <PrivateRoute component={Dashboard} path="/dashboard" exact />

              <PublicRoute path="/barchart" component={BarChart} />
              <PublicRoute path="/piechart" component={PieChart} />

              <PrivateRoute path="/edit-user/:_id" component={EditUser} />
              <PrivateRoute path="/user-list" component={UserList} />
              <PrivateRoute path="/create-contact" component={CreateContact} />
              <PrivateRoute path="/edit-contact/:_id" component={EditContact} />
              <PrivateRoute path="/contact-list" component={ContactList} />
              <PrivateRoute path="/create-task" component={CreateTask} />
              <PrivateRoute path="/edit-task/:_id" component={EditTask} />
              <PrivateRoute path="/task-list" component={TaskList} />
              <PrivateRoute path="/create-lead" component={CreateLead} />
              <PrivateRoute path="/edit-lead/:_id" component={EditLead} />
              <PrivateRoute path="/lead-list" component={LeadList} />
              <PrivateRoute path="/create-deal" component={CreateDeal} />
              <PrivateRoute path="/edit-deal/:_id" component={EditDeal} />
             
              <PrivateRoute path="/create-account" component={CreateAccount} />
              <PrivateRoute path="/edit-account/:_id" component={EditAccount} />
              <PrivateRoute path="/account-list" component={AccountList} />
              <PrivateRoute exact path={["/", "/home"]} component={Home} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute path="/user" component={BoardUser} />
              <PrivateRoute path="/sup" component={BoardSupervisor} />
              <PrivateRoute path="/admin" component={BoardAdmin} />

              <PrivateRoute path="/success-alert" component={SuccessAlert} exact/>

              <PublicRoute path="/user-table" component={UserTable} exact/>

              <PublicRoute path="/search" component={SearchBar} exact/>

              <PrivateRoute path="/ulist" component={UList} exact/>
              <PrivateRoute path="/tlist" component={TList} exact/>
              <PrivateRoute path="/clist" component={CList} exact/>
              <PrivateRoute path="/llist" component={LList} exact/>
              <PrivateRoute path="/dlist" component={DList} exact/>

              {/*<PublicRoute path="/user-pagination" component={UserPagination} exact/>*/}

            </Switch>
            
            </div>        

    </BrowserRouter>

    </div>
  );
}

export default App;