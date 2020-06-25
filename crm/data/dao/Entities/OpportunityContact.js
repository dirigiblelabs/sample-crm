var query = require("db/v4/query");
var producer = require("messaging/v4/producer");
var daoApi = require("db/v4/dao");

var dao = daoApi.create({
	table: "OPPORTUNITYCONTACT",
	properties: [
		{
			name: "Id",
			column: "ID",
			type: "INTEGER",
			id: true,
		}, {
			name: "OpportunityId",
			column: "OPPORTUNITYID",
			type: "INTEGER",
		}, {
			name: "FirstName",
			column: "FIRSTNAME",
			type: "VARCHAR",
		}, {
			name: "LastName",
			column: "LASTNAME",
			type: "VARCHAR",
		}, {
			name: "Phone",
			column: "PHONE",
			type: "VARCHAR",
		}, {
			name: "Email",
			column: "EMAIL",
			type: "VARCHAR",
		}, {
			name: "Country",
			column: "COUNTRY",
			type: "VARCHAR",
		}, {
			name: "City",
			column: "CITY",
			type: "VARCHAR",
		}, {
			name: "Street",
			column: "STREET",
			type: "VARCHAR",
		}]
});

exports.list = function(settings) {
	return dao.list(settings);
};

exports.get = function(id) {
	return dao.find(id);
};

exports.create = function(entity) {
	var id = dao.insert(entity);
	triggerEvent("Create", {
		table: "OPPORTUNITYCONTACT",
		key: {
			name: "Id",
			column: "ID",
			value: id
		}
	});
	return id;
};

exports.update = function(entity) {
	dao.update(entity);
	triggerEvent("Update", {
		table: "OPPORTUNITYCONTACT",
		key: {
			name: "Id",
			column: "ID",
			value: entity.Id
		}
	});
};

exports.delete = function(id) {
	dao.remove(id);
	triggerEvent("Delete", {
		table: "OPPORTUNITYCONTACT",
		key: {
			name: "Id",
			column: "ID",
			value: id
		}
	});
};

exports.count = function() {
	return dao.count();
};

exports.customDataCount = function() {
	var resultSet = query.execute("SELECT COUNT(*) FROM OPPORTUNITYCONTACT");
	if (resultSet !== null && resultSet[0] !== null) {
		if (resultSet[0].COUNT !== undefined && resultSet[0].COUNT !== null) {
			return resultSet[0].COUNT;
		} else if (resultSet[0].count !== undefined && resultSet[0].count !== null) {
			return resultSet[0].count;
		}
	}
	return 0;
};

function triggerEvent(operation, data) {
	producer.queue("crm/Entities/OpportunityContact/" + operation).send(JSON.stringify(data));
}