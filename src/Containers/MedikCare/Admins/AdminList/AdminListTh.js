import React from 'react';

const AdminListTh = (props) => {
    return (
        <tr>
            <th scope="col">{props.sn}</th>
            <td scope="col">{props.firstname}</td>
            <td scope="col">{props.lastname}</td>
            <td scope="col">{props.phonenumber}</td>
            <td scope="col"><i onClick={props.clicked} className="fa fa-eye"></i>  <i onClick={props.deleteClicked} className={props.deleteAdmin}></i></td>
        </tr>
    )
}

export default AdminListTh;