ProjectIdeaTable = React.createClass({
	getInitialState: function(){
		return {
			currentPage: 0,
			pageMax: null,
			projectIdeas: []
		}
	},

	getIdeas: function(){
		$.ajax({
			url: '/projectideas?page=' + Number(this.state.currentPage),
			success: function(data){
				console.log(data)
				this.setState({projectIdeas: data.projects, pageMax: data.page_count});
			}.bind(this),
			error: function(xhr, status, err){
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},

	newPage: function(){
		if (this.state.currentPage <= this.state.pageMax){
			this.setState({currentPage: this.state.currentPage + 1})
			this.getIdeas();
		}
		
	},

	componentDidMount: function(){	
		this.getIdeas();
	},

	render: function(){

		var ideas = this.state.projectIdeas.map(function(idea){
			return(<ProjectIdeaComponent key={idea.id} name={idea.name} id={idea.id} likes={idea.likes} creative={idea.creative} description={idea.description} />)
		});


		return (
			<ul className="row list-unstyled">
				{ideas}
				<button onClick={this.newPage}>Next</button>
			</ul>

			)
	}
})


