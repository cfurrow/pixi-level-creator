const sass = require('node-sass');

module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        implementation: sass,
      },
      
      dev: {
        files: {
          'css/app.css': 'css/app.scss'
        }
      }
    },
      

    copy: {
      main: {
        files: [
          {
            expand: true,
            src: 'src/*',
            dest: 'build/'
          }
        ]
      }
    }
  });


  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.registerTask('default', ['sass', 'copy']);
}
  

