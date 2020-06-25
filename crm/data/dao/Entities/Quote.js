var query = require("db/v4/query");
var producer = require("messaging/v4/producer");
var daoApi = require("db/v4/dao");

var dao = daoApi.create({
	table: "QUOTE",
	properties: [
		{
			name: "Id",
			column: "ID",
			type: "INTEGER",
			id: true,
		}, {
			name: "Account",
			column: "ACCOUNT",
			type: "INTEGER",
		}, {
			name: "Ammount",
			column: "AMMOUNT",
			type: "VARCHAR",
		}, {
			name: "Curency",
			column: "CURENCY",
			type: "VARCHAR",
		}, {
			name: "Discount",
			column: "DISCOUNT",
			type: "VARCHAR",
		}, {
			name: "Product",
			column: "PRODUCT",
			type: "INTEGER",
		}, {
			name: "UoM",
			column: "UOM",
			type: "INTEGER",
		}, {
			name: "Quantity",
			column: "QUANTITY",
			type: "VARCHAR",
		}, {
			name: "Status",
			column: "STATUS",
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
		table: "QUOTE",
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
		table: "QUOTE",
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
		table: "QUOTE",
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
	var resultSet = query.execute("SELECT COUNT(*) FROM QUOTE");
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