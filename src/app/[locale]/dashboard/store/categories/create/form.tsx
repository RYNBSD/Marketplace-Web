import { Submit } from "./form-client";

export default async function CreateFrom() {
  return (
    <form className="card-body">
      <div className="form-control">
        <label htmlFor="name" className="label">
          <span className="label-text">Name *</span>
        </label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="input input-bordered"
          required
        />
      </div>
      <div className="form-control">
        <label htmlFor="nameAr" className="label">
          <span className="label-text">Arabic name *</span>
        </label>
        <input
          type="text"
          name="nameAr"
          placeholder="Arabic name"
          className="input input-bordered"
          required
        />
      </div>
      <div className="form-control">
        <label htmlFor="image" className="label">
          <span className="label-text">Pick new image</span>
        </label>
        <input
          type="file"
          name="image"
          className="file-input w-full max-w-xs"
          accept="image/*"
        />
      </div>
      <div className="form-control mt-6">
        <Submit />
      </div>
    </form>
  );
}
