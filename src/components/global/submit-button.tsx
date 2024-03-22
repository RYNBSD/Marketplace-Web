"use client";
import type { FC } from "react";
import type { FormState } from "~/types";
import { memo, useCallback, useState } from "react";
import PropTypes from "prop-types";
import { useNotification } from "~/context";
import { useCsrf } from "~/hooks";
import { fetchCsrf } from "~/action/security";

const SubmitButton: FC<Props> = ({ action, className, content = "Submit" }) => {
  const [pending, setPending] = useState(false);
  const { create } = useCsrf()
  const { toastify } = useNotification()!;

  const formAction = useCallback(
    async (formaData: FormData) => {
      setPending(true);

      try {
        const res = await toastify(action(formaData));
        if (!res.success) {
          // refetch csrf token if the res failed
          fetchCsrf().then(create)
        }
      } finally {
        setPending(false);
      }
    },
    [action, create, toastify]
  );

  return (
    <button
      type="submit"
      formAction={formAction}
      className={`${className}`}
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
  action: (formaData: FormData) => Promise<FormState>;
};

export default memo(SubmitButton);
