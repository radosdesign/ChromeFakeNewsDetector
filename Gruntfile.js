module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		//
		copy : {
			files : {
				cwd : 'extension', 
				src : '**/*',
				dest : 'build',
				expand : true
			}
		},
		
		//
		uglify : {
			build : {
				src : 'extension/background.js',
				dest : 'build/background.js'
			}
		},
		
		//
		compress : {
			main : {
				options : {
					archive: 'dist/extension.zip'
				},
				expand : true,
				cwd : 'build/',
				src : ['**/*'],
				dest : ''
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compress');

	// Default task(s).
	grunt.registerTask('default', ['copy', 'uglify', 'compress']);

};