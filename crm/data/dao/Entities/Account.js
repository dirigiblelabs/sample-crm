var query = require("db/v4/query");
var producer = require("messaging/v4/producer");
var daoApi = require("db/v4/dao");

var dao = daoApi.create({
	table: "CRM_ACCOUNT",
	properties: [
		{
			name: "Id",
			column: "ACCOUNT_ID",
			type: "INTEGER",
			id: true,
		}, {
			name: "Name",
			column: "ACCOUNT_NAME",
			type: "VARCHAR",
			required: true
		}, {
			name: "Country",
			column: "ACCOUNT_COUNTRY",
			type: "VARCHAR",
			required: true
		}, {
			name: "City",
			column: "INDUSTRY_CITY",
			type: "VARCHAR",
			required: true
		}, {
			name: "Street",
			column: "ACCOUNT_STREET",
			type: "VARCHAR",
			required: true
		}, {
			name: "Industry",
			column: "ACCOUNT_INDUSTRY",
			type: "INTEGER",
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
		table: "CRM_ACCOUNT",
		key: {
			name: "Id",
			column: "ACCOUNT_ID",
			value: id
		}
	});
	return id;
};

exports.update = function(entity) {
	dao.update(entity);
	triggerEvent("Update", {
		table: "CRM_ACCOUNT",
		key: {
			name: "Id",
			column: "ACCOUNT_ID",
			value: entity.Id
		}
	});
};

exports.delete = function(id) {
	dao.remove(id);
	triggerEvent("Delete", {
		table: "CRM_ACCOUNT",
		key: {
			name: "Id",
			column: "ACCOUNT_ID",
			value: id
		}
	});
};

exports.count = function() {
	return dao.count();
};

exports.customDataCount = function() {
	var resultSet = query.execute("SELECT COUNT(*) AS COUNT FROM CRM_ACCOUNT");
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
	producer.queue("crm/Entities/Account/" + operation).send(JSON.stringify(data));
}