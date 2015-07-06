class Comment extends React.Component{
	render(){
	  return(
	      <div className="comment col-sm-6 col-sm-offset-3">
	  	  	<div className="col-sm-2">
	  	  	 	 {this.props.author}
	  	  	</div>
	  	  	<div className="col-sm-10">
	  	      <span>{this.props.comment}</span>
	  	    </div>
	  	  </div>
	  	  )
	}
}