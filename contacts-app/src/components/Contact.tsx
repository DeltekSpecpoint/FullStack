import { ComponentProps, useState } from "react"
import "@/assets/modules/Contact.css"
import { TContact, TStatus } from "@/types"
import {
    BusyIndicator,
    Header,
    Item,
    MenubarContainer,
    Modal,
} from "@/components"
import { getContactsService } from "@/services/api"

export function Contact() {
    const [contacts, setContacts] = useState<TContact[]>([])
    const [isOpenModalForm, setIsOpenModalForm] = useState(false)
    const [loading, setLoading] = useState(false)
    const [{ success, message }, setStatus] = useState<TStatus>({
        success: false,
        message: "",
    })

    const modalActions = {
        // open Modal form with contact info
        open: () => {
            setIsOpenModalForm(true)
        },
        close: () => {
            setIsOpenModalForm(false)
        },
        sync: async () => {
            let tempContacts: TContact[] = []
            setLoading(true)
            try {
                tempContacts = await getContactsService()
                setContacts(tempContacts)
            } catch (error) {
                console.log("error", error)
            } finally {
                setLoading(false)
            }
        },
    }

    // process indicator
    if (loading) return <BusyIndicator title="Please wait..." />

    // add/provide for menu details here
    const menus: Partial<ComponentProps<typeof Item>>[] = [
        {
            name: "Add Contact",
            iconName: "fa fa-plus",
            animation: "fa fa-beat-fade",
            onClick: () => modalActions.open(),
        },
        {
            name: "Sync Contacts",
            iconName: "fa fa-arrows-rotate",
            animation: "fa fa-beat-fade",
            onClick: () => modalActions.sync(),
        },
        {
            name: "Add Contact",
            iconName: "fa fa-plus",
            animation: "fa fa-beat-fade",
            onClick: () => modalActions.open(),
        },
        {
            name: "Sync Contacts",
            iconName: "fa fa-arrows-rotate",
            animation: "fa fa-beat-fade",
            onClick: () => modalActions.sync(),
        },
        {
            name: "Add Contact",
            iconName: "fa fa-plus",
            animation: "fa fa-beat-fade",
            onClick: () => modalActions.open(),
        },
        {
            name: "Sync Contacts",
            iconName: "fa fa-arrows-rotate",
            animation: "fa fa-beat-fade",
            onClick: () => modalActions.sync(),
        },
    ]

    return (
        <div className="contact-container">
            <Modal
                isOpen={isOpenModalForm}
                hideCloseIcon={false}
                clickBackdropToClose={false}
                onClose={modalActions.close}>
                <h1>Add Contact Form here...</h1>
            </Modal>

            <MenubarContainer {...{ menus }} />

            <section className="form-container">
                {contacts.length > 0 ? (
                    <Header>
                        <Header.Logo />
                        <Header.Title title="Contacts" />
                        <p className="small disabled">{`${contacts.length} saved Contacts.`}</p>
                        <Header.Status status={{ success, message }} />
                    </Header>
                ) : (
                    <Header>
                        <Header.Title
                            title="No Contacts"
                            subTitle='click "+" to create one'
                        />
                        <p className="x-small disabled">
                            Contacts you've added will appear here.
                        </p>
                    </Header>
                )}

                <div className="contact-list">
                    {contacts.length > 0 && contacts.slice(0, 6).map((contact) => (
                        <pre key={contact.id}>
                            {JSON.stringify(contact, null, 2)}
                        </pre>
                    ))}
                </div>
            </section>
        </div>
    )
}
