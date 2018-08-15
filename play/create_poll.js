/*jslint node: true */
"use strict";
var headlessWallet = require('../start.js');
var eventBus = require('trustnote-pow-common/event_bus.js');

function onError(err){
	throw Error(err);
}

function createPoll(){
	var composer = require('trustnote-pow-common/composer.js');
	var network = require('trustnote-pow-common/network.js');
	var callbacks = composer.getSavingCallbacks({
		ifNotEnoughFunds: onError,
		ifError: onError,
		ifOk: function(objJoint){
			network.broadcastJoint(objJoint);
		}
	});

	// poll
	composer.composePollJoint("PYQJWUWRMUUUSUHKNJWFHSR5OADZMUYR", 'Should I stay or should I go?', ['stay', 'go'], headlessWallet.signer, callbacks);

	// vote
	//composer.composeVoteJoint("PYQJWUWRMUUUSUHKNJWFHSR5OADZMUYR", 'hash of unit the poll was created in', 'go', headlessWallet.signer, callbacks);
}

eventBus.on('headless_wallet_ready', createPoll);
