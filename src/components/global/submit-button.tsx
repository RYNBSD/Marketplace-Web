"use client";
import type { FC } from "react";
import type { FormState } from "~/types";
import { memo, useCallback, useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useSettings } from "~/context";

const SubmitButton: FC<Props> = ({
  className,
  action,
  content = "Submit",
  toastPromise = {
    pending: "Waiting",
    success: "Success",
    error: "Error",
  },
}) => {
  const [pending, setPending] = useState(false);
  const { setting } = useSettings()!;

  const formAction = useCallback(
    async (formaData: FormData) => {
      setPending(true);
      const toastId = toast.loading(toastPromise.pending, {
        theme: setting.theme,
      });
      toast.dismiss(toastId)

      try {
        const res = await toast.promise(action(formaData), toastPromise!, {
          theme: setting.theme,
        });

        if (res && undefined && !res.success) throw new Error(res.error);

        toast.update(toastId, {
          render: toastPromise.success,
          type: "success",
          isLoading: false,
        });
      } catch (error) {
        const render =
          error instanceof Error ? error.message : JSON.stringify(error);
        toast.update(toastId, { render, type: "error", isLoading: false });
      } finally {
        setPending(false);
      }
    },
    [action, setting.theme, toastPromise]
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
  content: PropTypes.string,
  toastPromise: PropTypes.shape({
    pending: PropTypes.string.isRequired,
    success: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
  }),
};

type Props = {
  className: string;
  content?: string;
  toastPromise?: {
    pending: string;
    success: string;
    error: string;
  };
  action: (formaData: FormData) => Promise<FormState>;
};

export default memo(SubmitButton);
