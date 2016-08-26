/*global require:true*/
/*global __dirname:true*/
(function( exports ){
	"use strict";

	var path = require( "path" );
	var critical = require(path.join( "..", "..", "critical.js") );

	function testDefs(test, opts) {
		test.expect(1);

		var result = critical
					.restoreOriginalDefs(opts.original, opts.critical, { compress: true });

		test.equal(result, opts.expected.replace(/\s/g, ""));
		test.done();
	}

	exports.restoreOriginalDefs = {
		"adds stripped definitions": function(test) {
			testDefs(test, {
				original: "body { color: red; }",
				critical: "body {}",
				expected: "body { color:red; }"
			});
		},

		"adds muliple stripped definitions": function(test) {
			testDefs(test, {
				original: "body { color: red; font-size: 20px; }",
				critical: "body {}",
				expected: "body { color:red; font-size:20px; }"
			});
		},

		"does not include removed selectors": function(test) {
			testDefs(test, {
				original: "body { color: red; } div.removed {}",
				critical: "body {}",
				expected: "body { color:red; }"
			});
		}
	};
}(typeof exports === "object" && exports || this));
