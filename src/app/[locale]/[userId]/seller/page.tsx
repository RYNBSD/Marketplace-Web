import React from "react";
import { Container } from "~/components";
import NewSellerForm from "./form";
import { getLocale } from "next-intl/server";

export default async function NewSeller() {
  const locale = await getLocale();

  return (
    <Container bg="bg-base-200">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">New seller 😀</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <NewSellerForm />
          </div>
        </div>
      </div>
    </Container>
  );
}
