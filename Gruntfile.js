module.exports = function(grunt) {
	
	var requireConfig = {
		baseUrl: 'src/',
		paths: {
			text: "libs/requirejs-text/text",
			jquery: 'libs/jquery/dist/jquery',
			underscore: "libs/underscore/underscore",
			handlebars: "libs/handlebars/handlebars",
			test: "../test/",
			backbone: "libs/backbone/backbone"
		}
	};
		
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			all: [
				"Gruntfile.js",
				"package.json",
				"src/**/*.js",
				"!src/libs/**",
				"test/**/*.js"
			]
		},
		requirejs: {
			compile: {
				options: {
					baseUrl: requireConfig.baseUrl,
					paths: requireConfig.paths,
					out: "dist/optimized.js",
					name: "BackboneGridView",
				}
			}
		},
		jasmine: {
			customTemplate: {
				options: {
					specs: 'test/spec/*.js',
					helpers: 'test/helpers/**/*.js',
					template: require('grunt-template-jasmine-requirejs'),
					templateOptions: {
						requireConfig: requireConfig
					},
					vendor: [
						"https://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.17/require.min.js",
						"http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"
					]
				}
			}
		},
		bower: {
			install: {}
		}
	});

	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-requirejs');

	grunt.registerTask("install", ["bower:install", "jasmine"]);
	grunt.registerTask("test", ["jasmine"]);
	grunt.registerTask("package", ["requirejs"]);
};

