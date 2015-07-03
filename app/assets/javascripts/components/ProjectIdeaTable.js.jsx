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

		new Firehose.Consumer({
		  message: function(msg){
		    that.updateState(msg)
		  },
		  connected: function(){
		    console.log("Great Scotts!! We're connected!");
		  },
		  disconnected: function(){
		    console.log("Well shucks, we're not connected anymore");
		  },
		  error: function(){
		    console.log("Well then, something went horribly wrong.");
		  },
		  uri: '//localhost:7474/projects'
		}).connect();
		
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
		newIdeas = this.state.projectIdeas.map(function(project){
			if (updatedProject.id === project.id){
				return updatedProject
			}else{
				return project
			}
			console.log(newIdeas)
		})

		this.setState({projectideas: newIdeas})
	}


	componentDidMount(){	
		this.getIdeas(1);
	}

	render(){
		var ideas = this.state.projectIdeas.map(function(idea){
			var project = idea[0]
			return(<ProjectIdeaComponent 
					  key={project.id} 
					  name={project.name} 
					  id={project.id} 
					  likes={idea[1]} 
					  creative={project.creative} 
					  description={project.description}
					  liked={idea[2]} />
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



