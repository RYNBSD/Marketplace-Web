"use client";
import type { ChangeEvent, ElementRef } from "react";
import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { SubmitButton } from "~/components";
import { allCategories, updateProduct } from "~/api/store";
import { KEYS } from "~/constant";
import { updateAction } from "./action";

const { BASE_URL } = KEYS;

export const Images = memo(function Images(props: {
  images: string[];
  title: string;
  titleAr: string;
}) {
  const [images, setImages] = useState<string[]>([]);
  const [deletedImages, setDeletedImages] = useState<string[]>([]);

  useEffect(() => {
    setImages(props.images);
  }, [props.images]);

  const onDelete = useCallback((image: string) => {
    setImages((prev) => prev.filter((img) => img !== image));
    setDeletedImages((prev) => [...prev, image]);
  }, []);

  return (
    <>
      <input
        className="none"
        type="hidden"
        name="deletedImages"
        value={deletedImages.join(",")}
      />
      {images.map((image: string) => (
        <Image
          key={image}
          src={`${BASE_URL}${image}`}
          alt={`${props.title} - ${props.titleAr}`}
          className="hover:cursor-pointer"
          onClick={() => onDelete(image)}
          loading="lazy"
          width={150}
          height={150}
        />
      ))}
    </>
  );
});

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
    allCategories()
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((json) => setCategories(json.data.categories));
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
    <button
      type="button"
      className="badge hover:badge-error"
      onClick={() => onDelete(size)}
    >
      {size}
    </button>
  );
});

export const Sizes = memo(function Sizes(props: { sizes: string[] }) {
  const tForm = useTranslations("Dashboard.Store.Products.Update.Form");
  const inputRef = useRef<ElementRef<"input">>(null);
  const [sizes, setSizes] = useState<string[]>(props.sizes);

  useEffect(() => {
    setSizes(props.sizes);
  }, [props.sizes]);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const lastIndex = value.length - 1;
    if (value[lastIndex] !== ",") return;

    const realValue = value.split(",")[0] ?? "";
    const valueTrim = realValue.trim();
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
        onChange={onChange}
      />
      <div>
        {sizes.map((size) => (
          <Size key={size} size={size} onDelete={onDelete} />
        ))}
      </div>
    </>
  );
});

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
      className="badge gap-1 hover:badge-error"
    >
      <div className="w-[10px] h-[10px]" style={{ backgroundColor: color }} />
      {color}
    </button>
  );
});

export const Colors = memo(function Colors(props: { colors: string[] }) {
  const tForm = useTranslations("Dashboard.Store.Products.Update.Form");
  const [_, startTransition] = useTransition();
  const [index, setIndex] = useState(0);
  const [colors, setColors] = useState(props.colors);
  const [formColors, setFormColors] = useState("");

  useEffect(() => {
    setColors(props.colors);
  }, [props.colors]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (value.length !== 7) return;

      startTransition(() => {
        setColors((prev) => {
          prev[index] = value;

          const set = new Set(colors);
          const arr = Array.from(set);
          setFormColors(arr.join(","));

          return prev;
        });
      });
    },
    [colors, index]
  );

  const onBlur = useCallback(() => {
    setIndex((prev) => prev + 1);
  }, []);

  const onDelete = useCallback((color: string) => {
    setColors((prev) => prev.filter((pr) => pr !== color));
  }, []);

  return (
    <>
      <input className="none" type="hidden" name="colors" value={formColors} />
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
});

const Tag = memo(function Tag({
  tag,
  onDelete,
}: {
  tag: string;
  onDelete: (tag: string) => void;
}) {
  return (
    <button
      type="button"
      className="badge hover:badge-error"
      onClick={() => onDelete(tag)}
    >
      {tag}
    </button>
  );
});

export const Tags = memo(function Tags(props: { tags: string[] }) {
  const tForm = useTranslations("Dashboard.Store.Products.Update.Form");
  const inputRef = useRef<ElementRef<"input">>(null);
  const [tags, setTags] = useState<string[]>(props.tags);

  useEffect(() => {
    setTags(props.tags);
  }, [props.tags]);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const lastIndex = value.length - 1;
    if (value[lastIndex] !== ",") return;

    const realValue = value.split(",")[0] ?? "";
    const valueTrim = realValue.trim();
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
        onChange={onChange}
      />
      <div>
        {tags.map((tag) => (
          <Tag key={tag} tag={tag} onDelete={onDelete} />
        ))}
      </div>
    </>
  );
});

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
  const tInfo = useTranslations("Dashboard.Store.Products.Update.Form.Info");

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

export const Infos = memo(function Infos(props: {
  infos: string[];
  infosAr: string[];
}) {
  const tInfo = useTranslations("Dashboard.Store.Products.Update.Form.Info");
  const [infos, setInfos] = useState<{ en: string; ar: string }[]>([]);

  useEffect(() => {
    const { infos, infosAr } = props;
    const result = [];
    for (let i = 0; i < infos.length; i++) {
      result.push({
        en: infos[i] ?? "",
        ar: infosAr[i] ?? "",
      });
    }
    setInfos(result);
  }, [props]);

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
});

export function Submit() {
  const tInfo = useTranslations("Dashboard.Store.Products.Update.Form");
  const router = useRouter();
  const searchParams = useSearchParams();

  const update = useCallback(
    async (formData: FormData) => {
      const id = searchParams.get("id") ?? "";

      console.log(formData);

      const res = await updateProduct(id, formData);
      if (res.ok) router.back();
      return res;
    },
    [router, searchParams]
  );

  return (
    <SubmitButton
      className="btn btn-primary col-span-2"
      content={tInfo("update")}
      action={update}
    />
  );
}
