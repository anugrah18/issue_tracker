import React ,{Component} from 'react'


export default class AddIssue extends Component{
    constructor(props){
        super(props);
        this.state = {             
            backendServer: 'https://backend-for-issuetracker.herokuapp.com/',
            currentIssueID:"",            
            currentIssueTitle:"",
            currentIssueDescription:"",
            currentIssueCategory:"",
            currentIssueSubmittedBy:"",
            currentIssueDateOfCreation:"",
            currentIssueExpectedCompletionDate:"",
            currentIssueAssignedTo:"",
            currentIssuePriority:"Low",
            currentIssueStatus:"Open",
            currentIssueAffectedUserId:"",
            currentAssigneePhoto:"",
            userData:[]
        }        
        
    };

    componentDidMount(){
        var today = new Date(); 
        fetch(this.state.backendServer+ "issues")
        .then(response => response.json())
        .then((data) => {
            if(this.state.currentIssueID==""){
                this.setState({
                    currentIssueID:"ID"+(Object.keys(data).length+1)
                })
            }          
        })
        .catch(console.log)

        fetch(this.state.backendServer+ "users")
        .then(response => response.json())
        .then((data) => {
            this.setState({                
                userData:data,
                currentIssueAssignedTo:data[0].Name,
                currentAssigneePhoto:data[0].Photo,
                currentIssueDateOfCreation:(today.getMonth()+1)+"/"+today.getDate()+"/"+today.getFullYear(),                
                currentIssueExpectedCompletionDate:today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate(),
                currentIssueSubmittedBy:sessionStorage.getItem("Name")
            })           
        })
        .catch(console.log)
    }

    handleIssueTitleChange(e){
        this.setState({
            currentIssueTitle:e.target.value
        })          
    }

    handleIssueDescriptionChange(e){
        this.setState({
            currentIssueDescription:e.target.value
        })          
    }

    handleIssueCategoryChange(e){
        this.setState({
            currentIssueCategory:e.target.value
        })
    }

    handleIssueExpectedCompletionDate(e){
        this.setState({
            currentIssueExpectedCompletionDate:e.target.value
        })
    }

    handleAssignedToChange(e){
        this.setState({
            currentIssueAssignedTo:e.target.value
        })
        this.setAssignedPhoto(e.target.value)
    }

    handlePriorityChange(e){
        this.setState({
            currentIssuePriority:e.target.value
        })
    }

    handleAffectedUserIdChange(e){
        this.setState({
            currentIssueAffectedUserId:e.target.value
        })
    }

    setAssignedPhoto(value){        
      const result = this.state.userData.filter(function(user){
          return user.Name==value
      }) 
      
      this.setState({
          currentAssigneePhoto:result[0].Photo
      })
    }

    postIssue(){
        fetch(this.state.backendServer+"addIssue/"
        +this.state.currentIssueID+"&"
        +this.state.currentIssueTitle+"&"
        +this.state.currentIssueSubmittedBy+"&"
        +this.state.currentIssueAssignedTo+"&"
        +this.state.currentAssigneePhoto+"&"
        +this.state.currentIssueDateOfCreation+"&"
        +this.state.currentIssueExpectedCompletionDate+"&"
        +this.state.currentIssuePriority+"&"
        +this.state.currentIssueDescription+"&"
        +this.state.currentIssueCategory+"&"
        +this.state.currentIssueAffectedUserId+"&"
        +this.state.currentIssueStatus
        ,{
            method:'POST',
            headers: {                
                'Content-Type': 'text/plain',
            }, 

        })
        //.then(window.location.reload())
        .then(res=> {
            if(res.status=="200") 
            {
                //window.location.reload()
               document.location.href="/"
            }
        })

    }

    addIssue(event){
        event.preventDefault();
        if(this.state.currentIssueTitle==""|| this.state.currentIssueCategory==""||this.state.currentIssueAffectedUserId==""||this.state.currentIssueDescription=="")
        {
            alert("Please fill out all the fields in the form")
            return;
        }
        
        this.setState({
            issueID:encodeURIComponent(this.state.currentIssueID),
            currentIssueTitle:encodeURIComponent(this.state.currentIssueTitle),           
            currentIssueSubmittedBy:encodeURIComponent(this.state.currentIssueSubmittedBy),
            currentIssueAssignedTo:encodeURIComponent(this.state.currentIssueAssignedTo),
            currentAssigneePhoto:encodeURIComponent(this.state.currentAssigneePhoto),
            currentIssueDateOfCreation:encodeURIComponent(this.state.currentIssueDateOfCreation),
            currentIssueExpectedCompletionDate:encodeURIComponent(this.state.currentIssueExpectedCompletionDate),
            currentIssuePriority:encodeURIComponent(this.state.currentIssuePriority),
            currentIssueDescription:encodeURIComponent(this.state.currentIssueDescription),
            currentIssueCategory:encodeURIComponent(this.state.currentIssueCategory),
            currentIssueAffectedUserId:encodeURIComponent(this.state.currentIssueAffectedUserId),
            currentIssueStatus:encodeURIComponent(this.state.currentIssueStatus)
        },()=>this.postIssue())
       
    }
       

    render(){
        
        return(
            <div className="issueDisplay">
                     <div className="card">
                        <form>
                            <div className="form-group">
                                <div className="card-header">
                                    {this.state.currentIssueID}
                                    <input type="text" className="form-control" value={this.state.currentIssueTitle} placeholder="Issue title" onChange={(e)=>this.handleIssueTitleChange(e)} required="true"></input>
                                </div>
                                <div className="card-body">                                    
                                    <div className="form-group">
                                        <label for="description">Description</label>
                                        <textarea className="form-control" id="description" rows="3" value={this.state.currentIssueDescription} onChange={(e)=>this.handleIssueDescriptionChange(e)} required="true"></textarea>
                                        <hr></hr>
                                        <label>Category</label>
                                        <input type="text" className="form-control" value={this.state.currentIssueCategory} onChange={(e)=>this.handleIssueCategoryChange(e)} required="true"></input>
                                        <hr></hr>                                        
                                        <label>Date of creation</label>
                                        <input type="text" className="form-control" value={this.state.currentIssueDateOfCreation}></input>
                                        <hr></hr>
                                        <label>Expected completion date</label>
                                        <input type="date" className="form-control" value={this.state.currentIssueExpectedCompletionDate} onChange={(e)=>this.handleIssueExpectedCompletionDate(e)}></input>
                                        <hr></hr>
                                        <label>Assigned to</label>
                                        <select className="custom-select" onChange={(e)=> this.handleAssignedToChange(e)}>
                                            {this.state.userData.map((user)=>(
                                                    <option value={user.Name}>{user.Name}</option>
                                            ))}
                                        </select>                                                              
                                        <hr></hr>                                        
                                        <label>Priority</label>                                                  
                                            <select className="custom-select" id="priorityGroupSelect" onChange={(e)=>this.handlePriorityChange(e)}>
                                                <option value="Low" selected>Low</option>                                               
                                                <option value="High">High</option>
                                            </select>                                                             
                                        <hr></hr>
                                        <label>Affected User ID</label>                                       
                                        <input type="text" className="form-control" value={this.state.currentIssueAffectedUserId} onChange={(e)=>this.handleAffectedUserIdChange(e)} required="true"></input>
                                        <button className="btn btn-primary" onClick={(event) => this.addIssue(event)}>Add Issue</button>
                                        <hr></hr>
                                    </div>                                        
                                </div>                            
                            </div>
                        </form>
                     </div>
                 
            </div>
        )
    }
}