class Comment extends React.Component{
	render(){
	  return(
	      <div className="comment col-sm-6 col-sm-offset-3">
	  	  	<div className="col-sm-2">
	  	  	 	 <span>{this.props.comment}</span>
	  	  	</div>
	  	  	<div className="col-sm-10">
	  	      	<img className="img-circle home_creative_pic" src="/assets/personplaceholder.jpg" />
	  	    </div>
	  	  </div>
	  	  )
	}
}