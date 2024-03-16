"use client";
import type { ChangeEvent, ElementRef } from "react";
import type { Theme } from "~/types";
import { useCallback, useRef, useState, useTransition } from "react";
import { Form } from "~/components";
import { useUser } from "~/context";
import { trpc } from "~/trpc/client";
import { client as util } from "~/util/client";
import { THEMES } from "~/constant";
import { useRouter } from "next/router";
import { useLocale } from "next-intl";

const {
  validateStoreName: { useMutation: useValidateStoreNameMutation },
  new: { useMutation: useNewMutation },
} = trpc.routers.seller;

export default function NewSellerForm() {
  const router = useRouter();
  const locale = useLocale();
  const { user, setSeller } = useUser()!;
  const [disabled, setDisabled] = useState(false);
  const [isStoreNameValid, setIsStoreNameValid] = useState(false);
  const [storeName, setStoreName] = useState("");
  const [isPending, startTransition] = useTransition();

  const { mutateAsync: validateStoreNameMutation } =
    useValidateStoreNameMutation();
  const { mutateAsync: newMutation } = useNewMutation();
  const image = useRef<ElementRef<"input">>(null);
  const theme = useRef<ElementRef<"select">>(null);

  const validateStoreName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      startTransition(() => {
        const storeName = e.target.value;
        setStoreName(storeName);
        if (storeName.length === 0) return setIsStoreNameValid(false);

        validateStoreNameMutation({ storeName })
          .then((res) => setIsStoreNameValid(res))
          .catch(() => setIsStoreNameValid(false));
      });
    },
    [validateStoreNameMutation]
  );

  const handleSubmit = useCallback(async () => {
    setDisabled(true);
    try {
      const { fileToBase64 } = util.tools;
      let file = "";
      const files = image.current?.files ?? null;
      if (files !== null) {
        const base64 = await fileToBase64(files);
        if (base64.length === 0)
          return alert("Please retry again (image is not uploaded)");
        file = base64[0]!;
      } else {
        return alert("Make sure to add logo");
      }

      const res = await newMutation({
        storeName,
        theme: (theme.current?.value ?? "") as Theme,
        image: file,
        userId: user?.id ?? "",
      });
      setSeller!(res);
      router.push(
        `/${locale}/${user?.id ?? ""}/dashboard/${user?.seller?.id ?? ""}`
      );
    } catch (error) {
      console.error(error);
    } finally {
      setDisabled(false);
    }
  }, [locale, newMutation, router, setSeller, storeName, user?.id, user?.seller?.id]);

  return (
    <Form handleSubmit={handleSubmit} className="card-body">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Username</span>
        </label>
        <input
          required
          type="text"
          placeholder="Store name"
          className={`input input-bordered ${
            isStoreNameValid ? "input-success" : "input-error"
          }`}
          onChange={validateStoreName}
        />
        <div className="label">
          <span className="label-text-alt">
            {isPending
              ? "validating"
              : isStoreNameValid
              ? "store name valid"
              : "store name not valid"}
          </span>
        </div>
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Pick a profile picture</span>
        </label>
        <input
          ref={image}
          required
          type="file"
          className="file-input w-full max-w-xs"
          accept="image/*"
        />
      </div>
      <select
        ref={theme}
        defaultValue="Themes"
        className="select select-bordered w-full max-w-xs"
      >
        {THEMES.map((theme) => (
          <option key={theme} value={theme}>
            {theme}
          </option>
        ))}
      </select>
      <div className="form-control mt-6">
        <button className="btn btn-primary" type="submit" disabled={disabled}>
          New seller
        </button>
      </div>
    </Form>
  );
}
