module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: '\n',
        banner: "var Qolor = (function() {\n",
        footer: "\nreturn Qolor;\n\n"+
          "}());\n\n"+
          "if (typeof module === 'object') { module.exports = Qolor; }\n"
      },
      dist: {
        src: 'src/Qolor.js',
        dest: 'dist/Qolor.debug.js'
      }
    },

    uglify: {
      options: {},
      build: {
        src: 'dist/Qolor.debug.js',
        dest: 'dist/Qolor.js'
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
