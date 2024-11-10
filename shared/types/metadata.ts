import { z } from 'zod';

export const SocialMetaDataSchema = z.object({
	name: z.string(),
	icon: z.string(),
	link: z.string().url(),
});

export type SocialMetaData = z.infer<typeof SocialMetaDataSchema>;

export const MetaDataSchema = z.object({
	socials: z.array(SocialMetaDataSchema),
	contacts: z.array(SocialMetaDataSchema),
});

export type MetaData = z.infer<typeof MetaDataSchema>;
