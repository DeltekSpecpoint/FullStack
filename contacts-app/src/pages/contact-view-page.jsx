import { useNavigate } from "react-router-dom"
import ContactView from "../components/contact-view"
import Page from "../components/page"
import { ArrowLeftIcon, PencilIcon } from '@heroicons/react/24/outline'

function ContactViewPage() {
  const navigate = useNavigate()
  return (
    <Page 
      title={""} 
      leftButton={{ icon: ArrowLeftIcon, onClick: () => navigate(-1) }}
      rightButton={{ icon: PencilIcon, onClick: () => console.log('test') }}
      >
        <div className="max-w-[900px] m-auto">
          <ContactView value={{
            id: 1,
            name: "Joel Manuel",
            mobileNumber: "+639060586149"
          }}/>
        </div>
    </Page>
  )
}

export default {
  path: '/contact/:contactId',
  element: <ContactViewPage/>
}