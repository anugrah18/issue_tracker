import React, {Component} from 'react'

class IssueList extends Component {

    constructor(props){
        super(props);
        this.state = {
            issuedata:[],
            backendServer : 'https://backend-for-issuetracker.herokuapp.com/',
            currentHandle: 'issues',
            currentIssueCount: 0,
            status:"Open"
        };

        //Need to bind to change variables in state
        this.changeStatus = this.changeStatus.bind(this);
    }

    componentDidMount(){
        fetch(this.state.backendServer+ this.state.currentHandle)
        .then(response => response.json())
        .then((data) => {
            this.setState({
                issuedata:data,
                currentIssueCount:Object.keys(data).length
            })
        })
        .catch(console.log)
    }

    changeStatus(status){
        this.setState({status:status}) 
    }

    addIssue(){
        document.location.href="/addIssue"
    }
    
    render(){
         const highPriority = <div className="fa fa-exclamation-circle"><p className="font-weight-light text-capitalize">High</p></div>
         const bugOpen = <div className="fa fa-bug"></div>
         const bugClosed = <div className="fa fa-check-circle"></div>

        return(
            
           <>
           <div className="issues-tab">
                <button className="btn btn-outline-secondary" onClick={()=>this.changeStatus("Open")}>
                    <div className="fa fa-bug"> Open issues</div>
                </button> 
                <button className="btn btn-outline-secondary" onClick={()=>this.changeStatus("Closed")}>
                    <div className="fa fa-check-circle"> Closed issues</div>
                </button>
                <button className="btn btn-outline-secondary" onClick={this.addIssue}>
                    <div className="fa fa-plus-circle"> Add issue</div>
                </button>
           </div>                
            <div className="issueList">                           
                {this.state.issuedata.map((issue) => (
                    <div>{issue.status==this.state.status ?                    
                        <div className="card text-center">
                            <div className="card-title">
                               <a href={"/issue/"+issue.issueId}>{issue.issueId}</a>
                            </div>
                            <div className="card-body">
                                <h6>{issue.issueTitle}</h6>  
                                <div className="assignee_photo">
                                    <img src={issue.assignee_photo} alt=""></img>
                                </div>                
                                {issue.priority == "High" ? highPriority:""}                                                          
                            </div>
                            <div className="info">
                                    <span class="badge badge-info">{issue.category}</span>
                            </div>  
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">{issue.status == "Open" ? bugOpen:bugClosed}  </li>
                                <li className="list-group-item">{issue.status == "Open" ? <mark>{issue.expectedCompletionDate}</mark>:<del>{issue.expectedCompletionDate}</del>}</li>
                            </ul>                        
                        </div>
                        :""} 
                    </div> 
                ))}                 
            </div>            
            </>
        )
    }
}

export default IssueList;