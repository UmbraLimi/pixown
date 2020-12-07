import { withTracker }          from  'meteor/react-meteor-data'
// ----node-packages----------------
// ----helpers----------------------
// ----collections------------------
// ----components-------------------
import { Header_Bar as Component }   from  './index.jsx'

// ====================================================================
const getMeteorData = (props) => {
  return { ready: true }
}
// ====================================================================
const Header_Bar = _.compose(
	withTracker((props) => { // some Tracker data
		return getMeteorData(props)
	}), 
)(Component)

// ====================================================================

export { Header_Bar }
