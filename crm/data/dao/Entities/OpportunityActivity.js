var query = require("db/v4/query");
var producer = require("messaging/v4/producer");
var daoApi = require("db/v4/dao");
var EntityUtils = require("crm/data/utils/EntityUtils");

var dao = daoApi.create({
	table: "CRM_OPPORTUNITY_ACTIVITY",
	properties: [
		{
			name: "Id",
			column: "OPPORTUNITY_ACTIVITY_ID",
			type: "INTEGER",
			id: true,
		}, {
			name: "Opportunity",
			column: "OPPORTUNITY_ACTIVITY_OPPORTUNITY",
			type: "INTEGER",
		}, {
			name: "Account",
			column: "OPPORTUNITY_ACTIVITY_ACCOUNT",
			type: "INTEGER",
		}, {
			name: "Date",
			column: "OPPORTUNITY_ACTIVITY_DATE",
			type: "DATE",
		}, {
			name: "Status",
			column: "OPPORTUNITY_ACTIVITY_STATUS",
			type: "VARCHAR",
		}]
});

exports.list = function(settings) {
	return dao.list(settings).map(function(e) {
		EntityUtils.setLocalDate(e, "Date");
		return e;
	});
};

exports.get = function(id) {
	var entity = dao.find(id);
	EntityUtils.setLocalDate(entity, "Date");
	return entity;
};

exports.create = function(entity) {
	EntityUtils.setLocalDate(entity, "Date");
	var id = dao.insert(entity);
	triggerEvent("Create", {
		table: "CRM_OPPORTUNITY_ACTIVITY",
		key: {
			name: "Id",
			column: "OPPORTUNITY_ACTIVITY_ID",
			value: id
		}
	});
	return id;
};

exports.update = function(entity) {
	EntityUtils.setLocalDate(entity, "Date");
	dao.update(entity);
	triggerEvent("Update", {
		table: "CRM_OPPORTUNITY_ACTIVITY",
		key: {
			name: "Id",
			column: "OPPORTUNITY_ACTIVITY_ID",
			value: entity.Id
		}
	});
};

exports.delete = function(id) {
	dao.remove(id);
	triggerEvent("Delete", {
		table: "CRM_OPPORTUNITY_ACTIVITY",
		key: {
			name: "Id",
			column: "OPPORTUNITY_ACTIVITY_ID",
			value: id
		}
	});
};

exports.count = function() {
	return dao.count();
};

exports.customDataCount = function() {
	var resultSet = query.execute("SELECT COUNT(*) AS COUNT FROM CRM_OPPORTUNITY_ACTIVITY");
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
	producer.queue("crm/Entities/OpportunityActivity/" + operation).send(JSON.stringify(data));
}