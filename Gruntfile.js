module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: '\n',
        banner: 'var <%=pkg.name%> = (function(window) {\n\n',
        footer: '\nreturn <%=pkg.name%>; }(this));'
      },
      dist: {
        src: grunt.file.readJSON('files.json'),
        dest:  'dist/<%=pkg.name%>.debug.js'
      }
    },

    uglify: {
      options: {},
      build: {
        src: 'dist/<%=pkg.name%>.debug.js',
        dest: 'dist/<%=pkg.name%>.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', 'Development build', function() {
    grunt.log.writeln('\033[1;36m'+ grunt.template.date(new Date(), 'yyyy-mm-dd HH:MM:ss') +'\033[0m');
    grunt.task.run('concat');
    grunt.task.run('uglify');
  });
};
