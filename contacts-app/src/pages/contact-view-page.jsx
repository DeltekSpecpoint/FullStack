import { useNavigate, useParams } from "react-router-dom"
import ContactView from "../components/contact-view"
import Page from "../components/page"
import { ArrowLeftIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { NavBarButton } from "../components/navbar"
import { Container } from "@mui/material"
import ModalPage from "../components/modal-page"

function ContactViewPage() {
  const navigate = useNavigate()
  const { contactId } = useParams()

  return (
    <ModalPage
      title={""} 
      leftButton={{ icon: ArrowLeftIcon, type: "link", link: "/" }}
      actions={<span className="space-x-2">
        <NavBarButton icon={PencilIcon} type="link" link={`/contact/${contactId}/edit`} text="Edit"/>
        <NavBarButton icon={TrashIcon} onClick={() => console.log('delete')} text="Delete"/>
      </span>}
      >
        <Container>
          <ContactView value={{
            id: 1,
            name: "Joel Manuel",
            mobileNumber: "+639060586149"
          }}/>
        </Container>
    </ModalPage>
  )
}

export default {
  path: '/contact/:contactId',
  element: <ContactViewPage/>
}