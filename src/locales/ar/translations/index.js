import actions from './actions'
import dashboard from './dashboard'
import medications from './medications'
import patient from './patient'
import patients from './patients'
import settings from './settings'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  ...actions,
  ...dashboard,
  ...patient,
  ...patients,
  ...settings,
  ...medications,
}