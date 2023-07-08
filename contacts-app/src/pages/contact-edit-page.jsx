import { useNavigate, useParams } from "react-router-dom"
import ContactView from "../components/contact-view"
import Page from "../components/page"
import { ArrowLeftIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { NavBarButton } from "../components/navbar"
import { Container } from "@mui/material"
import ModalPage from "../components/modal-page"
import useContact from "../hooks/use-contact"
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline"
import ContactForm from "../components/contact-form"

function ContactEditPage() {
  const navigate = useNavigate()
  const { contactId } = useParams()
  const { loading, contact, update } = useContact(contactId)

  const handleSubmit = (data) => {
    update(data).then(() => navigate(`/contact/${contactId}`))
  }

  return (
    <ModalPage
      title="Edit Contact"
      leftButton={{ icon: ArrowLeftIcon, type: "link", link: `/contact/${contactId}` }}
      actions={<span className="space-x-2">
        <NavBarButton 
          icon={CheckIcon} 
          text="Save"
          formId="frmContact"
        />
        <NavBarButton 
          type='link'
          icon={XMarkIcon} 
          text="Cancel"
          link={`/contact/${contactId}`}
        />
      </span>}
      >
        { loading 
          ? <span>Loading...</span>
          : (
            <Container>
              <div className="w-full lg:w-96">
                <ContactForm value={contact} onSubmit={handleSubmit}/>
              </div>
            </Container>
          )
        }
    </ModalPage>
  )
}

export default {
  path: '/contact/:contactId/edit',
  element: <ContactEditPage/>
}