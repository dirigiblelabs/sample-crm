var query = require("db/v4/query");
var producer = require("messaging/v4/producer");
var daoApi = require("db/v4/dao");
var user = require("security/v4/user");

function ForbiddenError(message) {
    this.name = "ForbiddenError";
    this.message = message;
    this.stack = (new Error()).stack;
}

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
			required: true
		}, {
			name: "Ammount",
			column: "QUOTE_AMMOUNT",
			type: "DOUBLE",
			required: true
		}, {
			name: "Discount",
			column: "QUOTE_DISCOUNT",
			type: "DOUBLE",
		}, {
			name: "Product",
			column: "QUOTE_PRODUCT",
			type: "INTEGER",
			required: true
		}, {
			name: "UoM",
			column: "QUOTE_UOM",
			type: "INTEGER",
			required: true
		}, {
			name: "Quantity",
			column: "QUOTE_QUANTITY",
			type: "DOUBLE",
			required: true
		}, {
			name: "Status",
			column: "QUOTE_STATUS",
			type: "VARCHAR",
		}, {
			name: "Currency",
			column: "QUOTE_CURRENCY",
			type: "INTEGER",
			required: true
		}]
});

exports.list = function(settings) {
	return dao.list(settings).map(function(e) {
		if (!user.isInRole("manager")) {
			delete e.Status;
		}
		return e;
	});
};

exports.get = function(id) {
	var entity = dao.find(id);
	if (!user.isInRole("manager")) {
		delete entity.Status;
	}
	return entity;
};

exports.create = function(entity) {
	if (!user.isInRole("manager")) {
		delete entity.Status;
	}
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
	var oldEntity = dao.find(entity.Id);
	if (!user.isInRole("manager")) {
		delete entity.Status;
	}
	entity = Object.assign(oldEntity, entity);
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
	producer.queue("crm/Sales/Quote/" + operation).send(JSON.stringify(data));
}