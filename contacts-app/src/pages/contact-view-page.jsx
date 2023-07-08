import { useNavigate, useParams } from "react-router-dom"
import ContactView from "../components/contact-view"
import { ArrowLeftIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { NavBarButton } from "../components/navbar"
import { Container } from "@mui/material"
import ModalPage from "../components/modal-page"
import useContact from "../hooks/use-contact"

function ContactViewPage() {
  const navigate = useNavigate()
  const { contactId } = useParams()
  const { loading, contact, remove } = useContact(contactId)

  const handleDelete = () => {
    remove(contactId).then(() => {
      navigate('/')
    })
  }

  return (
    <ModalPage
      title={""} 
      leftButton={{ icon: ArrowLeftIcon, type: "link", link: "/" }}
      actions={<span className="space-x-2">
        <NavBarButton icon={PencilIcon} type="link" link={`/contact/${contactId}/edit`} text="Edit"/>
        <NavBarButton icon={TrashIcon} onClick={handleDelete} text="Delete"/>
      </span>}
      >
        { loading 
          ? <span>Loading...</span>
          : (
            <Container>
              <ContactView value={contact}/>
            </Container>
          )
        }
    </ModalPage>
  )
}

export default {
  path: '/contact/:contactId',
  element: <ContactViewPage/>
}