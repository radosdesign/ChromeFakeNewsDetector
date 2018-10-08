module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        //
        copy: {
            files: {
                cwd: 'extension',
                src: '**/*',
                dest: 'build',
                expand: true
            }
        },

        //
        uglify: {
            build: {
                src: 'extension/background.js',
                dest: 'build/background.js'
            }
        },

        //
        compress: {
            main: {
                options: {
                    archive: 'dist/extension.zip'
                },
                expand: true,
                cwd: 'build/',
                src: ['**/*'],
                dest: ''
            }
        },

        //
        replace: {
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'REPLACE_VERSION',
                            replacement: '<%= grunt.config.get(\'extension.version\') %>'
                        }
                    ]
                },
                files: [
                    {expand: true, flatten: true, src: ['extension/manifest.json'], dest: 'build/'}
                ]
            }
        }
    });

    //
    grunt.registerTask('update-version', 'Update version string in manifest', function () {
        version = grunt.file.read('version');
        new_version = parseInt(version) + 1
        version = grunt.file.write('version', new_version);
        version_string = '1.0.' + new_version
        grunt.config.set('extension.version', version_string);
    });

    //
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-replace');


    // Default task(s).
    grunt.registerTask('default', ['copy', 'update-version', 'replace', 'uglify', 'compress']);

};