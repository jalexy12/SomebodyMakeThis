class ProjectIdeaComponent extends React.Component{
	componentWillReceiveProps(nextProps) {
	  this.setState({
	    name: nextProps.name,
	    id: nextProps.id,
	    liked: nextProps.liked,
	    likes: nextProps.likes,
	   	creative: nextProps.creative,
	   	description: nextProps.description
	  });
	}

	constructor(props){
		this.state = {
		  name: props.name,
		  id: props.id,
		  liked: props.liked,
		  likes: props.likes,
		  creative: props.creative,
		  description: props.description
		};
	}

	render(){
		return( 
			<li className="row project_home">
			  <div className="col-sm-4 home_name">
			    <h3>
			        {this.state.name}&nbsp;{this.state.id}&nbsp;
			      <small>
			        <LikeButton url={"/updatelike"} liked={this.state.liked} likes={this.state.likes} id={this.state.id}/>
			      </small>
			    </h3>
			  </div>
			  <div className="col-sm-4 home_creative">
			    <img className="img-circle home_creative_pic" src="/assets/personplaceholder.jpg" />
			    <h4>Creative: {this.state.creative}</h4>
			  </div>
			  <div className="col-sm-4 home_description">
			    <h4>Description: {this.state.description}</h4>
			  </div>
			</li>
			)
	}
}




