module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')

    coffee: 
      compile: 
        files: 
          #'path/to/result.js': 'path/to/source.coffee'
          'build/<%= pkg.name %>.js': ['src/models/*.coffee', 'src/ui/*.coffee' , 'src/*.coffee'] # compile and concat into single file

    uglify: 
      options: 
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      build:
        src: 'build/<%= pkg.name %>.js'
        dest: 'build/<%= pkg.name %>.min.js'

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.registerTask('default', ['coffee', 'uglify'])

