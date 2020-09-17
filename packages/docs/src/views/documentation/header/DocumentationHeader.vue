<template>
	<header>
		<nav v-if="crumbs.length" class="breadcrumb" aria-label="breadcrumbs">
			<ul>
				<li v-for="(crumb, index) in crumbs" :key="crumb" :class="{ 'is-active': index === crumbs.length - 1 }">
					<router-link :to="meta[crumb].fullPath">
						{{ meta[crumb].title }}
					</router-link>
				</li>
			</ul>
		</nav>
		<b-container>
			<b-title>
				{{ title }}
			</b-title>
			<p v-text="subtitle"></p>
		</b-container>
	</header>
</template>

<script lang="ts">
import 'bulma/sass/components/breadcrumb.sass';
import BContainer from 'buetify/lib/components/layout/container/BContainer';
import BTitle from 'buetify/lib/components/title/BTitle';
import { constant, pipe } from 'fp-ts/lib/function';
import { fold, fromNullable, getOrElse, mapNullable, Option } from 'fp-ts/lib/Option';
import { defineComponent, PropType, computed } from 'vue';
import { useRouter } from 'vue-router';
import { BuetifyRouteMeta } from '../../../shared/types';
import { constEmptyArray, constEmptyString } from '../../../shared/utils';
import { meta } from '../meta';

export default defineComponent({
	name: 'documentation-header',
	components: {
		BContainer,
		BTitle
	},
	setup() {
		const route = useRouter().currentRoute;
		const routeMeta = computed<Option<Partial<BuetifyRouteMeta>>>(() => fromNullable(route.value.meta || {}));
		const title = computed(() =>
			pipe(
				routeMeta.value,
				mapNullable(m => m.title),
				getOrElse(constEmptyString)
			)
		);
		const subtitle = computed(() =>
			pipe(
				routeMeta.value,
				mapNullable(m => m.subtitle),
				getOrElse(constEmptyString)
			)
		);
		const crumbs = computed(() =>
			pipe(
				routeMeta.value,
				mapNullable(m => m.breadcrumbs),
				getOrElse<string[]>(constEmptyArray)
			)
		);

		console.log(meta, crumbs.value);

		return {
			title,
			subtitle,
			crumbs,
			meta
		};
	}
});
</script>
