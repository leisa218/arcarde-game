//require("load-grunt-tasks")(grunt);

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      dist: {
          src: [
              'js/app.js', // Plugins
          ],
          dest: 'js/build/production.js',
      }
    },
    uglify: {
        build: {
            src: 'js/build/production.js',
            dest: 'js/build/production.min.js'
        }
    },
    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'expanded'
        },
        files: {
          'css/style.css': 'sass/style.scss'      // 'destination': 'source
        }
      }
    },
    watch: {
        scripts: {
            files: ['js/*.js', 'css/*.scss'],
            tasks: ['uglify','sass', 'postcss:dist'],
            options: {
                spawn: false,
            },
        } 
    },
    postcss: {
        options: {
            map: true,
            processors: [
                require('autoprefixer')
            ]
        },
        dist: {
            src: 'css/*.css'
        }
    },
    /* Generate the images directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: ['js/build']
        },
      },
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ['env']
      },
      dist: {
        files: {
          "js/build/production.js": "js/app.js"
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-babel');
  grunt.registerTask('production'['concat','uglify']);
  grunt.registerTask('init', ['mkdir']);
  grunt.registerTask('default', ['babel','sass', 'postcss:dist']);
};
