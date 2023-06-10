import './index.css'
import contactReducer from './store/contact-reducer'
import { ContactAction, ContactState, DispatchType, } from './store/Contact'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, Store } from "redux"
import thunk from "redux-thunk"
import App from './components/ContactMain'
import { render } from 'react-dom'

const store: Store<ContactState, ContactAction> & {
  dispatch: DispatchType
} = createStore(contactReducer, applyMiddleware(thunk))


const rootElement = document.getElementById("root")
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)