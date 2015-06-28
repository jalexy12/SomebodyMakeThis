class LikeButton extends React.Component{

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
		this.state = {
			liked: null, 
			likeUrl: ''
		}
	}

	// _bind(...methods){
	// 	methods.forEach( (method) => )
	// }




	render(){
		var button;

		if (this.state.liked === true){ 
			button = <i onClick={this._unlike} className="fa fa-thumbs-up"></i>
		}else if (this.state.liked === false){
			button = <i onClick={this._like} className="fa fa-thumbs-down"></i>
		}else{
			button = <button onClick={this._like} className="btn btn-default">Like This</button>
		}

		console.log(this.state.liked)
		return(
			<span>{button}</span>
		);
	}
}