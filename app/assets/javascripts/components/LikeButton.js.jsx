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

	componentWillReceiveProps(nextProps) {
		if (nextProps.likes !== this.state.likeCount){
			this.setState({
				likeCount: nextProps.likes
			})
		}
	}

	_like(){
		this.setState({
			liked: true,
		})	
		this._updateLiked()
	}
	_unlike(){
		this.setState({
			liked: false,
		})
		this._updateLiked()
	}
	constructor(props){
		super();
		this._like = this._like.bind(this)
		this._unlike = this._unlike.bind(this)
		this._updateLiked = this._updateLiked.bind(this)
		this.state = {
			liked: props.liked, 
			likeUrl: props.likeUrl,
			likeCount: props.likes
		}
	}

	componentWillMount() {
		this.setState({
			liked: this.props.liked
		})
	}

	render(){
		var button;
		if (this.state.liked === true){ 
			button = <button className="btn btn-default" onClick={this._unlike}>You liked this {this.state.likeCount}</button>
		}else {
			button = <button className="btn btn-primary" onClick={this._like}><i className="fa fa-thumbs-up"></i>Like This {this.state.likeCount}</button>
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

