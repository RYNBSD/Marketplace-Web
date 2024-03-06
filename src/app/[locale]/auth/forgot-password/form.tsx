"use client";
import type { FC, ElementRef } from "react";
import type { Lang } from "~/types";
import { useCallback, useRef, useState, memo } from "react";
import PropTypes from "prop-types";
import { LANG } from "~/constant";
import { Form } from "~/components";

const ForgotPasswordForm: FC<Props> = () => {
  const [disableEmail, setDisableEmail] = useState(false);
  
  const email = useRef<ElementRef<"input">>(null);
  const password = useRef<ElementRef<"input">>(null);
  
  const handleSubmit = useCallback(async () => {}, []);

  return (
    <Form className="card-body" handleSubmit={handleSubmit}>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          ref={email}
          type="email"
          placeholder="email"
          disabled={disableEmail}
          required={!disableEmail}
          className="input input-bordered"
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          ref={password}
          type="password"
          placeholder="password"
          required={disableEmail}
          disabled={!disableEmail}
          className="input input-bordered"
        />
      </div>
      <div className="form-control mt-6">
        <button className="btn btn-primary">Login</button>
      </div>
    </Form>
  );
};

ForgotPasswordForm.propTypes = {
  locale: PropTypes.oneOf(LANG).isRequired,
};

export default memo(ForgotPasswordForm);

type Props = {
  locale: Lang;
};
