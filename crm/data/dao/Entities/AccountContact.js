var query = require("db/v4/query");
var producer = require("messaging/v4/producer");
var daoApi = require("db/v4/dao");

var dao = daoApi.create({
	table: "CRM_ACCOUNT_CONTACT",
	properties: [
		{
			name: "Id",
			column: "ACCOUNT_CONTACT_ID",
			type: "INTEGER",
			id: true,
		}, {
			name: "AccountId",
			column: "ACCOUNT_CONTACT_ACCOUNT",
			type: "INTEGER",
		}, {
			name: "FirstName",
			column: "ACCOUNT_CONTACT_FIRST_NAME",
			type: "VARCHAR",
		}, {
			name: "LastName",
			column: "ACCOUNT_CONTACT_LAST_NAME",
			type: "VARCHAR",
		}, {
			name: "Phone",
			column: "ACCOUNT_CONTACT_PHONE",
			type: "VARCHAR",
		}, {
			name: "Email",
			column: "ACCOUNT_CONTACT_EMAIL",
			type: "VARCHAR",
		}, {
			name: "Country",
			column: "ACCOUNT_CONTACT_COUNTRY",
			type: "VARCHAR",
		}, {
			name: "City",
			column: "ACCOUNT_CONTACT_CITY",
			type: "VARCHAR",
		}, {
			name: "Street",
			column: "ACCOUNT_CONTACT_STREET",
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
		table: "CRM_ACCOUNT_CONTACT",
		key: {
			name: "Id",
			column: "ACCOUNT_CONTACT_ID",
			value: id
		}
	});
	return id;
};

exports.update = function(entity) {
	dao.update(entity);
	triggerEvent("Update", {
		table: "CRM_ACCOUNT_CONTACT",
		key: {
			name: "Id",
			column: "ACCOUNT_CONTACT_ID",
			value: entity.Id
		}
	});
};

exports.delete = function(id) {
	dao.remove(id);
	triggerEvent("Delete", {
		table: "CRM_ACCOUNT_CONTACT",
		key: {
			name: "Id",
			column: "ACCOUNT_CONTACT_ID",
			value: id
		}
	});
};

exports.count = function() {
	return dao.count();
};

exports.customDataCount = function() {
	var resultSet = query.execute("SELECT COUNT(*) FROM AS COUNT CRM_ACCOUNT_CONTACT");
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
	producer.queue("crm/Entities/AccountContact/" + operation).send(JSON.stringify(data));
}