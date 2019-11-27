import React,{Component} from 'react';
import IssueList from './Components/issuesList';
import IssuePage from './Components/issuePage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './Components/login';
import NavbarMenu from './Components/navbar';
import SearchUserIssue from './Components/searchUserIssue';
import AddIssue from './Components/addIssue';
import Sticky from 'react-sticky-el';
import './App.css';

export default class App extends Component {
    constructor() {
      super();
        this.state = {
          logged:false,
          ID:"",
          Name:"",
          Photo:""
        };
        
    }
    
    loginUpdate = (loginData) => {
      this.setState({
        ID:loginData.ID,
        Name:loginData.Name,
        Photo:loginData.Photo,
        logged:loginData.logged
      })
      sessionStorage.setItem("logged",this.state.logged)
      sessionStorage.setItem("Name",this.state.Name)
      sessionStorage.setItem("ID",this.state.ID)
      sessionStorage.setItem("Photo",this.state.Photo)

      window.location.reload()
     
    }

    logout(){
      sessionStorage.clear()
      window.location.reload()
    }
   

    render()
    {
    return (
        <div className="App">         
         <br></br>
        
          {!sessionStorage.getItem("logged")===true?
          <div>
            <Login UserInfo ={this.loginUpdate}></Login>
            
          </div>
          :
          <>
          <Sticky className="sticky">
            <NavbarMenu></NavbarMenu>
          </Sticky>
            <Router>
              <Switch>                           
                <Route exact path="/"><IssueList></IssueList></Route>
                <Route path="/issue/:id" component={IssuePage}></Route>
                <Route path="/search" component={SearchUserIssue}></Route>
                <Route path="/addIssue" component={AddIssue}></Route>
              </Switch>
            </Router>    
            
          </>          
          }
              
        </div>
      );
    }
}

