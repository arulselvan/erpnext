// Copyright (c) 2020, Frappe Technologies Pvt. Ltd. and contributors
// For license information, please see license.txt

frappe.ui.form.on('Mpesa Settings', {
	onload_post_render: function(frm) {
		frm.events.setup_account_balance_html(frm);
	},

	refresh: function(frm) {
		frappe.realtime.on("refresh_mpesa_dashboard", function(){
			frm.reload_doc();
		});
	},

	get_account_balance: function(frm) {
		if (!frm.initiator_name && !frm.security_credentials) return;
		frappe.call({
			method: "get_account_balance_info",
			doc: frm.doc
		});
	},

	setup_account_balance_html: function(frm) {
		$("div").remove(".form-dashboard-section.custom");
		frm.dashboard.add_section(
			frappe.render_template('account_balance', {
				data: JSON.parse(frm.doc.account_balance)
			})
		);
		frm.dashboard.show();
	}

});
