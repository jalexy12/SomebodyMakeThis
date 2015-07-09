class LikeButton extends React.Component{

	_updateLiked(type){
		var uri;
		var id = this.props.id;
		uri = type === "like" ? this.state.likeUrl : this.state.unlikeUrl
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

	updateLikeCount(toWhat){
		this.setState({
			likes: toWhat
		})
	}

	_like(){
		this.setState({
			liked: true,
		})
		this._updateLiked("like");

	}
	_unlike(){
		this.setState({
			liked: false,
		})
		this._updateLiked("unlike")
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			likes: nextProps.likes
		})
	}

	constructor(props){
		super();
		this._like = this._like.bind(this)
		this._unlike = this._unlike.bind(this)
		this._updateLiked = this._updateLiked.bind(this)
		this.state = {
			liked: props.liked, 
			likes: props.likes,
			likeUrl: "/projectideas/like/" + props.id,
			unlikeUrl: "/projectideas/unlike/" + props.id
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

