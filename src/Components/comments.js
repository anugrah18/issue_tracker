import React, {Component} from 'react'
import { tsConstructorType } from '@babel/types'

export default class Comment extends Component{
    constructor(props){
        super(props);
        this.state = {
            comments:this.props.commentlist,            
        }   
        console.log(this.state.comments)    
    }

 


    render(){
        
        return(
            <div className="CommentSection">
                <h4 className="font-weight-light">Comments <kbd>{this.state.comments.length}</kbd></h4>
                {this.state.comments.map((comment)=> (
                        <div className="CommentMessageBox border">
                            <div className="row">
                                <div className="col-sm-2">
                                    <div className="CommenterPhoto">
                                        <img src={comment.commenterPhoto}></img>
                                        <h6>{comment.commenterName}</h6>
                                    </div>                                    
                                </div>
                                <div className="col-sm-8">
                                    <div className="CommenterText">
                                        {comment.commentText}
                                    </div>
                                    <br></br>
                                    <div className="CommenterTime">
                                        On {comment.commentDate} at {comment.commentTime}
                                    </div>                                                                        
                                </div>                                                               
                            </div>                                                
                        </div>
                ))}
            </div>
        )
    }
}