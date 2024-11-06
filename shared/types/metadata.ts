import { z } from "zod"

export const SocialMetaDataSchema = z.object({
	name: z.string(),
	icon: z.string(),
	link: z.string().url()
  });

export type SocialMetaData = z.infer<typeof SocialMetaDataSchema>;

export const MetaDataSchema = z.object({
	socials: z.array(SocialSchema),
	contacts: z.array(SocialSchema)
  });

export type MetaData = z.infer<typeof SocialSchema>;
