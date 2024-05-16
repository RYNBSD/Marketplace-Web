export default async function Page() {
  return (
    <section className="w-full h-screen grid place-content-center">
      <div className="h-auto max-w-5xl flex flex-col gap-5 p-3 rounded-lg bg-neutral text-neutral-content">
        <h1 className="text-5xl font-bold text-center">Buy</h1>
        <form className="flex flex-col gap-3 w-full items-start justify-center">
          <input
            type="text"
            placeholder="Full name"
            className="input input-bordered w-full"
          />
          <input
            type="mail"
            placeholder="Mail"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="Credit card number"
            className="input input-bordered w-full"
          />
          <div className="flex items-center justify-between gap-5">
            <input
              type="text"
              placeholder="MM/YY"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              placeholder="Card security code"
              className="input input-bordered w-full"
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">Submit</button>
        </form>
      </div>
    </section>
  );
}
