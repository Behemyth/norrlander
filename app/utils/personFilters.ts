export function personFilterValue(name: string): string {
	return name
		.trim()
		.toLocaleLowerCase('en-US')
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}
