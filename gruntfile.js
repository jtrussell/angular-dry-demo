/*jshint node:true */

module.exports = function(grunt) {
  'use strict';

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: 'gruntfile.js',
      src: 'src/**/*.js',
      test: 'test/**/*.js'
    },

    watch: {
      gruntfile: {
        files: 'gruntfile.js',
        tasks: ['jshint:gruntfile']
      },
      src: {
        files: 'src/scripts/**/*.js',
        tasks: ['jshint:src', 'build']
      },
      test: {
        files: 'test/**/*.js',
        tasks: ['jshint:test']
      }
    },

    clean: {
      dist: 'dist/*.{js,css}',
      pages: 'pages/bower_components/angular-dry-demo/*'
    },

    concat: {
      scripts: {
        dest: 'dist/angular-dry-demo.js',
        src: [
          'src/scripts/module.js',
          'src/scripts/**/*.js'
        ]
      }
    },

    copy: {
      pages: {
        files: [{
          expand: true,
          src: 'dist/*',
          dest: 'pages/bower_components/angular-dry-demo/',
          filter: 'isFile'
        }]
      }
    },

    uglify: {
      all: {
        dest: 'dist/angular-dry-demo.min.js',
        src: '<%= concat.scripts.dest %>'
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js',
        autoWatch: false,
        singleRun: true,
        browsers: [process.env.KARMA_BROWSER || 'Firefox']
      }
    },

    bump: {
      options: {
        commitMessage: 'chore: Bump for release (v%VERSION%)',
        files: ['package.json', 'bower.json'],
        commitFiles: ['-a'],
        push: false
      }
    }
  });

  // Load plugins
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('test', [
    'jshint',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean',
    'concat',
    'uglify',
    'copy:pages'
  ]);

  grunt.registerTask('default', [
    'test',
    'build'
  ]);

};
