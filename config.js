System.config({
	"paths": {
		"*": "*.js",
		"npm:*": "jspm_packages/npm/*.js",
		"github:*": "jspm_packages/github/*.js"
	}
});

System.config({
	"map": {
		"bourbon": "npm:bourbon@4.2.1",
		"object.observe": "npm:object.observe@0.2.3",
		"observe-plus": "npm:observe-plus@2.1.0",
		"github:jspm/nodelibs-process@0.1.1": {
			"process": "npm:process@0.10.1"
		},
		"npm:asap@1.0.0": {
			"process": "github:jspm/nodelibs-process@0.1.1"
		},
		"npm:observe-plus@2.1.0": {
			"asap": "npm:asap@1.0.0"
		}
	}
});
