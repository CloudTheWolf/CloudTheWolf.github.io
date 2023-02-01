'use strict';

let buffer = [];
let officersInvolved = new Set();
let alreadySpecifiedRobbery = false;
let ROBBERY_STATE = 'JEWLERY';

function report() {
	const ind = "        ";
	let date = new Date().toLocaleDateString('en-US');

	buffer = [];

	let username = document.getElementById('username').value;
	let banby = document.getElementById('banby').value;
	let banon = document.getElementById('banon').value;
	let banreason = document.getElementById('banreason').value;
	
	let bannotes = $('textarea#bannotes').val();
	if(bannotes == "" || bannotes == null) bannotes = "None"
	bannotes = urlify(bannotes)

	let panelhistory = $('textarea#panelhistory').val();
	if(panelhistory == "" || panelhistory == null) panelhistory = "None"
	panelhistory = urlify(panelhistory)

	let why = urlify($('textarea#why').val());
	let what = urlify($('textarea#what').val());
	let mynotes = urlify($('textarea#mynotes').val());
	
	let appeal = document.getElementById('appeal').value
	let pannel = document.getElementById('panel').value


	if (username || banby) buffer.push('');
	
	if (username || banby || banon || banreason) buffer.push(`__**Username**__`);
	if (username) buffer.push(`${username}`);
	buffer.push('');
	buffer.push(`__**Ban Details**__`);
	if (banby) buffer.push(`**Banned By:** ${banby}`);
	if (banon) buffer.push(`**Banned On:** ${banon}`);
	if (banreason) buffer.push(`**Ban Reason**: ${banreason}`);
		
	//let bannotes = document.getElementById('bannotes').value.trim();	
		
	buffer.push(`**Ban Notes**:`);
	buffer.push(`${bannotes}`);
	
	buffer.push('');
	buffer.push(`__**Panel History**__`);
	buffer.push(`${panelhistory}`);
	buffer.push('');
	buffer.push('__**Why should you be unbanned?:**__');
	buffer.push(`${why}`);
	buffer.push('');
	buffer.push('__**What would you be able to give back to the server if you were unbanned?**__');
	buffer.push(`${what}`);
	buffer.push('');
	buffer.push('__**My Notes**__');
	buffer.push(`${mynotes}`);
	buffer.push('');
	buffer.push('__**Links**__');
	buffer.push(`**Appeal:**<${appeal}>`);
	buffer.push(`**Panel:**<${pannel}>`);
	buffer.push('');
	buffer.push('( :GreenTick: ) Unban');
	buffer.push('( :Neutral: ) 2 Week Deny');
	buffer.push('( :three: ) 3 Month Deny');
	buffer.push('( :RedTick: ) 6 Month Deny');

	return document.getElementById('reportBody').innerHTML = buffer.join("\n");
}

function urlify(text) {
	
	var urlRegex = /((http|https):\/\/[^\s]+)/gm;
	return text.replace(urlRegex, '<$1>')
  }

let inputs = document.querySelectorAll('input[type="text"], input[type="text2"], input[type="number"], textarea');
inputs.forEach(i => i.addEventListener('keyup', report, false));

let checkboxes = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');
checkboxes.forEach(i => i.addEventListener('click', report, false));

let selectOptions = document.querySelectorAll('select');
selectOptions.forEach(i => i.addEventListener('click', report, false));

let datepicker = document.querySelectorAll('input[type="date"]');
datepicker.forEach(i => i.addEventListener('change', report, false));

function showCopiedPopup() {
	let popup = document.getElementById("myPopup");
	popup.classList.toggle("show");
	setTimeout(function() {
		popup.classList.toggle("show");
	}, 3500);
}

document.getElementById('copyReport').addEventListener('click', copy, false);
function clearSelection() {
	if (window.getSelection) {
		window.getSelection().removeAllRanges();
	} else if (document.selection) {
		document.selection.empty();
	}
}
function copy() {
	document.getElementById('reportBody').select();
	try {
		document.execCommand('copy');
		showCopiedPopup();
		clearSelection();
	} catch(e) {
		console.log("Copy error: " + e);
	}
}
