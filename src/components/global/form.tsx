"use client";
import type { ReactNode, FormEvent } from "react";
import PropTypes from "prop-types";
import { useCallback } from "react";

export default function Form({ className, handleSubmit, children }: Props) {
  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      await handleSubmit(e);
    },
    [handleSubmit]
  );

  return (
    <form className={className} onSubmit={onSubmit}>
      {children}
    </form>
  );
}

Form.propTypes = {
  className: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

type Props = {
  className: string;
  handleSubmit: (e: FormEvent) => Promise<void>;
  children: ReactNode;
};
