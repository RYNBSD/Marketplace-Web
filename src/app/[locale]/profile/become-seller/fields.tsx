"use client";

import type { ChangeEvent } from "react";
import type { Theme } from "~/types";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { THEMES } from "~/constant";
import { useSetting } from "~/context";
import { validateStoreName } from "~/action/validate";

export function Name() {
  const [isNameValid, setIsNameValid] = useState(false);
  const [isPending, startTransition] = useTransition();

  const onNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      validateStoreName(e.target.value)
        .then(({ success }) => setIsNameValid(success))
        .catch(() => setIsNameValid(false));
    });
  }, []);

  return (
    <>
      <input
        required
        type="text"
        name="name"
        placeholder="Store name"
        className={`input input-bordered ${
          isNameValid ? "input-success" : "input-error"
        }`}
        onChange={onNameChange}
      />
      <div className="label">
        <span className="label-text-alt">
          {isPending
            ? "validating"
            : isNameValid
            ? "store name valid"
            : "store name not valid"}
        </span>
      </div>
    </>
  );
}

export function Themes() {
  const { setting, changeSetting } = useSetting()!;

  useEffect(() => {
    const originalTheme = setting.theme;
    return () => {
      changeSetting("theme", originalTheme);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const options = useMemo(
    () =>
      THEMES.map((theme) => (
        <option key={theme} value={theme}>
          {theme}
        </option>
      )),
    []
  );

  return (
    <select
      name="theme"
      defaultValue={setting.theme}
      onChange={(e) => changeSetting("theme", e.target.value as Theme)}
      className="select select-bordered w-full max-w-xs"
    >
      {options}
    </select>
  );
}
