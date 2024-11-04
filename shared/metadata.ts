import { z } from "zod"

export const SocialSchema = z.object({
	name: z.string(),
	icon: z.string(),
	link: z.string().url()
  });

export type Social = z.infer<typeof SocialSchema>;

export const MetaDataSchema = z.object({
	socials: z.array(SocialSchema),
	contacts: z.array(SocialSchema)
  });

export type MetaData = z.infer<typeof SocialSchema>;
