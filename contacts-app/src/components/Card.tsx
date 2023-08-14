import React from "react";
import { Link } from "react-router-dom"
import Contact from "./Contact";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

interface CardProps {
  contact: Contact;
  deleteContactHandler: (id: string) => void;
}

const Card = ({ contact, deleteContactHandler }: CardProps) => {
  const { id, avatar, name } = contact;
  return (
      <div className="contactlist-card" id={id.toString()}>
        <div className="avatar">
          <span className="deleteIcon" onClick={() => deleteContactHandler(id.toString())}><HighlightOffIcon /></span>
          <Link to={`contact/${id}`} state={{data: contact}}>
          <div className="contactlist-info">
            <img src={avatar? avatar: "https://www.pngkey.com/png/full/349-3499617_person-placeholder-person-placeholder.png"} alt="contact avatar" className="avatar-img" />
            <p className="info">{name.split(' ')[0]}</p>
          </div>
          </Link>
        </div>
        
          {/* <div className="bottom">
            <p className="info">{phone}</p>
            <p className="info">{email}</p>
          </div> */}
      </div>
  );
}

export default Card;
