import homeReducer from "Modules/home/reducer"
import javascriptErrorReducer from "Modules/javascriptError/reducer"
import javascriptErrorDetailReducer from "Modules/javascriptErrorDetail/reducer"
import loginReducer from "Modules/login/reducer"
import projectListReducer from "Modules/projectList/reducer"
import registerReducer from "Modules/register/reducer"

export default {
  home: {reducer: homeReducer, isCached: false},
  javascriptError: {reducer: javascriptErrorReducer, isCached: false},
  javascriptErrorDetail: {reducer: javascriptErrorDetailReducer, isCached: false},
  login: {reducer: loginReducer, isCached: false},
  projectList: {reducer: projectListReducer, isCached: false},
  register: {reducer: registerReducer, isCached: false}
}