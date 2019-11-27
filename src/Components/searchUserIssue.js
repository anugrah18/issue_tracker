import React, {Component} from 'react'

export default class SearchUserIssue extends Component{
    constructor(props){
        super(props);
        this.state = {
            searchId:"",
            backendServer: 'https://backend-for-issuetracker.herokuapp.com/',
            userData:[],
            searched:false,
        }
    }

    searchEmployee(event){
        event.preventDefault();
        fetch(this.state.backendServer +"affectedUser/" +this.state.searchId)
        .then(response=>response.json())
        .then((data)=>{
            this.setState({
                userData:data,
                searched:true
            })            
        })
        .catch(console.log)
    }

    handleChangeEmployeeID(event){
        this.setState({
            searchId:event.target.value
        })
        

    }



    render(){
        return(
            <div className="searchBox">
                
                <form className="form">
                    <div className="container">
                        <div className="row">
                            <div className="col-md">
                                <input className="form-control" type="text" placeholder="Search" aria-label="Search" value={this.state.searchId}
                                onChange={(event)=>this.handleChangeEmployeeID(event)}/>
                            </div>
                            <div className="col-md-auto">
                                <i className="fa fa-search" aria-hidden="true"></i>
                            </div>                           
                        </div>
                    </div>
                    <br/>   
                    <button className="btn btn-info btn-sm my-0" type="submit" onClick={(event)=>this.searchEmployee(event)}>Search by employee </button>                 
                </form>
                <br></br>
                {
                    this.state.userData.length>0 ?
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Issue ID</th>
                                <th>Issue Title</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.userData.map((issue)=>(
                            <tr>
                                <td><a href={"/issue/"+issue.issueId}>{issue.issueId}</a></td>
                                <td>{issue.issueTitle}</td>
                            </tr>
                            ))}
                        </tbody>
                   </table>
                </div>
                :
                    this.state.searched?<p>No Issues found for associated user</p>:<p></p>                    
                }

              
            </div>
        )
    }
}