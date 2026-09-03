import { cookies } from "next/headers";

export async function sessionOptions() {
  const cookie = (await cookies())
    .getAll()
    .filter(({ name }) =>
      ["better-auth.session_token", "better-auth.session_data"].includes(name)
    )
    .map(({ name, value }) => `${name}=${value.split(";", 1)[0]}`)
    .join("; ");

  return { init: { headers: { cookie } } };
}
