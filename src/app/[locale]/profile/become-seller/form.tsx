import { Csrf, SubmitButton } from "~/components";
import { Name, Themes } from "./fields";
import { becomeSeller } from "~/action/user";

export default async function BecomeSellerForm() {
  return (
    <form className="card-body">
      <Csrf />
      <div className="form-control">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <Name />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Pick a profile picture</span>
        </label>
        <input
          required
          type="file"
          name="image"
          accept="image/*"
          className="file-input w-full max-w-xs"
        />
      </div>
      <Themes />
      <div className="form-control mt-6">
        <SubmitButton
          className="btn btn-primary"
          content="Become seller"
          action={becomeSeller}
        />
      </div>
    </form>
  );
}
