import React from 'react';

type Props = {
    children: any
  };
const ColumnHeader: React.FC<Props> = ({ children }) => (
  <table data-toggle="bootstrap-table" data-search="true" data-show-columns="true"
  className="table table-bordered table-hover">
  <thead>
    <tr className="tr-class-2">
      <th data-field="star" data-not-first-thdata-custom-attribute="star">
        <div className="th-inner ">First Name</div>
        <div className="fht-cell"></div>
      </th>
      <th data-field="star" data-not-first-thdata-custom-attribute="star">
        <div className="th-inner ">Middle Name</div>
        <div className="fht-cell"></div>
      </th>
      <th data-field="star" data-not-first-thdata-custom-attribute="star">
        <div className="th-inner ">Last Name</div>
        <div className="fht-cell"></div>
      </th>
      <th data-field="star" data-not-first-thdata-custom-attribute="star">
        <div className="th-inner ">Contact Number</div>
        <div className="fht-cell"></div>
      </th>
      <th data-field="star" data-not-first-thdata-custom-attribute="star">
        <div className="th-inner ">Address</div>
        <div className="fht-cell"></div>
      </th>
      <th data-field="star" data-not-first-thdata-custom-attribute="star">
        <div className="th-inner "></div>
        <div className="fht-cell"></div>
      </th>
    </tr>
  </thead>
  <tbody>
      {children}
      </tbody>
      </table>
  );

export default ColumnHeader;