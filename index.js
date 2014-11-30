'use strict'

var _ = require('underscore'),
req = require('request'),
qs = require('querystring'),
con = require('./cloudns.json')

function Cloudns (id, pass) {
	this.id = id
	this.pass = pass
	this.base = con.routes.base
	this.httpOptions = con.httpOptions
}
var Cl = Cloudns.prototype

Cl.recordsList = function (domain, callback) {
	this.httpOptions.url = this.composeUrl({'domain-name': domain }, con.routes.records.list)
	this.postRequest(this.httpOptions, function (error, data) { callback(error, data) })
}
Cl.recordsAdd = function (domain, type, params, callback) {
	if (this.testRecordType(type)) {
		if (!!! _.isNull(params.record) && !!! _.isNull(params.host) && !!! _.isNull(params.ttl)) {
			params['domain-name'] = domain
			params['record-type'] = type
			this.httpOptions.url = this.composeUrl(params, con.routes.records.add)
			this.postRequest(this.httpOptions, function (error, data) { callback(error, data) })
		} else { callback('Required Input Missing', null) }
	} else { callback('Record Type Not Supported', null) }
}
Cl.recordsDelete = function (domain, id, callback) {
	this.httpOptions.url = this.composeUrl({'domain-name': domain, 'record-id': id }, con.routes.records.remove)
	this.postRequest(this.httpOptions, function (error, data) { callback(error, data) })
}
Cl.recordsModify = function (domain, id, params, callback) {
	if (!!! _.isNull(params.record) && !!! _.isNull(params.host) && !!! _.isNull(params.ttl)) {
		params['domain-name'] = domain
		params['record-id'] = id
		this.httpOptions.url = this.composeUrl(params, con.routes.records.modify)
		this.postRequest(this.httpOptions, function (error, data) { callback(error, data) })
	} else { callback('Required Input Missing', null) }
}
Cl.recordsCopy = function (domain, targetDomain, deleteRecords, callback) {
	this.httpOptions.url = this.composeUrl({ 'domain-name': domain, 'from-domain': targetDomain, 'delete-current-records': deleteRecords }, con.routes.records.copy)
	this.postRequest(this.httpOptions, function (error, data) { callback(error, data) })
}
Cl.recordsDetailsSOA = function (domain, callback) {
	this.httpOptions.url = this.composeUrl({ 'domain-name': domain }, con.routes.records.detailsSOA)
	this.postRequest(this.httpOptions, function (error, data) { callback(error, data) })
}
Cl.recordsModifySOA = function (domain, params, callback) {
	if (!!! _.isUndefined(params) || params.length < 1) { var params = {} }
	params['domain-name'] = domain
	this.httpOptions.url = this.composeUrl(params, con.routes.records.modifySOA)
	this.postRequest(this.httpOptions, function (error, data) { callback(error, data) })
}
Cl.recordsDynamicURL = function (domain, callback) {
	this.httpOptions.url = this.composeUrl({ 'domain-name': domain }, con.routes.records.dynamicURL)
	this.postRequest(this.httpOptions, function (error, data) { callback(error, data) })
}

Cl.nameserverList = function (callback) {
	this.httpOptions.url = this.composeUrl({}, con.routes.nameserver.list)
	this.postRequest(this.httpOptions, function (error, data) { callback(error, data) })
}
Cl.nameserverStatus = function (domain, callback) {
	this.httpOptions.url = this.composeUrl({ 'domain-name': domain }, con.routes.nameserver.status)
	this.postRequest(this.httpOptions, function (error, data) { callback(error, data) })
}
Cl.nameserverUpdated = function (domain, callback) {
	this.httpOptions.url = this.composeUrl({ 'domain-name': domain }, con.routes.nameserver.updated)
	this.postRequest(this.httpOptions, function (error, data) { callback(error, data) })
}

Cl.zonesStats = function (callback) {
	this.httpOptions.url = this.composeUrl({ }, con.routes.zones.stats)
	this.postRequest(this.httpOptions, function (error, data) { callback(error, data) })
}
Cl.zonesList = function (callback, page, rows) {
	this.httpOptions.url = this.composeUrl({ 'page': page, 'rows-per-page': rows }, con.routes.zones.list)
	this.postRequest(this.httpOptions, function (error, data) { callback(error, data) })
}
Cl.zonesSearch = function (callback, page, rows, search) {
	this.httpOptions.url = this.composeUrl({ 'page': page, 'rows-per-page': rows, 'search': search }, con.routes.zones.list)
	this.postRequest(this.httpOptions, function (error, data) { callback(error, data) })
}
Cl.zonesPages = function (rows, callback) {
	this.httpOptions.url = this.composeUrl({ 'rows-per-page': rows }, con.routes.zones.pages)
	this.postRequest(this.httpOptions, function (error, data) { callback(error, data) })
}
Cl.zonesPagesSearch = function (rows, search, callback) {
	this.httpOptions.url = this.composeUrl({ 'rows-per-page': rows, 'search': search }, con.routes.zones.pages)
	this.postRequest(this.httpOptions, function (error, data) { callback(error, data) })
}

Cl.zoneDelete = function (domain, callback) {
	this.httpOptions.url = this.composeUrl({ 'domain-name': domain }, con.routes.zone.remove)
	this.postRequest(othis.httpOptions, function (error, data) { callback(error, data) })
}
Cl.zoneAdd = function (domain, zonetype, params, callback) {
	this.httpOptions.url = this.composeUrl({ 'domain-name': domain, 'zone-type': zonetype }, con.routes.zone.remove)
	this.postRequest(this.httpOptions, function (error, data) { callback(error, data) })
}
Cl.zoneAxfrAdd = function (domain, ip, callback) {
	this.httpOptions.url = this.composeUrl({ 'domain-name': domain, 'ip': ip }, con.routes.zone.axfradd)
	this.postRequest(this.httpOptions, function (error, data) { callback(error, data) })
}
Cl.zoneAxfrDelete = function (domain, id, callback) {
	this.httpOptions.url = this.composeUrl({ 'domain-name': domain, 'id': id }, con.routes.zone.axfrremove)
	this.postRequest(this.httpOptions, function (error, data) { callback(error, data) })
}
Cl.zoneAxfrList = function (domain, callback) {
	this.httpOptions.url = this.composeUrl({ 'domain-name': domain }, con.routes.zone.axfrlist)
	this.postRequest(this.httpOptions, function (error, data) { callback(error, data) })
}
Cl.zoneMasterList = function (domain, callback) {
	this.httpOptions.url = this.composeUrl({ 'domain-name': domain }, con.routes.zone.masterlist)
	this.postRequest(this.httpOptions, function (error, data) { callback(error, data) })
}
Cl.zoneMasterAdd = function (domain, ip, callback) {
	this.httpOptions.url = this.composeUrl({ 'domain-name': domain, 'master-ip': ip }, con.routes.zone.masterlist)
	this.postRequest(this.httpOptions, function (error, data) { callback(error, data) })
}
Cl.zoneMasterDelete = function (domain, id, callback) {
	this.httpOptions.url = this.composeUrl({ 'domain-name': domain, 'master-id': id }, con.routes.zone.masterlist)
	this.postRequest(this.httpOptions, function (error, data) { callback(error, data) })
}

Cl.mailForwardList = function (domain, callback) {
	this.httpOptions.url = this.composeUrl({ 'domain-name': domain }, con.routes.mail.list)
	this.postRequest(this.httpOptions, function (error, data) { callback(error, data) })
}
Cl.mailForwardAdd = function (domain, box, host, destination, callback) {
	if (this.testEmail(destination)) {
		this.httpOptions.url = this.composeUrl({ 'domain-name': domain, 'box': box, 'host': host, 'destination': destination }, con.routes.mail.add)
		this.postRequest(this.httpOptions, function (error, data) { callback(error, data) })
	} else { callback('Invalid Email', null) }
}
Cl.mailForwardDelete = function (domain, id, callback) {
	this.httpOptions.url = this.composeUrl({ 'domain-name': domain, 'mail-forward-id': id }, con.routes.mail.remove)
	this.postRequest(this.httpOptions, function (error, data) { callback(error, data) })
}

Cl.cloudDomainAdd = function (domain, clouddomain, callback) {
	this.httpOptions.url = this.composeUrl({ 'domain-name': domain, 'cloud-domain-name': clouddomain }, con.routes.cloud.add)
	this.postRequest(this.httpOptions, function (error, data) { callback(error, data) })
}
Cl.cloudDomainDelete = function (clouddomain, callback) {
	this.httpOptions.url = this.composeUrl({ 'domain-name': clouddomain }, con.routes.cloud.remove)
	this.postRequest(this.httpOptions, function (error, data) { callback(error, data) })
}
Cl.cloudDomainChangeMaster = function (clouddomain, callback) {
	this.httpOptions.url = this.composeUrl({ 'domain-name': clouddomain }, con.routes.cloud.remove)
	this.postRequest(this.httpOptions, function (error, data) { callback(error, data) })
}
Cl.cloudDomainList = function (domain, callback) {
	this.httpOptions.url = this.composeUrl({ 'domain-name': domain, 'cloud-domain-name': clouddomain }, con.routes.cloud.list)
	this.postRequest(this.httpOptions, function (error, data) { callback(error, data) })
}

Cl.composeUrl = function (source, url) { return this.base + url + '?' + this.composeAuth(source) }
Cl.composeAuth = function (source) { return qs.stringify({ 'auth-id': this.id, 'auth-password': this.pass}).toString('utf8') + '&' + qs.stringify(source).toString('utf8') }
Cl.testRecordType = function (recordType) { return (/^(A|CNAME|MX|TXT|SPF|AAAA|NS|SRV|SSHFP|WR|RP|PTR)$/).test(recordType) }
Cl.testEmail = function (email) { return (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email) }
Cl.postRequest = function (source, callback) {
	req(source, function (error, response, body) {
		if (!!! _.isNull(error) || !!! _.isUndefined(error)) { callback(null, body) } else { callback(error, null) }
	})
}

module.exports = {
	Cloudns: Cloudns,
	createClient: function (options) {
		if (arguments.length === 2) {
			var args = Array.prototype.slice.call(arguments)
			options = { id: args[0], pass: args[1] }
		}
		return new Cloudns(options.id, options.pass);
	}
}