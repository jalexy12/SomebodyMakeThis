class ProjectIdeaTable extends React.Component{

	constructor(){
		super();
		this.getIdeas = this.getIdeas.bind(this)
		this.newPage = this.nextPage.bind(this)
		this.state = {
			currentPage: 1,
			pageMax: null,
			projectIdeas: []
		}
	}

	getIdeas(page){
		$.ajax({
			url: '/projectideas',
			type: "get",
			data: {page: page},
			success: function(data){
				console.log(data)
				this.setState({projectIdeas: data.projects, pageMax: data.page_count});
			}.bind(this),
			error: function(xhr, status, err){
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	}

	nextPage(page){
			if (this.state.currentPage < this.state.pageMax){
				this.getIdeas(page);
				this.setState({
					currentPage: this.state.currentPage +  1
				})
			}
	}

	prevPage(){
			if (this.state.currentPage > 1){
				this.getIdeas(this.state.currentPage - 1);
				this.setState({
					currentPage: this.state.currentPage -  1
				})
			}
	}

	updateLiked(updatedProject){
		var newIdeas = this.state.projectIdeas.map(project => {
			if (project.project.id === updatedProject.project_id){
				project.likes = updatedProject.votes_for
				return project
			}else{
				return project
			}
		}); 
		this.setState({projectIdeas: newIdeas})
	}

	componentDidMount(){	
		this.getIdeas(1);
		var that = this;
		var ProjectIdeas = pusher.subscribe('ProjectIdeas');
		ProjectIdeas.bind("liked", function(data) { that.updateLiked(data.message) });
		ProjectIdeas.bind("unliked", function(data) { that.updateLiked(data.message) });
	}

	render(){
		var ideas = this.state.projectIdeas.map(function(idea){

			var project = idea.project;
			var comments = idea.comments;
			var liked = idea.liked;
			var likes = idea.likes;

			return(
				<div>
				  <ProjectIdeaComponent 
					  key={project.id} 
					  name={project.name} 
					  id={project.id} 
					  likes={likes} 
					  creative={project.creative} 
					  description={project.description}
					  liked={liked} />
			    </div>
				  )
		});

		return (
			<ul className="row list-unstyled">
				{ideas}
				<button className="btn btn-default" onClick={this.prevPage.bind(this)}>Back</button>
				<button className="btn btn-default" onClick={this.nextPage.bind(this, this.state.currentPage + 1)}>Next</button>
			</ul>

			)
	}
}
