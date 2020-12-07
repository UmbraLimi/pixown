import { Orders } from '../collection.js'
import { insert_raw_test_records } from '/imports/server/misc/misc.js'

// ====================================================================
const raw_records = [
  {
    _id:            '~ORDER-1',
    customer_code:  'Wendy',
    stripe_charge:  {
      amount:        3190,
      currency:      'cad',
      source:        '^&%&^%&^$^$HGH%$%ET',
      description:   'Pixown Order',
      receipt_email: 'yaya@yoyo.com'
    },
    payment_provider: "Stripe",
    payment_datetime: new Date(),
    workups: [
      "~WUP-1"
		],
		studio_codes: ['luxarte'],
    stripe_response: {
      x: "a",
      y: 3000
    },
    user_record: {
			_id: "Nc3AJTPWbEEfXPSrs",
			meteor_username: "Wendy",
			password: "111",
			username: "Wendy H.",
			role: "CUSTOMER",
			surname: "Holtzana",
			other_names: "Wendy",
			mailing_address: {
					street: "164 Hanover Street",
					city: "Grand Creek",
					province: "Alberta",
					postal_code: "M2R 3T5",
					country: "Canada"
			},
			billing_address: {
					street: "13 Markham Street",
					city: "Granada 111",
					province: "Ontario",
					postal_code: "L2S 6W6",
					country: "Canada"
			},
			email: "wendy@hohoho.ho",
			phone: 1234567890,
			meteor_user_id: "QvLDDSBvj2DmhSeJ2",
			createdOn: new Date(),
			last_updated: new Date(),
    },
    insurance: {
			wanted: false,
			cost: 0
    },
    discounts: {
			retouching: -3333,
			flash_sale: -2500,
			cost_threshold: -5000,
			total: -10833
    },
    raw_cost_totals: {
			prints: 6005,
			downloads: 9000,
			retouching: 9500,
			total: 24505
		},
	  postage_handling: 1000,
	  pre_hst_total: 36338,
	  hst: 4724,
	  grand_total_cost: 41062,
  },


  {
    _id:            '~ORDER-2',
    customer_code:  'Wendy',
    stripe_charge:  {
      amount:        11100,
      currency:      'cad',
      source:        '^&%&^%&^$^$HGH%$%ET',
      description:   'Pixown Order',
      receipt_email: 'yaya@yoyo.com'
    },
    payment_provider: "Stripe",
    payment_datetime: new Date(),
    workups: [
      "~WUP-2",
      "~WUP-3",
      "~WUP-4"
    ],
		studio_codes: ['luxarte'],
    stripe_response: {
      x: "b",
      y: 7600
    },
    user_record: {
			_id: "Nc3AJTPWbEEfXPSrs",
			meteor_username: "Wendy",
			password: "111",
			username: "Wendy H.",
			role: "CUSTOMER",
			surname: "Holtzana",
			other_names: "Wendy",
			mailing_address: {
					street: "164 Hanover Street",
					city: "Grand Creek",
					province: "Alberta",
					postal_code: "M2R 3T5",
					country: "Canada"
			},
			billing_address: {
					street: "13 Markham Street",
					city: "Granada 111",
					province: "Ontario",
					postal_code: "L2S 6W6",
					country: "Canada"
			},
			email: "wendy@hohoho.ho",
			phone: 1234567890,
			meteor_user_id: "QvLDDSBvj2DmhSeJ2",
			createdOn: new Date(),
			last_updated: new Date(),
    },
    insurance: {
			wanted: false,
			cost: 0
    },
    discounts: {
			retouching: -3333,
			flash_sale: -2500,
			cost_threshold: -5000,
			total: -10833
    },
    raw_cost_totals: {
			prints: 6005,
			downloads: 9000,
			retouching: 9500,
			total: 24505
	  },
	  postage_handling: 1000,
	  pre_hst_total: 36338,
	  hst: 4724,
	  grand_total_cost: 41062,
  }
]
// ====================================================================
const insert_test_orders = (clear_first=false) => {
  if (clear_first) { Orders.remove({}) }
	insert_raw_test_records("ORDERS", raw_records)
}
// ====================================================================

export { insert_test_orders }
