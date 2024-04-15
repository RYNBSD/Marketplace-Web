"use client";
import type { ChangeEvent, ElementRef, KeyboardEvent } from "react";
import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { useRouter } from "next/navigation";
import { SubmitButton } from "~/components";
import { allCategories, createProduct } from "~/action/store";
import { useLocale, useTranslations } from "next-intl";

const Category = memo(function Category({
  id,
  locale,
  ...props
}: {
  id: string;
  name: string;
  nameAr: string;
  locale: string;
}) {
  const name = useMemo(
    () => (locale === "en" ? props.name : props.nameAr),
    [locale, props.name, props.nameAr]
  );
  return (
    <option value={id} className="capitalize">
      {name}
    </option>
  );
});

export function Categories() {
  const locale = useLocale();
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    allCategories(1).then((res) => {
      if (res.success) setCategories(res.data.categories);
    });
  }, []);

  return categories.map((category) => (
    <Category key={category.id} {...category} locale={locale} />
  ));
}

const Size = memo(function Size({
  size,
  onDelete,
}: {
  size: string;
  onDelete: (size: string) => void;
}) {
  return (
    <button type="button" className="badge" onClick={() => onDelete(size)}>
      {size}
    </button>
  );
});

export function Sizes() {
  const tForm = useTranslations("Dashboard.Store.Products.Create.Form")
  const inputRef = useRef<ElementRef<"input">>(null);
  const [sizes, setSizes] = useState<string[]>([]);

  const onKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    const value = inputRef.current?.value ?? "";
    const valueTrim = value.trim();
    if (valueTrim.length === 0) return;

    inputRef.current!.value = "";
    setSizes((prev) => {
      const set = new Set([...prev, valueTrim]);
      return Array.from(set);
    });
  }, []);

  const onDelete = useCallback((size: string) => {
    setSizes((prev) => prev.filter((pr) => pr !== size));
  }, []);

  return (
    <>
      <input
        className="none"
        type="hidden"
        name="sizes"
        value={sizes.join(",")}
      />
      <input
        ref={inputRef}
        type="text"
        placeholder={tForm("enter-size")}
        className="input input-bordered w-full max-w-xs mb-2"
        onKeyDown={onKeyDown}
      />
      <div>
        {sizes.map((size) => (
          <Size key={size} size={size} onDelete={onDelete} />
        ))}
      </div>
    </>
  );
}

const Color = memo(function Color({
  color,
  onDelete,
}: {
  color: string;
  onDelete: (color: string) => void;
}) {
  return (
    <button
      key={color}
      onClick={() => onDelete(color)}
      className="flex items-center justify-center gap-1"
    >
      <div className="w-[10px] h-[10px]" style={{ backgroundColor: color }} />
      {color}
    </button>
  );
});

export function Colors() {
  const tForm = useTranslations("Dashboard.Store.Products.Create.Form")
  const [_, startTransition] = useTransition();
  const [index, setIndex] = useState(0);
  const [colors, setColors] = useState<string[]>([]);

  const formValue = useMemo(() => {
    const set = new Set(colors);
    const arr = Array.from(set);
    return arr.join(",");
  }, [colors]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (value.length !== 7) return;

      startTransition(() => {
        setColors((prev) => {
          prev[index] = value;
          return [...prev];
        });
      });
    },
    [index]
  );

  const onBlur = useCallback(() => {
    setIndex((prev) => prev + 1);
  }, []);

  const onDelete = useCallback((color: string) => {
    setColors((prev) => prev.filter((pr) => pr !== color));
  }, []);

  return (
    <>
      <input className="none" type="hidden" name="colors" value={formValue} />
      <input
        type="color"
        placeholder={tForm("enter-color")}
        className="input input-bordered w-full max-w-xs mb-2"
        onChange={onChange}
        onBlur={onBlur}
      />
      <div className="flex flex-wrap flex-1 gap-2">
        {colors.map((color) => (
          <Color key={color} color={color} onDelete={onDelete} />
        ))}
      </div>
    </>
  );
}

const Tag = memo(function Tag({
  tag,
  onDelete,
}: {
  tag: string;
  onDelete: (tag: string) => void;
}) {
  return (
    <button type="button" className="badge" onClick={() => onDelete(tag)}>
      {tag}
    </button>
  );
});

export function Tags() {
  const tForm = useTranslations("Dashboard.Store.Products.Create.Form")
  const inputRef = useRef<ElementRef<"input">>(null);
  const [tags, setTags] = useState<string[]>([]);

  const onKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    const value = inputRef.current?.value ?? "";
    const valueTrim = value.trim();
    if (valueTrim.length === 0) return;

    inputRef.current!.value = "";
    setTags((prev) => {
      const set = new Set([...prev, valueTrim]);
      return Array.from(set);
    });
  }, []);

  const onDelete = useCallback((tag: string) => {
    setTags((prev) => prev.filter((pr) => pr !== tag));
  }, []);

  return (
    <>
      <input
        className="none"
        type="hidden"
        name="tags"
        value={tags.join(",")}
      />
      <input
        ref={inputRef}
        type="text"
        placeholder={tForm("enter-tag")}
        className="input input-bordered w-full max-w-xs mb-2"
        onKeyDown={onKeyDown}
      />
      <div>
        {tags.map((tag) => (
          <Tag key={tag} tag={tag} onDelete={onDelete} />
        ))}
      </div>
    </>
  );
}

const Info = memo(function Info({
  en,
  ar,
  i,
  onEnChange,
  onArChange,
}: {
  en: string;
  ar: string;
  i: number;
  onEnChange: (e: ChangeEvent<HTMLInputElement>, i: number) => void;
  onArChange: (e: ChangeEvent<HTMLInputElement>, i: number) => void;
}) {
  const tInfo = useTranslations("Dashboard.Store.Products.Create.Form.Info")

  return (
    <>
      <input
        type="text"
        value={en}
        required
        placeholder={tInfo("english")}
        className="input input-bordered w-full max-w-xs"
        onChange={(e) => onEnChange(e, i)}
      />
      <input
        type="text"
        value={ar}
        required
        placeholder={tInfo("arabic")}
        className="input input-bordered w-full max-w-xs"
        onChange={(e) => onArChange(e, i)}
      />
    </>
  );
});

export function Infos() {
  const tInfo = useTranslations("Dashboard.Store.Products.Create.Form.Info")
  const [infos, setInfos] = useState<{ en: string; ar: string }[]>([]);

  const onEnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, i: number) => {
      const value = e.target.value;
      setInfos((prev) =>
        prev
          .map((pr, index) => {
            if (i === index) pr.en = value;
            return pr;
          })
          .filter(({ en, ar }) => en.length > 0 || ar.length > 0)
      );
    },
    []
  );

  const onArChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, i: number) => {
      const value = e.target.value;
      setInfos((prev) =>
        prev
          .map((pr, index) => {
            if (i === index) pr.ar = value;
            return pr;
          })
          .filter(({ en, ar }) => en.length > 0 || ar.length > 0)
      );
    },
    []
  );

  const onAdd = useCallback(() => {
    setInfos((prev) => [...prev, { en: "", ar: "" }]);
  }, []);

  const join = useCallback(() => {
    let result = "";
    for (let i = 0; i < infos.length; i++) {
      const { en, ar } = infos[i]!;
      result += en + ",";
      result += ar + ",";
    }
    return result;
  }, [infos]);

  return (
    <>
      {infos.map(({ en, ar }, i) => (
        <Info
          key={i}
          en={en}
          ar={ar}
          i={i}
          onEnChange={onEnChange}
          onArChange={onArChange}
        />
      ))}
      <input className="none" type="hidden" name="infos" value={join()} />
      <button type="button" className="btn btn-info col-span-2" onClick={onAdd}>
        {tInfo("add")}
      </button>
    </>
  );
}

export function Submit() {
  const router = useRouter();

  const create = useCallback(
    async (formData: FormData) => {
      const res = await createProduct(formData);
      if (res.success) router.back();
      return res;
    },
    [router]
  );

  return (
    <SubmitButton
      className="btn btn-primary col-span-2"
      content="Create"
      action={create}
    />
  );
}
