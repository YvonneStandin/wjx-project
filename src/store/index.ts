import { configureStore } from '@reduxjs/toolkit'
import undoable, { excludeAction, StateWithHistory } from 'redux-undo'
import userReducer, { UserStateType } from './userReducer'
import componentsReducer, { ComponentsStateType } from './componentsReducer'
import pageInfoReducer, { PageInfoStateType } from './pageInfoReducer'

export type StateType = {
  user: UserStateType
  // components: ComponentsStateType
  //增加 undo
  components: StateWithHistory<ComponentsStateType>
  pageInfo: PageInfoStateType
}

export default configureStore({
  reducer: {
    user: userReducer,
    // components: componentsReducer,
    components: undoable(componentsReducer, {
      //限制留存 20 步骤
      limit: 20,
      //屏蔽撤销 action
      filter: excludeAction([
        'components/resetComponents',
        'components/changeSelectedId',
        'components/selectPrevComponent',
        'components/selectNextComponent',
      ]),
      syncFilter: true,
    }),
    pageInfo: pageInfoReducer,
  },
})
