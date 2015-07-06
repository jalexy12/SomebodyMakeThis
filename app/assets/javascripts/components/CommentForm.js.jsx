var CommentForm = React.createClass({
  handleSubmit() {
    var author = this.refs.author.getDOMNode().value.trim();
    var text = this.refs.text.getDOMNode().value.trim();
    this.props.onCommentSubmit(
      {
        author: author, text: text
      });
    this.refs.author.getDOMNode().value = '';
    this.refs.text.getDOMNode().value = '';
    return false;
  },
  render() {
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <form className="commentForm form-group" onSubmit={this.handleSubmit}>
          <input type="text" className="form-control" placeholder="Say something..." ref="text" />
          <button type="submit" style={{marginTop: 1 + "%"}} className="btn btn-primary" value="Post">Post</button>
        </form>
      </div>
    );
  }
});
