import { Resend } from "resend";
import { envEmail } from "./env-config";

//TODO: change resend into a separate service which handles emailing via user credentials
export const resend = new Resend(envEmail.RESEND_TOKEN);
