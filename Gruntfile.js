module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// lint javascript
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				force: true
			},
			all: ['swipeme.js']
		},

		// concatenate and uglify javascript
		uglify: {
			dist: {
				files: {
					'swipeme.min.js' : ['swipeme.js'],
					'plugins/swipeme.ltie9.min.js' : ['plugins/swipeme.ltie9.js']
				},
				options: {
					preserveComments: 'some'
				}
			}
		},
	});

	// Plugins
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Task(s).
	grunt.registerTask('default', ['jshint', 'uglify']);

};