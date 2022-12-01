import React from 'react';
import { IconButton, Container, FormControl, Input, InputAdornment, Select, MenuItem } from '@mui/material';
import { ArrowBack, Person, Email, Lock, AddAPhoto, Visibility, VisibilityOff, PhotoCamera } from '@mui/icons-material';

import '../../assets/styles/AddUser.css';
import '../../assets/styles/DetailUser.css';

class AddUser extends React.Component {
  state = {
    fullname: '',
    email: '',
    password: '',
    repassword: '',
    showPassword: false,
    showRepassword: false,
    setRole: 0,
  };

  inputHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: value });
  };

  handleClickShowPassword = () => {
    this.setState({
      ...this.state,
      showPassword: !this.state.showPassword,
    });
  };

  handleClickShowRepassword = () => {
    this.setState({
      ...this.state,
      showRepassword: !this.state.showRepassword,
    });
  };

  handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  handleChange = (event, value) => {
    this.setState({ ...this.state, withPassword: true });
  };

  handleRoleChange = (event) => {
    this.setState({ ...this.state, setRole: event.target.value });
  };

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <Container maxWidth="xs" sx={{ backgroundColor: 'white' }}>
        <div className="adduser-main">
          <div className="adduser-banner">
            <IconButton onClick={this.goBack}>
              <ArrowBack />
            </IconButton>
            <div className="adduser-banner-text">Add New User</div>
          </div>
          <div className="adduser-avatar">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
              sx={{ marginLeft: '180px', width: '40px', marginBottom: '-30px' }}>
              <input hidden accept="image/*" type="file" />
              <PhotoCamera />
            </IconButton>

            <img
              className="adduser-avatar-photo"
              src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc="
              alt=""
            />
          </div>
          <div className="adduser-form">
            <FormControl variant="standard" className="adduser-form-input">
              <Input
                name="email"
                onChange={this.inputHandler}
                value={this.state.email}
                id="input-with-icon-adornment"
                sx={{ padding: '7px', border: 'none' }}
                startAdornment={
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                }
                placeholder="Fullname"
              />
            </FormControl>

            <FormControl variant="standard" className="adduser-form-input">
              <Input
                name="email"
                onChange={this.inputHandler}
                value={this.state.email}
                id="input-with-icon-adornment"
                sx={{ padding: '7px', border: 'none' }}
                startAdornment={
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                }
                placeholder="Email"
              />
            </FormControl>

            <FormControl variant="standard" className="adduser-form-input">
              <Input
                name="password"
                onChange={this.inputHandler}
                value={this.state.password}
                id="input-with-icon-adornment"
                sx={{ padding: '7px' }}
                type={this.state.showPassword ? 'text' : 'password'}
                startAdornment={
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={this.handleClickShowPassword}
                      onMouseDown={this.handleMouseDownPassword}
                      edge="end">
                      {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                placeholder="Password"
              />
            </FormControl>

            <FormControl variant="standard" className="adduser-form-input">
              <Input
                name="repassword"
                onChange={this.inputHandler}
                value={this.state.repassword}
                id="input-with-icon-adornment"
                sx={{ padding: '7px' }}
                type={this.state.showRepassword ? 'text' : 'password'}
                startAdornment={
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={this.handleClickShowRepassword}
                      onMouseDown={this.handleMouseDownPassword}
                      edge="end">
                      {this.state.showRepassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                placeholder="Re-enter Password"
              />
            </FormControl>

            <Select
              sx={{ width: '390px' }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={this.state.setRole}
              className="apc-card-icon-select"
              onChange={this.handleRoleChange}>
              <MenuItem value={0}>
                <em>Choose Role</em>
              </MenuItem>
              <MenuItem value={1}>Super Admin</MenuItem>
              <MenuItem value={2}>Admin Warehouse A</MenuItem>
              <MenuItem value={3}>Admin Warehouse B</MenuItem>
              <MenuItem value={4}>Admin Warehouse C</MenuItem>
            </Select>
          </div>

          <div className="adduser-button">
            <button class="adduser-button-2">Add User</button>
          </div>
        </div>
      </Container>
    );
  }
}

export default AddUser;
