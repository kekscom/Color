module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: '\n',
        banner: '(function(global) {\n',
        footer: "\nif (typeof global.define === 'function') {"+
        "global.define([], <%=pkg.name%>);"+
        "} else if (typeof global.exports === 'object') {"+
        "global.exports = <%=pkg.name%>;"+
        "} else {"+
        "global.<%=pkg.name%> = <%=pkg.name%>;"+
        "}\n"+
        "}(this));"
      },
      dist: {
        src: 'src/Color.js',
        dest: 'dist/<%=pkg.name%>.debug.js'
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

  grunt.registerTask('release', 'Release build', function() {
    grunt.log.writeln('\033[1;36m'+ grunt.template.date(new Date(), 'yyyy-mm-dd HH:MM:ss') +'\033[0m');
    grunt.task.run('default');
  });

};
