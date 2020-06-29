var query = require("db/v4/query");
var producer = require("messaging/v4/producer");
var daoApi = require("db/v4/dao");

var dao = daoApi.create({
	table: "CRM_QUOTE",
	properties: [
		{
			name: "Id",
			column: "QUOTE_ID",
			type: "INTEGER",
			id: true,
		}, {
			name: "Account",
			column: "QUOTE_ACCOUNT",
			type: "INTEGER",
		}, {
			name: "Ammount",
			column: "QUOTE_AMMOUNT",
			type: "DOUBLE",
		}, {
			name: "Discount",
			column: "QUOTE_DISCOUNT",
			type: "DOUBLE",
		}, {
			name: "Product",
			column: "QUOTE_PRODUCT",
			type: "INTEGER",
		}, {
			name: "UoM",
			column: "QUOTE_UOM",
			type: "INTEGER",
		}, {
			name: "Quantity",
			column: "QUOTE_QUANTITY",
			type: "DOUBLE",
		}, {
			name: "Status",
			column: "QUOTE_STATUS",
			type: "VARCHAR",
		}, {
			name: "Currency",
			column: "QUOTE_CURRENCY",
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
		table: "CRM_QUOTE",
		key: {
			name: "Id",
			column: "QUOTE_ID",
			value: id
		}
	});
	return id;
};

exports.update = function(entity) {
	dao.update(entity);
	triggerEvent("Update", {
		table: "CRM_QUOTE",
		key: {
			name: "Id",
			column: "QUOTE_ID",
			value: entity.Id
		}
	});
};

exports.delete = function(id) {
	dao.remove(id);
	triggerEvent("Delete", {
		table: "CRM_QUOTE",
		key: {
			name: "Id",
			column: "QUOTE_ID",
			value: id
		}
	});
};

exports.count = function() {
	return dao.count();
};

exports.customDataCount = function() {
	var resultSet = query.execute("SELECT COUNT(*) AS COUNT FROM CRM_QUOTE");
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
	producer.queue("crm/Entities/Quote/" + operation).send(JSON.stringify(data));
}