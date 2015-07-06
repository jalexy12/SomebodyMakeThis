var CommentForm = React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    var text = this.refs.text.getDOMNode().value.trim();
    this.props.onCommentSubmit(
      {
       text: text
      });
    this.refs.text.getDOMNode().value = '';
  },
  render() {
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <form className="commentForm form-group" onSubmit={this.handleSubmit}>
          <input type="text" className="form-control" placeholder="Say something..." ref="text" />
          <input type="submit" style={{marginTop: 1 + "%"}} className="btn btn-primary" value="Post" />
        </form>
      </div>
    );
  }
});
