var query = require("db/v4/query");
var producer = require("messaging/v4/producer");
var daoApi = require("db/v4/dao");

var dao = daoApi.create({
	table: "CRM_OPPORTUNITY_CONTACT",
	properties: [
		{
			name: "Id",
			column: "OPPORTUNITY_CONTACT_ID",
			type: "INTEGER",
			id: true,
		}, {
			name: "Opportunity",
			column: "OPPORTUNITY_CONTACT_OPPORTUNITY",
			type: "INTEGER",
			required: true
		}, {
			name: "FirstName",
			column: "OPPORTUNITY_CONTACT_FIRST_NAME",
			type: "VARCHAR",
			required: true
		}, {
			name: "LastName",
			column: "OPPORTUNITY_CONTACT_LAST_NAME",
			type: "VARCHAR",
			required: true
		}, {
			name: "Phone",
			column: "OPPORTUNITY_CONTACT_PHONE",
			type: "VARCHAR",
		}, {
			name: "Email",
			column: "OPPORTUNITY_CONTACT_EMAIL",
			type: "VARCHAR",
			required: true
		}, {
			name: "Country",
			column: "OPPORTUNITY_CONTACT_COUNTRY",
			type: "VARCHAR",
			required: true
		}, {
			name: "City",
			column: "OPPORTUNITY_CONTACT_CITY",
			type: "VARCHAR",
			required: true
		}, {
			name: "Street",
			column: "OPPORTUNITY_CONTACT_STREET",
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
		table: "CRM_OPPORTUNITY_CONTACT",
		key: {
			name: "Id",
			column: "OPPORTUNITY_CONTACT_ID",
			value: id
		}
	});
	return id;
};

exports.update = function(entity) {
	dao.update(entity);
	triggerEvent("Update", {
		table: "CRM_OPPORTUNITY_CONTACT",
		key: {
			name: "Id",
			column: "OPPORTUNITY_CONTACT_ID",
			value: entity.Id
		}
	});
};

exports.delete = function(id) {
	dao.remove(id);
	triggerEvent("Delete", {
		table: "CRM_OPPORTUNITY_CONTACT",
		key: {
			name: "Id",
			column: "OPPORTUNITY_CONTACT_ID",
			value: id
		}
	});
};

exports.count = function() {
	return dao.count();
};

exports.customDataCount = function() {
	var resultSet = query.execute("SELECT COUNT(*) AS COUNT FROM CRM_OPPORTUNITY_CONTACT");
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
	producer.queue("crm/Sales/OpportunityContact/" + operation).send(JSON.stringify(data));
}