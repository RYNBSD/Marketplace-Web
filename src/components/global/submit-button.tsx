"use client";
import type { FC } from "react";
import { memo, useCallback, useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useSettings } from "~/context";

const SubmitButton: FC<Props> = ({ className, content = "Submit", action }) => {
  const [pending, setPending] = useState(false);
  const { setting } = useSettings()!;

  const formAction = useCallback(
    async (formaData: FormData) => {
      setPending(true);
      try {
        const res = await action(formaData);
        if (res !== undefined && "error" in res) throw new Error(res.error);
      } catch (error) {
        const err =
          error instanceof Error ? error.message : JSON.stringify(error);
        err.split(";").forEach((err) => {
          if (err.length > 0) toast.error(err, { theme: setting.theme });
        });
      } finally {
        setPending(false);
      }
    },
    [action, setting.theme]
  );

  return (
    <button
      type="submit"
      formAction={formAction}
      className={`mb-5 ${className}`}
      aria-disabled={pending}
      disabled={pending}
    >
      {content}
    </button>
  );
};

SubmitButton.propTypes = {
  className: PropTypes.string.isRequired,
  content: PropTypes.string,
};

type Props = {
  className: string;
  content?: string;
  action: (
    formaData: FormData
  ) => Promise<{ error: string } | { data: unknown }>;
};

export default memo(SubmitButton);
