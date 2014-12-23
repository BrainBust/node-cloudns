#node-cloudns
============

> Nodejs Library for https://www.cloudns.net/api-help/

##Init

> npm install node-cloudns

```javascript	
	var cloudns = require('node-cloudns').createClient(authID, authPASS)	
```

##Methods

###Records


#### List Records

>List of records in the domain zone
>
>**Note**: This function is available only for master zones. Works with reverse zones too.

**cloudns.recordsList (domain, callback)**
	
```javascript
cloudns.recordsList('domain.com', function (error, data) {
	if (error) { }
	else {}
})
```
---
#### Add Record

>Add new record to domain zone.
>
>**Note**: This function is available only for master zones. Works with reverse zones too.

**cloudns.recordsAdd (domain, type, params, callback)**

```javascript
cloudns.recordsAdd('domain.com', 'A', { record: '127.0.0.1', host: '@', ttl: 300}, function (error, data) {
	if (error) { }
	else {}
})
```
---
#### Remove Record

>Delete record of your domain zone.
>
>**Note**: This function is available only for master zones. Works with reverse zones too.

**cloudns.recordsDelete (domain, id, callback)**
	
```javascript
cloudns.recordsDelete('domain.com', 15, function (error, data) {
	if (error) { }
	else {}
})
```
#### Modify Record

>Modify record in domain zone.
>
>**Note 1**: This function is available only for master zones. Works with reverse zones too.
>**Note 2**: With this function you can't modify the record type.

** cloudns.recordsModify (domain, id, params, callback)**
	
```javascript
cloudns.recordsModify('domain.com', 15, { record: '127.0.0.1', host: '@', ttl: 300}, function (error, data) {
	if (error) { }
	else {}
})
```
---
#### Copy Records

>Copies all the records from a specified zone.
>
>**Note**: This function is available only for master zones.

**cloudns.recordsCopy (domain, targetDomain, deleteRecords, callback)**

```javascript
cloudns.recordsCopy('domain.com', 'domain.net', 0, function (error, data) {
	if (error) { }
	else {}
})
```
* Change deleteRecords from 0 to 1 to delete copied records from the old domain
---
#### SOA Details

>Getting SOA details.
>
>**Note**: This function is available only for master zones. Works with reverse zones too.

**cloudns.recordsDetailsSOA(domain, callback)**

```javascript
cloudns.recordsDetailsSOA('domain.com', function (error, data) {
	if (error) { }
	else {}
})
```
---
#### Get Dynamic Url

> Gets the DynamicURL of a given record.
>
>**Note**: This function is available only for A and AAAA record types.

**cloudns.recordsDynamicURL(domain, callback)**

```javascript
cloudns.recordsDynamicURL('domain.com', function (error, data) {
	if (error) { }
	else {}
})
```

### NameServers

### Available Nameservers

> Get a list with available domain name servers.
>

**cloudns.nameserverList(domain, callback)**

```javascript
cloudns.nameserverList('domain.com', function (error, data) {
	if (error) { }
	else {}
})
```
---
### Update Status

> Get a list with name servers and information for update status of the domain name. Works with reverse zones too.
>

**cloudns.nameserverStatus(domain, callback)**

```javascript
cloudns.nameserverStatus('domain.com', function (error, data) {
	if (error) { }
	else {}
})
```
---
### Updated Nameserver Check

> Check whether dns zone is updated on all servers. Works with reverse zones too.
>

**cloudns.nameserverUpdated(domain, callback)**

```javascript
cloudns.nameserverUpdated('domain.com', function (error, data) {
	if (error) { }
	else {}
})
```
