// from buefy

import { computed, Ref } from 'vue';

export function toSlug(text: string): string {
	return text
		.toLowerCase()
		.replace(/\s+/g, '-') // Replace spaces with -
		.replace(/[^\w-]+/g, '') // Remove all non-word chars
		.replace(/--+/g, '-') // Replace multiple - with single -
		.replace(/^-+/, '') // Trim - from start of text
		.replace(/-+$/, ''); // Trim - from end of text
}

export function useSlug(text: Ref<string>): Ref<string> {
	return computed(() => toSlug(text.value));
}
