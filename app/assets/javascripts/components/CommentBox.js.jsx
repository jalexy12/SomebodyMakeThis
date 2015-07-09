class CommentBox extends React.Component{

	constructor(props){
		super();
		this.handleNewComment = this.handleNewComment.bind(this)
		this.state = {
			comments: props.comments || []
		}
	}

	handleNewComment(comment){
		var comments = this.state.comments;
		var newComments = comments.concat([comment]);
		this.setState({ comments: newComments });
		var that = this;
		$.ajax({
			url: that.props.url,
			type: 'POST',
			dataType: 'json',
			data: comment,
			success: function(comments){
				console.log("Success")
			}.bind(this),
			error: function(xhr, status, err){
				console.log(xhr.toString(), status.toString(), err.toString());
			}.bind(this)

		});
	}

	render(){
		var comments = this.state.comments.map(comment => {
			var user = comment.creative_id === null ? comment.developer_id : comment.creative_id
			return <Comment  comment={comment.comment_text} />
		});

		return(
		    <div>
			 <div className="row">
			    <CommentForm onCommentSubmit={this.handleNewComment} />
			 </div>
		      <div className="row">
				 {comments}
			  </div>
			</div>
		)
	}
}