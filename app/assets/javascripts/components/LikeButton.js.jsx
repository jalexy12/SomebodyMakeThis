class LikeButton extends React.Component{

	_updateLiked(){
		var uri = this.props.url
		var id = this.props.id
		var that = this

		$.ajax({
				url: uri,
				type: 'post',
				data: {id: id},
				success: function (data) {
					console.log("Success")
				}.bind(this),
				error: function(xhr, status, err){
					console.error(this.props.url, status, err.toString());
				}.bind(this)
			});
	}

	_like(){
		this.setState({
			liked: true,
			likes: this.state.likes + 1
		})	
		this._updateLiked()
	}
	_unlike(){
		this.setState({
			liked: false,
			likes: this.state.likes - 1
		})
		this._updateLiked()
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			likes: nextProps.likes
		})
	}
	
	componentDidMount() {
		var that = this;
		var ProjectIdeas = pusher.subscribe('ProjectIdeas');
		ProjectIdeas.bind('liked', function(data) {
		 	that.updateState(JSON.parse(data.message))
		});
		ProjectIdeas.bind('updateliked', function(data) {
		 	that.updateState(JSON.parse(data.message))
		});
	}
	constructor(props){
		super();
		this._like = this._like.bind(this)
		this._unlike = this._unlike.bind(this)
		this._updateLiked = this._updateLiked.bind(this)
		this.state = {
			liked: props.liked, 
			likeUrl: props.likeUrl,
			likes: props.likes
		}
	}

	render(){
		var button;
		if (this.state.liked === true){ 
			button = <button className="btn btn-default" onClick={this._unlike}>You liked this {this.state.likes}</button>
		}else {
			button = <button className="btn btn-primary" onClick={this._like}><i className="fa fa-thumbs-up"></i>Like This {this.state.likes}</button>
		}
		return(
		  <div>
			<span>
			  {button}
			</span>
			<br/>


		  </div>
		);
	}
}

