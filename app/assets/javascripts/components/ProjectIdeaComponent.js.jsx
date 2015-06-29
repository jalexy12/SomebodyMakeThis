var ProjectIdeaComponent = React.createClass({
	render: function (){
		return( 
			<li className="row project_home">
			  <div className="col-sm-4 home_name">
			    <h3>
			        {this.props.name} 
			      <small>
			        <LikeButton url={"/updatelike"} likes={this.props.likes} id={this.props.id}/>
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
			)
	}
})




