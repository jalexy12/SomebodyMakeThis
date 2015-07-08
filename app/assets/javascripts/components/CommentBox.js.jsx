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

		$.ajax({
			url: this.props.url,
			type: 'POST',
			dataType: 'json',
			data: comment,
			success: function(comments){
				console.log(comments)
				this.setState({comments: comments});

			}.bind(this),
			error: function(xhr, status, err){
				console.log(err.toString());
			}.bind(this)

		});
	}

	render(){
		var comments = this.state.comments.map(comment => {
			console.log(comment.author)
			return <Comment author={comment.author} comment={comment.comment} />
		});

		return(
		    <div>
				<div className="row">
				  {comments}
				 </div>
		      <div className="row">
				<CommentForm onCommentSubmit={this.handleNewComment} />
			  </div>
			</div>
		)
	}
}