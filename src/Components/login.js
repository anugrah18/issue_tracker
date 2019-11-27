import React, {Component} from 'react'
import { runInThisContext } from 'vm';

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            id_input:"",
            pw_input:"",
            ID:"",
            Name:"",
            Photo:"",
            backendServer : 'https://backend-for-issuetracker.herokuapp.com/',
            errorMessage :""            
        }
    }
    
    handleIdChange(e){
        this.setState({id_input:e.target.value})
        
    }

    handlePwChange(e){
        this.setState({pw_input:e.target.value})
    }

    sendData = () => {
        this.props.UserInfo({"ID":this.state.ID, "Name":this.state.Name, "Photo":this.state.Photo, "logged":true})
    }


    login(event){
        event.preventDefault();
        this.id= this.state.id_input;
        this.password = this.state.pw_input;
        

        fetch(this.state.backendServer+"user/"+this.id+"&"+this.password)
        .then(response => response.json())
        .then((data)=>{
            console.log(data)
            
            if(data.length!==0)
            {
                this.setState({
                ID:data[0].ID,
                Name:data[0].Name,
                Photo:data[0].Photo,
                errorMessage:""                
                })   

                this.sendData();
            } 
            if(data.length==0){
                
                this.setState({
                    ID:"",
                    Name:"",
                    Photo:"",
                    errorMessage:"Please check your credentials"
                })
            }      
                                 
        })
        .catch(console.log("No user found"))
        
    }


    render(){
        return(
            <div className="Login-Form">
                <form>
                    <div className="form-group">
                        <label>ID</label>
                        <br></br>
                        <input type="text" placeholder="EMP00001" className="id"  value = {this.state.id_input} onChange={(event)=>this.handleIdChange(event)}></input>
                    </div>
                    
                    <div className="form-group">
                        <label>Password</label>
                        <br></br>
                        <input type="password" className="pw" placeholder="password" value = {this.state.pw_input} onChange={(event)=>this.handlePwChange(event)}></input>
                    </div>
                    <button type="submit" className="btn btn-info" onClick={(event) => this.login(event)}>Login</button>
                </form>
                
                <p className="text-danger">{this.state.errorMessage}</p>

            </div>
            
        )
    }
}
