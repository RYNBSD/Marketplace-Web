import CreateForm from "./form";

export default async function Create() {
  return (
    <div>
      <h1 className="text-center text-3xl font-semibold py-5">
        Create new product
      </h1>
      <CreateForm />
    </div>
  );
}
