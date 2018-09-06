const ProjectData = {
		introduction: {
			id: 0,
			name: '',
			owner: {
				name: '',
				projectsCreated: 0
			},
			photos: '',
			createdAt: '',
			description: '',
			moneyRaised: 0,
			targetGoal: 0,
			backers: 0,
			deadline: 0,
			location: '',
			category: ''
		},
		description: {
			id: 0,
			name: '',
			campaign: {
				about: ''
			},
			comments: [],
			comment: {
				user: '',
				text: '',
				icon: '',
				postTime: '',
				childComments: []
			}
		},
		support: {
			id: 0,
			name: '',
			pledges: [],
			pledge: {
				available: true,
				minimum: 0,
				pledgeTitle: '',
				description: '',
				pledgeRewards: [],
				estimatedShipping: '',
				validLocations: [],
				backers: 0
			}
		}
	}