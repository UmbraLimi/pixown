import { Schools } from '../collection.js'
import { insert_raw_test_records } from '/imports/server/misc/misc.js'

// ====================================================================
const raw_records = [
  {
    school_code: '001',
    name:        'Westmount Secondary School',
    title:       'Westmount SS, Hamilton, ON',
    image_url:   'http://res.cloudinary.com/pixown/image/upload/v1536628802/westmount-ss_ktkiiq.jpg',
    city:        'Hamilton',
    province_state: 'Ontario',
    country:     'Canada',
    vendor_code_list: ['luxarte','rons','brocks','petes']
  },
  {
    school_code: '002',
    name:        'Bishop Tonnes Catholic Secondary School',
    title:       'Bishop Tonnes Catholic SS, Hamilton, ON',
    image_url:   'http://res.cloudinary.com/pixown/image/upload/v1536628799/bishop-tonnos-css_kxyzd1.jpg',
    city:        'Hamilton',
    province_state: 'Ontario',
    country:     'Canada',
    vendor_code_list: ['luxarte','brocks','petes']
  },
  {
    school_code: '003',
    name:        'Brock University',
    title:       'Brock University, St. Catherines, ON',
    image_url:   'http://res.cloudinary.com/pixown/image/upload/v1536628794/univ-brock_gt1kaf.jpg',
    city:        'St. Catharines',
    province_state: 'Ontario',
    country:     'Canada',
    vendor_code_list: ['luxarte','rons','petes']
  }
]
// ====================================================================
const insert_test_schools = (clear_first=false) => {
  if (clear_first) { Schools.remove({}) }
	insert_raw_test_records("SCHOOLS", raw_records)
}
// ====================================================================

export { insert_test_schools }
