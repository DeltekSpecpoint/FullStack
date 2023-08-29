import React from 'react'
import style from '../styles/modules/title.module.scss';

interface Prop
{
    children : string
}
function PageTitle({children} : Prop) {

    return <p className={style.title}>{children}</p>;  
}

export default PageTitle
