import React from "react";
import { Container } from "~/components";
import BecomeSellerForm from "./form";
import { getTranslations } from "next-intl/server";

export default async function BecomeSeller() {
  const tNewSeller = await getTranslations("Profile.Become-Seller");

  return (
    <Container bg="bg-base-200">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">{tNewSeller("new-seller")} 😀</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <BecomeSellerForm />
          </div>
        </div>
      </div>
    </Container>
  );
}
