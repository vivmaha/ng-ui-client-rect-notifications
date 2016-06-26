module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            build: {
                src: ["build/"]
            }
        },
        copy: {
            src: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: [
                        '**',
                        '!**.scss'
                    ],
                    dest: 'build/'
                }]
            },
            node: {
                files: [{
                    expand: true,
                    cwd: 'node_modules',
                    src: [
                        'angular/angular.js',
                        'angular-route/angular-route.js',
                        'angular-animate/angular-animate.js',
                        'angular-sanitize/angular-sanitize.js',
                        'angular-youtube-embed/dist/angular-youtube-embed.min.js',
                    ],
                    dest: 'build/node_modules'
                }]
            }
        },
        postcss: {
            options: {
                processors: [
                    require('autoprefixer')({browsers: 'last 2 versions'}),
                ]
            },
            dist: {
                src: 'build/index.css'
            }
        },
        sass: {
            dist: {
                files: {
                    'build/index.css': 'src/index.scss',
                },
            },
        },
        watch: {
            rebuild: {
                files: [
                    'src/**/*.*',
                ],
                tasks: [
                    'build-incremental',
                ],
                options: {
                    livereload: {
                        host: '0.0.0.0',
                        port: 35729
                    },
                }
            },
        },
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: './build',                    
                    livereload: true,
                    hostname:'localhost',
                },
            },
        },
        browserify: {
            dist: {
                files: {
                    'build/bundle.js': [ 'src/exports.js' ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-sass');

    grunt.registerTask('build', [
        'clean',
        'build-incremental',
        'browserify',
    ])

    grunt.registerTask('build-incremental', [
        'copy',
        'sass',
        'postcss',
    ])

    grunt.registerTask('serve', [
        'build',
        'connect',
        'watch'
    ])
};