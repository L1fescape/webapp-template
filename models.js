// connect to database
var db = require('./conn').db,
    orm = require('orm');
		_ = require('underscore'),
		models = {};

// Sample model definition. In this case a User.
models.user = db.define("User", {
	myVar1        :   { type : 'text', required : true },
	myVar2   :   String
}, {
	methods: {
		serialize : function() {
			return serialize(this);
		}
	},
	validations : {
		myVar1		:	[
			orm.validators.unique('myVar1 not unique'),
			orm.validators.notEmptyString('myVar1 cannot be an empty string')
		],
		myVar2	:	[
			orm.validators.notEmptyString('myVar2 cannot be an empty string'),
		]
	}
});

// Sample model definition. In this case a Session.
models.session = db.define("Session", {
	user_id		:	{ type : 'number', rational : false, unsigned : true },
	expiration	:	{ type : 'number', rational : false },
	uuid		:	String
}, {
	methods: {
		serialize : function() {
			return serialize(this);
		}
	}
});

function serialize(mod) {
	var obj = {};
	_.each(mod, function(value, key) {
		obj[key] = value;
	});
	return JSON.stringify(obj);
}

// export all models
exports.models = models;
