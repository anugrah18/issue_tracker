var express = require('express');
var cors = require('cors')

var sampleIssueData = require('./sample_issueData.json')
var sampleUserData = require('./sample_userData.json')

const PORT = process.env.PORT||8080;

var app = express();

app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req,res){
    res.status(200).send("Home");
})

app.get('/issues', function(req,res){    
    res.status(200).send(sampleIssueData);
})

app.get('/users', function(req,res){    
    res.status(200).send(sampleUserData);
})

app.get('/issue/:id',function(req,res){
    const result = sampleIssueData.filter(issue=>issue.issueId==req.params.id)
    res.status(200).send(result);
})

app.get('/user/:id&:password',function(req,res){
    const result = sampleUserData.filter(user=>user.ID==req.params.id&&user.Password==req.params.password)
    res.status(200).send(result);
})

app.get('/affectedUser/:userid',function(req,res){
    const result = sampleIssueData.filter(issue=> issue.affectedUserId == req.params.userid)
     res.status(200).send(result);
})


app.post('/issue/comment/:ID&:CommentName&:CommentDate&:CommentTime&:CommentPhoto&:CommentText',function(req,res){
  
     
   // sampleIssueData.filter(d=>d.issueId==req.params.ID)
    for(var index in sampleIssueData)
    {
        if(sampleIssueData[index].issueId == req.params.ID)
        {
            //var currentIssue = sampleIssueData[index].comments
            sampleIssueData[index].comments.unshift({
            "commenterName":req.params.CommentName,
            "commenterPhoto":req.params.CommentPhoto,
            "commentText":req.params.CommentText,
            "commentDate":req.params.CommentDate,
            "commentTime": req.params.CommentTime
            })            
            break;
        }
    }    
})

app.post('/addIssue/:issueID&:issueTitle&:submitter&:assignee&:assignee_photo&:dateOfCreation&:expectedCompletionDate&:priority&:details&:category&:affectedUserId&:status',function(req,res){
    sampleIssueData.push({
        "issueId":req.params.issueID,
        "issueTitle":req.params.issueTitle,
        "submitter":req.params.submitter,
        "assignee":req.params.assignee,
        "assignee_photo":req.params.assignee_photo,
        "dateOfCreation":req.params.dateOfCreation,
        "expectedCompletionDate":req.params.expectedCompletionDate,
        "priority":req.params.priority,
        "details":req.params.details,
        "category":req.params.category,
        "comments":[],
        "affectedUserId":req.params.affectedUserId,
        "status":req.params.status
    })
    res.status(200).send(req.params.issueID)
})

app.post('/editIssue/:issueId&:priority&:status',function(req,res){
    for(var index in sampleIssueData)
    {        
        if(sampleIssueData[index].issueId == req.params.issueId)
        {
            sampleIssueData[index].priority=req.params.priority
            sampleIssueData[index].status=req.params.status            
        }
    }
})

app.listen(PORT,function(){
    console.log('server is running on PORT', PORT)
})


