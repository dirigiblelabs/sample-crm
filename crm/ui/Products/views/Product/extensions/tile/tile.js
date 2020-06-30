/*
 * Copyright (c) 2010-2020 SAP and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v2.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v20.html
 * Contributors:
 * SAP - initial API and implementation
 */

var dao = require("crm/data/dao/Products/Product.js")

exports.getTile = function(relativePath) {
	return {
		name: "Product",
		group: "Products",
		icon: "shopping-cart",
		location: relativePath + "services/v4/web/crm/ui/Products/index.html",
		count: dao.customDataCount(),
		order: "300"
	};
};
