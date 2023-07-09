import { useNavigate, useParams } from "react-router-dom"
import ContactView from "../components/contact-view"
import { ArrowLeftIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { NavBarButton } from "../components/navbar"
import ModalPage from "../components/modal-page"
import useContact from "../hooks/use-contact"
import Container from "../components/container"
import useRemoveContact from "../hooks/use-delete-contact"

function ContactViewPage() {
  const navigate = useNavigate()
  const { contactId } = useParams()
  const { loading, contact } = useContact(contactId)
  const { remove } = useRemoveContact()

  const handleDelete = () => {
    remove(contactId).then(() => {
      localStorage.removeItem(`/contact/${contactId}/edit`)
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

const contactViewPage = {
  path: '/contact/:contactId',
  element: <ContactViewPage/>
}

export default contactViewPage