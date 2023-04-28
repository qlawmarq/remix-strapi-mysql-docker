import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { updateUserLocaleSession } from "~/lib/i18n";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const locale = formData.get("locale");
  if (locale && typeof locale == "string") {
    return updateUserLocaleSession({ request, locale });
  }
}

export async function loader() {
  return redirect("/");
}
