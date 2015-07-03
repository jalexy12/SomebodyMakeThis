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
		this._updateLiked()
	}
	_unlike(){
		this.setState({
			liked: false
		})
		this._updateLiked()
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
