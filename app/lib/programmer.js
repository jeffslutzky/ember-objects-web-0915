import Ember from 'ember';




export default Ember.Object.extend({
	firstName: null,
	lastName: null,
	fullName: Ember.computed("firstName", "lastName", function(){
		return `${this.get("firstName")} ${this.get("lastName")}`;
	}),
	nickName: null,
	age: null,
	authorOf: null,
	conferences: [],

	greet: function(){
			return `Hi, My name is ${this.get("fullName")}. You can call me ${this.nickName}`;
		},

	isOld: Ember.computed.gt('age', 30),

	wroteRuby: Ember.computed.equal('authorOf', 'Ruby'),

	addConference: function(conference){
		this.conferences.push(conference);
	},

	keyNoteConferences: Ember.computed('conferences.@each.keyNote', function() {
		var conferences = this.get('conferences');
		return conferences.filterBy('keyNote', `${this.firstName} ${this.lastName}`);
	}),

	conferenceNames: Ember.computed.map('conferences', function(conference) {
				return conference.name;
			}),

	// conferenceTotal: Ember.computed.alias('conferences.length'),
	conferenceTotal: Ember.computed('conferences.@each.conference', function() {
		var conferences = this.get('conferences');
 		return conferences.length;
	}),

	// itinerary: Ember.computed("nickName", "conferenceTotal", function(){
	// return `${this.get('nickName')} is speaking at ${this.get('conferenceTotal')} conferences`;
	// }),

	itinerary: Ember.computed('conferences.@each.conference', function() {
		var conferences = this.get('conferences');
 		return `${this.nickName} is speaking at ${conferences.length} conferences`;
	}),

	hasValidEmail: Ember.computed.match('email', /^.+@.+\..+$/),

	hasFirstName: Ember.computed.notEmpty("firstName"),
	hasLastName: Ember.computed.notEmpty("lastName"),
	hasAge: Ember.computed.notEmpty("age"),

	isValid: Ember.computed.and('hasFirstName', 'hasLastName', 'hasAge', 'hasValidEmail'),

	isInvalid: Ember.computed.not('isValid'),

	errors: Ember.computed("hasAge", "hasFirstName", "hasLastName", "hasValidEmail", function(){
		let errors = [];
		if(!this.get("hasAge")){
			errors.pushObject("age cannot be blank");
		}
		if(!this.get("hasFirstName")){
			errors.pushObject("firstName cannot be blank");
		}
		if(!this.get("hasLastName")){
			errors.pushObject("lastName cannot be blank");
		}
		if(!this.get("hasValidEmail")){
			errors.pushObject("email must be valid");
		}
		return errors;
	}),

	hasErrors: Ember.computed.notEmpty('errors'),

});
