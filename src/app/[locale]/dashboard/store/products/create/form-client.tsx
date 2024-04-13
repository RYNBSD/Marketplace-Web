"use client";
import type {
  ChangeEvent,
  ElementRef,
  KeyboardEvent,
  MouseEventHandler,
} from "react";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import ColorPicker, {
  type Color as ColorPickerEvent,
} from "@rc-component/color-picker";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { SubmitButton } from "~/components";
import { allCategories, createProduct } from "~/action/store";

const Category = memo(function Category({
  id,
  name,
  nameAr,
}: {
  id: string;
  name: string;
  nameAr: string;
}) {
  return <option value={id} className="capitalize">{name}</option>;
});

export function Categories() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    allCategories(1).then((res) => {
      if (res.success) setCategories(res.data.categories);
    });
  }, []);

  return categories.map((category) => (
    <Category key={category.id} {...category} />
  ));
}

const Size = memo(function Size({
  size,
  onClick,
}: {
  size: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button type="button" className="badge" onClick={onClick}>
      {size}
    </button>
  );
});

export function Sizes() {
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
    <div>
      <div>
        {sizes.map((size) => (
          <Size key={size} size={size} onClick={() => onDelete(size)} />
        ))}
      </div>
      <input className="none" type="hidden" name="sizes" value={sizes.join(",")} />
      <input
        ref={inputRef}
        type="text"
        placeholder="Add Size"
        onKeyDown={onKeyDown}
      />
    </div>
  );
}

const Color = memo(function Color({
  color,
  onClick,
}: {
  color: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      key={color}
      onClick={onClick}
      className="flex items-center justify-center gap-1"
    >
      <div className="w-[10px] h-[10px]" style={{ backgroundColor: color }} />
      {color}
    </button>
  );
});

export function Colors() {
  const [colors, setColors] = useState<string[]>([]);

  const onChangeComplete = useCallback((value: ColorPickerEvent) => {
    const hex = value.toHexString();
    setColors((prev) => {
      const set = new Set([...prev, hex]);
      return Array.from(set);
    });
  }, []);

  const onDelete = useCallback((color: string) => {
    setColors((prev) => prev.filter((pr) => pr !== color));
  }, []);

  return (
    <label className="flex gap-5">
      <input
        className="none"
        type="hidden"
        name="colors"
        value={colors.join(",")}
      />
      <ColorPicker
        className="flex-1"
        onChangeComplete={onChangeComplete}
        disabledAlpha
      />
      <div className="flex flex-wrap flex-1 gap-1 overflow-x-scroll w-full h-full no-scrollbar">
        {colors.map((color) => (
          <Color key={color} color={color} onClick={() => onDelete(color)} />
        ))}
      </div>
    </label>
  );
}

const Tag = memo(function Tag({
  tag,
  onClick,
}: {
  tag: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button type="button" className="badge" onClick={onClick}>
      {tag}
    </button>
  );
});

export function Tags() {
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
    <div>
      <div>
        {tags.map((tag) => (
          <Tag key={tag} tag={tag} onClick={() => onDelete(tag)} />
        ))}
      </div>
      <input
        className="none"
        type="hidden"
        name="tags"
        value={tags.join(",")}
      />
      <input
        ref={inputRef}
        type="text"
        placeholder="Add tag"
        onKeyDown={onKeyDown}
      />
    </div>
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
  return (
    <>
      <input
        type="text"
        value={en}
        required
        placeholder="English info"
        onChange={(e) => onEnChange(e, i)}
      />
      <input
        type="text"
        value={ar}
        required
        placeholder="Arabic info"
        onChange={(e) => onArChange(e, i)}
      />
    </>
  );
});

export function Infos() {
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
      <button type="button" className="btn" onClick={onAdd}>
        Add
      </button>
    </>
  );
}

export function Submit() {
  const locale = useLocale();
  const router = useRouter();

  const create = useCallback(
    async (formData: FormData) => {
      const res = await createProduct(formData);
      if (res.success) router.push(`/${locale}/dashboard/store/products`);
      return res;
    },
    [locale, router]
  );

  return (
    <SubmitButton
      className="btn btn-primary"
      content="Create"
      action={create}
    />
  );
}
