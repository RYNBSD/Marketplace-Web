"use client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { createCategory } from "~/api/store";
import { SubmitButton } from "~/components";

// export function Name() {
//   const t = useTranslations();
//   const tForm = useTranslations("Dashboard.Store.Categories.Create.Form");
//   const [isValid, setIsValid] = useState(false);
//   const [isPending, startTransition] = useTransition();

//   const onChange = useCallback(
//     (e: ChangeEvent<HTMLInputElement>) =>
//       startTransition(() => {
//         validateCategoryName(e.target.value, "").then(setIsValid);
//       }),
//     []
//   );

//   return (
//     <>
//       <input
//         type="text"
//         name="name"
//         onChange={onChange}
//         placeholder={tForm("name")}
//         className={`input input-bordered ${
//           isValid ? "input-success" : "input-error"
//         }`}
//         required
//       />
//       <div className="label">
//         <span className="label-text-alt">
//           {isPending
//             ? t("validating")
//             : isValid
//             ? tForm("category-valid")
//             : tForm("category-not-valid")}
//         </span>
//       </div>
//     </>
//   );
// }

// export function NameAr() {
//   const t = useTranslations();
//   const tForm = useTranslations("Dashboard.Store.Categories.Create.Form");
//   const [isValid, setIsValid] = useState(false);
//   const [isPending, startTransition] = useTransition();

//   const onChange = useCallback(
//     (e: ChangeEvent<HTMLInputElement>) =>
//       startTransition(() => {
//         validateCategoryName("", e.target.value).then(setIsValid);
//       }),
//     []
//   );

//   return (
//     <>
//       <input
//         type="text"
//         name="nameAr"
//         onChange={onChange}
//         placeholder={tForm("arabic-name")}
//         className={`input input-bordered ${
//           isValid ? "input-success" : "input-error"
//         }`}
//         required
//       />
//       <div className="label">
//         <span className="label-text-alt">
//           {isPending
//             ? t("validating")
//             : isValid
//             ? tForm("category-valid")
//             : tForm("category-not-valid")}
//         </span>
//       </div>
//     </>
//   );
// }

export function Submit() {
  const tForm = useTranslations("Dashboard.Store.Categories.Create.Form");
  const router = useRouter();

  const create = useCallback(
    async (formData: FormData) => {
      const res = await createCategory(formData);
      if (res.ok) router.back();
      return res;
    },
    [router]
  );

  return (
    <SubmitButton
      className="btn btn-primary"
      content={tForm("create")}
      action={create}
    />
  );
}
