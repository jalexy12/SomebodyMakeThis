class LikeButton extends React.Component{

	_updateLiked(){
		var uri = this.props.url
		var id = this.props.id

		$.ajax({
				url: uri,
				type: 'post',
				data: {id: id},
				success: function (data) {
					this.setState({likeCount: data})
				}.bind(this),
				error: function(xhr, status, err){
					console.error(this.props.url, status, err.toString());
				}.bind(this)
			});
	}

	_like(){
		this.setState({
			liked: true
		})
	}
	_unlike(){
		this.setState({
			liked: false
		})
	}
	constructor(){
		super();
		this._like = this._like.bind(this)
		this._unlike = this._unlike.bind(this)
		this._updateLiked = this._updateLiked.bind(this)

		this.state = {
			liked: null, 
			likeUrl: '',
			likeCount: null
		}
	}

	componentWillMount() {
		this.setState({
			likeCount: this.props.likes,
			liked: this.props.liked
		})
		// this._updateLiked();	
	}

	render(){
		var button;

		if (this.state.liked === true){ 
			button = <button className="btn btn-default" onClick={this._unlike}>You liked this</button>
		}else {
			button = <button className="btn btn-primary"><i onClick={this._like} className="fa fa-thumbs-up"></i>Like This</button>
		}

		return(
			<span>
			  {button}
			</span>
		);
	}
}
