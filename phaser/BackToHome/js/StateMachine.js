// Simple State Machine
// Adapted from Joshua Shepard: https://github.com/jcd-as/nadion/blob/master/src/statemachine.js
// Additional annotations by Johannes Spaulding and Nathan Altice 

// State Machine constructor function
var StateMachine = function(states, receiver) {
	this.states = states; 			// JSON object that holds all states
	this.receiver = receiver; 		// the object that "receives" the state
	this.initialState = undefined; 	// the object's initial state
	this.indices = {}; 				// array used for fast lookup of events and states

	// initialize indices and find the initial state
	for (var i = 0; i < states.length; i++) {
		this.indices[this.states[i].name] = i;
		if (this.states[i].initial)
			this.initialState = this.states[i];
	}
	// warn if there's no initial state
	if (!this.initialState) {
		console.warn("State Machine has no initial state!");
	}
	// set current state to initial state
	this.currentState = this.initialState;
};

StateMachine.prototype = {
	// consume an event (e) and cause a new state to be entered
	consumeEvent: function(e) {
		if (this.currentState.events[e]) {
			this.currentState = this.states[this.indices[this.currentState.events[e]]];
		} else {
			console.warn("State Machine called with invalid event: '" + e + "' for current state: '" + this.currentState.name + "'." );
		}
	},
	// retrieve the name of the current state
	getState: function () {
		return this.currentState;
	},
	// reset the state machine to its initial state
	reset: function () {
		this.currentState = this.initialState;
	}
}