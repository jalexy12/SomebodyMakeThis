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

		var that = this;
	}

	getIdeas(page){
		$.ajax({
			url: '/projectideas',
			type: "get",
			data: {page: page},
			success: function(data){
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

	updateState(updatedProject){
		var newIdeas = this.state.projectIdeas.map(project => {
			if (project[0].id === updatedProject[0].id){
				return updatedProject
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
		ProjectIdeas.bind('updateliked', function(data) {
		 	that.updateState(JSON.parse(data.message))
		});
	}

	render(){
		var ideas = this.state.projectIdeas.map(function(idea){
			var project = idea[0]
			return(
				<div>
				  <ProjectIdeaComponent 
					  key={project.id} 
					  name={project.name} 
					  id={project.id} 
					  likes={idea[1]} 
					  creative={project.creative} 
					  description={project.description}
					  liked={idea[2]} />
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
