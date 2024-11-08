export type JSONFeedAuthor = {
	name: string, // The author's name.
	url?: string, // The URL of a site owned by the author.
	avatar?: string // The URL of an image for the author.
}

export type JSONFeedAttachment = {
	url: string, // The URL of the attachment.
	mime_type: string, // The MIME type of the attachment.
	title?: string, // The title of the attachment.
	size_in_bytes?: number, // The size of the attachment in bytes.
	duration_in_seconds?: number // The length of the attachment in seconds.
}

export type JSONFeedItem = {
	id: string, // A unique identifier for the item.
	url?: string, // The URL of the resource described by the item.
	external_url?: string, // The URL of a page elsewhere.
	title?: string, // The title of the item.
	content_text?: string, // The plain text of the item.
	content_html?: string, // The HTML of the item.
	summary?: string, // A plain text summary.
	image?: string, // The URL of the main image for the item.
	banner_image?: string, // The URL of an image to use as a banner.
	date_published?: string, // The date the item was published.
	date_modified?: string, // The date the item was modified.
	author?: Array<JSONFeedAuthor>, // The author of the item.
	tags?: Array<string>, // Tags for the item.
	language?: string, // The language of the item.
	attachments?: Array<JSONFeedAttachment> // An array of attachments.
}

export type JSONFeedHub = {
	type: string, // The protocol used to communicate with the hub.
	url: string // The URL of the hub.
}

// JSON Feed 1.1
export type JSONFeed = {
	version: string, // The URL of the version of the format the feed is using.
	title: string, // The name of the feed.
	home_page_url?: string, // The URL of the resource that the feed describes.
	feed_url?: string, // The URL of the feed, and serves as the unique identifier for the feed.
	description?: string, // Describes the feed.
	user_comment?: string, // A description of the purpose of the feed.
	next_url?: string, // The URL of a feed that provides the next n items, where n is determined by the publisher.
	icon?: string, // The URL of an image for the feed suitable to be used in a timeline.
	favicon?: string, // The URL of an image for the feed suitable to be used in a source list.
	author?: Array<JSONFeedAuthor> // Specifies the feed authors.
	language?: string, // The primary language for the feed.
	expired?: boolean, // Whether or not the feed is finished, or if it will continue updating.
	hubs?: Array<JSONFeedHub>, // Endpoints for real-time updates
	items: Array<JSONFeedItem> // The items in the feed.
}
