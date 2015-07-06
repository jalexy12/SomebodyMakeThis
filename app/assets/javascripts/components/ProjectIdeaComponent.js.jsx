class ProjectIdeaComponent extends React.Component{
	
	render(){
		var comment = [{author: "Bill", comment: "Hey"}]
		return(<span>
					<li className="row panel panel-default">
						  <div className="col-sm-4 home_name">
						    <h3>
						        {this.props.name}&nbsp;{this.props.id}&nbsp;
						      <small>
						        <LikeButton url={"/updatelike"} liked={this.props.liked} likes={this.props.likes} id={this.props.id}/>
						      </small>
						    </h3>
						  </div>
						  <div className="col-sm-4 home_creative">
						    <img className="img-circle home_creative_pic" src="/assets/personplaceholder.jpg" />
						    <h4>Creative: {this.props.creative}</h4>
						  </div>
						  <div className="col-sm-4 home_description">
						    <h4>Description: {this.props.description}</h4>
						  </div>
					</li>
					<CommentBox url={"/projectideas/" + this.props.id + "/comments/create"} comments={comment} />
				</span>
			)
	}
}




