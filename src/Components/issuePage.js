import React ,{Component} from 'react'
import Comment from './comments'

export default class IssuePage extends Component{
    constructor(props){
        super(props);
        this.state = { 
            issue:[],
            backendServer: 'https://backend-for-issuetracker.herokuapp.com/',                        
            id:this.props.match.params.id,
            currentComment:"",
            currentCommentInfo:[],
            currentPriority:"",
            currentStatus:"",
        }        
        
    };
    componentDidMount(){
        fetch(this.state.backendServer +"issue/"+ this.state.id)
        .then(response=>response.json())
        .then((data) => {
            this.setState({
                issue:data,
                currentPriority:data[0].priority,
                currentStatus:data[0].status
            })
        })
        .catch(console.log)
    }

    addComment(event){
        event.preventDefault();
        //console.log(this.state.currentCommentInfo.commenterName);


        fetch(this.state.backendServer+'issue/comment/'+this.state.issue[0].issueId+'&'
        +this.state.currentCommentInfo.commenterName+'&'
        +this.state.currentCommentInfo.commentDate+'&'
        +this.state.currentCommentInfo.commentTime+'&'
        +this.state.currentCommentInfo.commenterPhoto+'&'
        +this.state.currentCommentInfo.commentText
        , {
            method: 'POST',  
             headers: {
                //'Accept': 'application/json',
                'Content-Type': 'text/plain',
            },         
            
        })
        .then(window.location.reload())
    }

    handleCommentChange(e){
        var today = new Date();      

        this.setState({
            currentComment:e.target.value,
            currentCommentInfo:
            {
            "commenterName":sessionStorage.Name,
            "commenterPhoto":encodeURIComponent(sessionStorage.Photo),
            "commentText":encodeURIComponent(e.target.value),
            "commentDate":encodeURIComponent((today.getMonth()+1)+"/"+today.getDate()+"/"+today.getFullYear()),
            "commentTime": encodeURIComponent(today.getHours()+":"+today.getMinutes())
            }
        })        
    }

    handlePriorityChange(event){
        this.setState({
           currentPriority:event.target.value
        })
    }
    
    handleStatusChange(event){
        console.log(event.target.value)
        this.setState({
           currentStatus:event.target.value
        })
    }

    SaveForm(event)
    {
        
        if(sessionStorage.Name==this.state.issue[0].assignee)
        {
            this.postSaveForm(event)
        }
        else
        {
           alert("Only User assigned to issue can edit")

        }

    }

    postSaveForm(event){
    event.preventDefault();
      fetch(this.state.backendServer+'editIssue/'+this.state.issue[0].issueId+'&'+this.state.currentPriority+'&'+this.state.currentStatus,
      {
        method:'POST',  
        headers: {                
                'Content-Type': 'text/plain',
        }, 
      })      
      .then(window.location.reload())
    }


    render(){
        
        return(
            <div className="issueDisplay">                
                 {this.state.issue.map((issue) => (
                     <div className="card">
                        <form>
                            <div className="form-group">
                                <div className="card-header">
                                    {issue.issueId}
                                    <input type="text" className="form-control" value={issue.issueTitle}></input>
                                </div>
                                <div className="card-body">                                    
                                    <div className="form-group">
                                        <label for="description">Description</label>
                                        <textarea className="form-control" id="description" rows="3">{issue.details}</textarea>
                                        <hr></hr>
                                        <label>Category</label>
                                        <input type="text" className="form-control" value={issue.category}></input>
                                        <hr></hr>
                                        <label>Submitted by</label>
                                        <input type="text" className="form-control" value={issue.submitter}></input>
                                        <hr></hr>
                                        <label>Date of creation</label>
                                        <input type="text" className="form-control" value={issue.dateOfCreation}></input>
                                        <hr></hr>
                                        <label>Expected completion date</label>
                                        <input type="date" className="form-control" value={issue.expectedCompletionDate}></input>
                                        <hr></hr>
                                        <label>Assigned to</label>
                                        <input type="text" className="form-control" value={issue.assignee}></input>
                                        <hr></hr>                                        
                                        <label>Priority</label>                                                                            
                                            <select className="custom-select" id="priorityGroupSelect" onChange={(event)=>this.handlePriorityChange(event)}>
                                                {this.state.currentPriority=="Low"?
                                                <>
                                                    <option value="Low" selected>Low</option>                                               
                                                    <option value="High">High</option>
                                                </>
                                                :
                                                <>
                                                    <option value="Low">Low</option>                                               
                                                    <option value="High" selected>High</option>
                                                </> 
                                                }
                                            </select>
                                        <hr></hr>
                                        <label>Status</label>                                                                            
                                        <select className="custom-select" id="statusGroupSelect" onChange={(event)=>this.handleStatusChange(event)}>
                                            
                                            {this.state.currentStatus=="Open"?
                                            <>
                                                <option value="Open" selected>Open</option>                                               
                                                <option value="Closed">Closed</option>
                                            </>
                                            :
                                            <>
                                                <option value="Open">Open</option>                                               
                                                <option value="Closed" selected>Closed</option>
                                            </> 
                                            }                                      
                                        
                                        </select>
                                        <hr></hr>
                                        <label>Affected User ID</label>
                                        <input type="text" className="form-control" value={issue.affectedUserId}></input>
                                        
                                        <button class="btn btn-primary" onClick={(event) => this.SaveForm(event)}>Save Issue</button>
                                        <hr></hr>                                                                              
                                       

                                    </div>
                                    <div className="card-footer" >
                                    </div>
                                        <Comment commentlist={issue.comments}></Comment>
                                        <textarea className="form-control" id="addComment" rows="3" placeholder="add comment" value={this.state.currentComment} onChange={(event)=>this.handleCommentChange(event)}></textarea>
                                        <button className="btn btn-light" id="addCommentButton" onClick={(event) => this.addComment(event)}>Add comment</button>
                                                                               
                                        <></>
                                </div>                            
                            </div>
                        </form>
                     </div>
                 ))}
            </div>
        )
    }
}