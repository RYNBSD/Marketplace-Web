"use client";
import type { FC } from "react";
import { memo, useCallback, useState } from "react";
import PropTypes from "prop-types";
import { useNotification } from "~/context";

const SubmitButton: FC<Props> = ({ action, className, content = "Submit" }) => {
  const [pending, setPending] = useState(false);
  const { toastify } = useNotification()!;

  const formAction = useCallback(
    async (formaData: FormData) => {
      setPending(true);

      try {
        await toastify(action(formaData));
      } finally {
        setPending(false);
      }
    },
    [action, toastify]
  );

  return (
    <button
      type="submit"
      formAction={formAction}
      className={`${className}${pending ? " btn-disabled " : ""}`}
      aria-disabled={pending}
      disabled={pending}
    >
      {content}
    </button>
  );
};

SubmitButton.propTypes = {
  className: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  content: PropTypes.string,
};

type Props = {
  className: string;
  content?: string;
  action: (formaData: FormData) => Promise<Response>;
};

export default memo(SubmitButton);
