import React, { Component } from 'react';
import './Login.css';
import axios from 'axios'
import { connect } from 'react-redux';
import { setLogIn } from '../../actions/userActions';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: 'test@test.co.th',
      password: '1234'
    }
  }
  componentDidMount(){
  
  }

  submit = (event) => {
    event.preventDefault()
    let { email, password } = this.state
    if (email && password) {
      axios.post('http://localhost:3000/api/Users/login', { email, password }).then((res) => {
      
        let data =res.data
        this.props.setLogIn({userId:data.userId,token:data.id,create:data.created})
        window.location.href="/"
      }).catch((err) => {
       
      })
    }
  }
  emailChange = (event) => {
    this.setState({
      email: event.target.value
    })
  }
  passwordChange = (event) => {
    this.setState({
      password: event.target.value
    })
  }
  render() {
    console.log(this.props)
    return (
      <div className="App">
        <header className="App-header">

          <h1 className="App-title">Login System   Money-Daily</h1>

        </header>
        <div className="body">

          <div className="row">
            <div className="col-md-4 col-md-offset-4">
              <form onSubmit={this.submit}>
                <div className="form-group">
                  <label >Email</label>
                  <input type="email" className="form-control" placeholder="Enter email" onChange={this.emailChange} value={this.state.email} />

                </div>
                <div className="form-group">
                  <label >Password</label>
                  <input type="password" className="form-control" placeholder="Password" onChange={this.passwordChange} value={this.state.password} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>

        </div>

      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
   userInfo:state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLogIn:(data)=>dispatch(setLogIn(data))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
