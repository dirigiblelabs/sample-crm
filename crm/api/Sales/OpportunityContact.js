var rs = require("http/v4/rs");
var dao = require("crm/data/dao/Sales/OpportunityContact");
var http = require("crm/api/http");

rs.service()
	.resource("")
		.get(function(ctx, request) {
			var queryOptions = {};
			var parameters = request.getParameterNames();
			for (var i = 0; i < parameters.length; i ++) {
				queryOptions[parameters[i]] = request.getParameter(parameters[i]);
			}
			var entities = dao.list(queryOptions);
			http.sendResponseOk(entities);
		})
		.catch(function(ctx, error) {
            if (error.name === "ForbiddenError") {
                http.sendForbiddenRequest(error.message);
            } else {
				http.sendResponseBadRequest(error.message);
			}
        })
	.resource("count")
		.get(function(ctx, request) {
			http.sendResponseOk(dao.count());
		})
		.catch(function(ctx, error) {
            if (error.name === "ForbiddenError") {
                http.sendForbiddenRequest(error.message);
            } else {
				http.sendResponseBadRequest(error.message);
			}
        })
	.resource("{id}")
		.get(function(ctx) {
			var id = ctx.pathParameters.id;
			var entity = dao.get(id);
			if (entity) {
			    http.sendResponseOk(entity);
			} else {
				http.sendResponseNotFound("OpportunityContact not found");
			}
		})
		.catch(function(ctx, error) {
            if (error.name === "ForbiddenError") {
                http.sendForbiddenRequest(error.message);
            } else {
				http.sendResponseBadRequest(error.message);
			}
        })
	.resource("")
		.post(function(ctx, request, response) {
			var entity = request.getJSON();
			entity.Id = dao.create(entity);
			response.setHeader("Content-Location", "/services/v4/js/crm/api/OpportunityContact.js/" + entity.Id);
			http.sendResponseCreated(entity);
		})
		.catch(function(ctx, error) {
            if (error.name === "ForbiddenError") {
                http.sendForbiddenRequest(error.message);
            } else {
				http.sendResponseBadRequest(error.message);
			}
        })
	.resource("{id}")
		.put(function(ctx, request) {
			var entity = request.getJSON();
			entity.Id = ctx.pathParameters.id;
			dao.update(entity);
			http.sendResponseOk(entity);
		})
		.catch(function(ctx, error) {
            if (error.name === "ForbiddenError") {
                http.sendForbiddenRequest(error.message);
            } else {
				http.sendResponseBadRequest(error.message);
			}
        })
	.resource("{id}")
		.delete(function(ctx) {
			var id = ctx.pathParameters.id;
			var entity = dao.get(id);
			if (entity) {
				dao.delete(id);
				http.sendResponseNoContent();
			} else {
				http.sendResponseNotFound("OpportunityContact not found");
			}
		})
		.catch(function(ctx, error) {
            if (error.name === "ForbiddenError") {
                http.sendForbiddenRequest(error.message);
            } else {
				http.sendResponseBadRequest(error.message);
			}
        })
.execute();