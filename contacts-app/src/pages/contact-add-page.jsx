import { useNavigate } from "react-router-dom"
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { NavBarButton } from "../components/navbar"
import { Container } from "@mui/material"
import ModalPage from "../components/modal-page"
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline"
import ContactForm from "../components/contact-form"
import useCreateContact from "../hooks/use-create-contact"

function ContactAddPage() {
  const navigate = useNavigate()
  const create = useCreateContact()

  const handleSubmit = (data) => {
    create(data)
      .then((d) => navigate(`/`))
  }

  return (
    <ModalPage
      title="Add Contact"
      leftButton={{ icon: ArrowLeftIcon, type: "link", link: `/` }}
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
          link={`/`}
        />
      </span>}
      >
        <Container>
          <div className="w-full lg:w-96">
            <ContactForm onSubmit={handleSubmit}/>
          </div>
        </Container>
    </ModalPage>
  )
}

export default {
  path: '/add',
  element: <ContactAddPage/>
}