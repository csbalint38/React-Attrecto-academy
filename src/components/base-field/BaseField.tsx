import React, { ReactNode } from "react";
import classNames from "classnames";
import { ErrorMessage } from "formik";

import classes from "./BaseField.module.scss";

interface BaseFieldProps {
  name: string;
  label: string;
  className?: string;
  children: ReactNode;
}

const BaseField = ({ name, label, className, children }: BaseFieldProps) => {
  return (
    <div className={classNames("form-group", className)}>
      <label className="mb-2">{label}</label>
      {children}
      <ErrorMessage name={name}>
        {(msg) => (
          <div className={classNames(classes.ErrorMessage, "mt-2")}>{msg}</div>
        )}
      </ErrorMessage>
    </div>
  );
};

export default BaseField;
